import React from 'react';
import { CellContext, ColumnDef, VisibilityState } from '@tanstack/react-table';
import moment from 'moment';
import { dateToString } from '../../utils/dateFormat';
import { splitCamelCase } from '../../utils/splitCamelCase';
import { StaticCheckbox } from '../StaticCheckbox';

/**
 * Checks if a value is an object and not an array.
 * @param {any} value - The value to check.
 * @returns {boolean} - True if the value is an object and not an array, false otherwise.
 */

const isObject = (value: any): boolean => {
    return value && typeof value === 'object' && !Array.isArray(value);
};

/**
 * Checks if a value is a valid date.
 * @param {any} cellValue - The value to check.
 * @returns {boolean} - True if the value is a valid date, false otherwise.
 */
const isDate = (cellValue: any) => cellValue instanceof Date || moment(cellValue, moment.ISO_8601, true).isValid();

/**
 * Retrieves a value from an object based on a path.
 * @param {any} obj - The object to retrieve the value from.
 * @param {string} path - The path to the value in the object.
 * @returns {any} - The value at the specified path in the object.
 */
const getValueFromPath = (obj: any, path: string) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

/**
 * Represents keys of an object T that are not objects or arrays.
 * @template T - The object type.
 */
export type NonObjectKeys<T> = {
    [K in keyof T]: T[K] extends object | any[] ? never : K;
}[keyof T];

/**
 * Represents settings for editing a column in the table.
 */
export type EditSettings = {
    isVisible?: boolean;
    componentOverride?: JSX.Element;
};

export type ExpandSettings = {
    isVisible?: boolean;
    componentOverride?: JSX.Element;
};

type CustomColumnOptions = {
    type?: 'date' | 'boolean';
    isVisible?: boolean;
    forceRoot?: boolean;
    // React.ReactNode is to vague as it accepts  null, string, number, ReactElement, and more
    componentOverride?: JSX.Element;
    editSettings?: EditSettings;
    expandSettings?: ExpandSettings;
};

type CustomColumnDef<TData, TValue> = ColumnDef<TData, TValue> & CustomColumnOptions;

// Extend the CellContext type to include isEditMode
interface CustomCellContext<TData, TValue> extends CellContext<TData, TValue> {
    isEditMode: boolean;
    isExpanded: boolean;
}

type NestedHeaderColumns<T> = {
    [P in keyof T]?: T[P] extends object ? HeaderColumns<T[P]> : never;
};

export type HeaderColumns<T> = {
    [P in keyof T]?: CustomColumnOptions | NestedHeaderColumns<T[P]>;
};

type GroupedColumns<TData, TValue> = {
    [key: string]: {
        header: string;
        columns: CustomColumnDef<TData, unknown>[];
    } & CustomColumnDef<TData, TValue>;
};

/**
 * Generates column definitions for a table.
 * @template T - The type of the data object for the table.
 * @param {T[]} data - Array of data objects for the table.
 * @param {HeaderColumns<T>} overrides - Object specifying custom configurations for columns.
 * @param {boolean} [showAll=true] - Whether to show all columns by default.
 * @returns {CustomColumnDef<T>[]} - Array of custom column definitions.
 */
export const generateColumns = <T extends Record<string, unknown>>(
    data: T[],
    modifiedRows: T[],
    overrides: HeaderColumns<T>,
    showAll: boolean = true,
    handleCellChange?: (rowId: string, columnId: string, newValue: any) => void
): CustomColumnDef<T, unknown>[] => {
    let columns: CustomColumnDef<T, unknown>[] = [];

    const processObject = (obj: T, parentKey = '', isNested = false): CustomColumnDef<T, unknown>[] => {
        const groupColumns: GroupedColumns<T, unknown> = {};
        const individualColumns: CustomColumnDef<T, unknown>[] = [];

        Object.entries(obj).forEach(([key, value]) => {
            const fullKey = `${parentKey}${key}`;
            const columnOverride = isNested ? overrides[parentKey.slice(0, -1)]?.[key] : overrides[fullKey];
            if (isObject(value) && !isDate(value) && !columnOverride?.forceRoot) {
                // Nested object found, create a group of columns
                const nestedColumns = processObject(value as unknown as T, `${fullKey}.`, true);
                if (nestedColumns.length > 0) {
                    // Iterate over nested columns and categorize them
                    nestedColumns.forEach((nestedColumn) => {
                        if (nestedColumn.forceRoot) {
                            individualColumns.push(nestedColumn);
                        } else {
                            if (!groupColumns[key]) {
                                groupColumns[key] = {
                                    accessorKey: fullKey,
                                    header: splitCamelCase(key),
                                    columns: [],
                                };
                            }
                            groupColumns[key].columns.push(nestedColumn);
                        }
                    });
                    individualColumns.push(...Object.values(groupColumns));
                }
            } else if (!Array.isArray(value) && (showAll || columnOverride)) {
                const header = splitCamelCase(key); // || columnOverride?.header;
                // if (columnOverride.isVisible === false) return;
                const column: CustomColumnDef<T, unknown> = {
                    accessorKey: fullKey,
                    header,
                    forceRoot: columnOverride?.forceRoot,
                    ...columnOverride,
                    cell: (info: any) => {
                        const rowId = info.row.original.id;
                        const cellValue = getValueFromPath(info.row.original, fullKey);
                        if (info.isExpanded) {
                            // Check if edit mode true
                            if (info.isEditMode) {
                                const modifiedRow = modifiedRows.find((row) => row.id === rowId);
                                const modifiedValue = modifiedRow ? modifiedRow[fullKey] : cellValue;
                                if (columnOverride?.editSettings?.isVisible) {
                                    // Check if there's a custom type and component override
                                    if (columnOverride?.type) {
                                        switch (columnOverride.type) {
                                            case 'boolean':
                                                //  TODO HOW TO EDDIT OBJECTS LIKE ADDRESS
                                                // we would techincally only pick existing addresses
                                                return (
                                                    columnOverride.editSettings.componentOverride || (
                                                        <StaticCheckbox
                                                            checked={info.isEditMode ? modifiedValue : cellValue}
                                                            isEditable={info.isEditMode}
                                                            handleChange={(event, checked) => handleCellChange?.(info.row.original.id, fullKey, checked)}
                                                        />
                                                    )
                                                );
                                            default:
                                                break;
                                        }
                                    } // If no  columnOverride type exist check if it has a unique custom componentOverride
                                    else if (columnOverride.editSettings.componentOverride) {
                                        return columnOverride.editSettings.componentOverride;
                                    }
                                }
                                // return nothing for items without edit mode
                                return;
                            } else {
                                if (columnOverride?.expandSettings?.isVisible) {
                                    // Check if there's a custom type and component override
                                    if (columnOverride?.type) {
                                        switch (columnOverride.type) {
                                            case 'boolean':
                                                //  TODO HOW TO EDDIT OBJECTS LIKE ADDRESS
                                                // we would techincally only pick existing addresses
                                                return columnOverride.expandSettings.componentOverride || <StaticCheckbox checked={cellValue} />;
                                            default:
                                                break;
                                        }
                                    } // If no  columnOverride type exist check if it has a unique custom componentOverride
                                    else if (columnOverride.editSettings.componentOverride) {
                                        return columnOverride.editSettings.componentOverride;
                                    }
                                }
                            }
                        }

                        // Check if there's a custom type and component override
                        if (columnOverride?.type) {
                            switch (columnOverride.type) {
                                case 'boolean':
                                    //  TODO UPDATE SELECT TO HAVE default EDIT MODE
                                    return columnOverride.componentOverride || <StaticCheckbox checked={cellValue} />;
                                default:
                                    break;
                            }
                        }

                        // Default rendering based on typeof the value
                        if (isDate(cellValue)) {
                            return <span>{dateToString(cellValue)}</span>;
                        } else if (typeof cellValue === 'boolean') {
                            return <StaticCheckbox checked={cellValue} />;
                        }
                        return cellValue ? cellValue.toString() : '';
                    },
                };
                individualColumns.push(column as unknown as CustomColumnDef<T, unknown>);
            }
        });

        return individualColumns;
    };

    if (data.length > 0) {
        columns = processObject(data[0]);
    }

    return columns;
};

// Define a type guard to check if a value is a column object
function isColumnObject(value: any): value is HeaderColumn {
    return typeof value === 'object' && value !== null && ('type' in value || 'isVisible' in value);
}

/**
 * Recursively processes a HeaderColumns object to generate a visibility state for columns in a table.
 * This function identifies columns that are explicitly marked as invisible and constructs an object
 * representing the visibility state of each column. Nested columns are processed and included in the state.
 * The resulting object is useful for initializing column visibility in table components like React Table.
 *
 * @template T - The type of the data object for the table.
 * @param {HeaderColumns<T>} columns - Object specifying custom configurations for columns. It can include nested columns.
 * @param {string} [parentKey=''] - A string used to prefix keys in the resulting object, useful for nested columns.
 * @returns {VisibilityState} An object representing the visibility state of each column, where the key is the column name (including nested names) and the value is a boolean indicating if the column is visible or not.
 */
export function processVisibility<T>(columns: HeaderColumns<T>, parentKey = ''): VisibilityState {
    return Object.entries(columns).reduce((acc, [key, value]) => {
        const fullKey = parentKey ? `${parentKey}_${key}` : key;

        if (isColumnObject(value)) {
            if ('isVisible' in value && value.isVisible === false) {
                acc[fullKey] = false;
            } else {
                acc[fullKey] = true; // Assume visible if not explicitly set to false
            }

            // Recurse only if it's a column object with nested columns and not a JSX element
            if (!Array.isArray(value) && !value.$$typeof && Object.keys(value).some((key) => key !== 'type' && key !== 'isVisible')) {
                Object.assign(acc, processVisibility(value, fullKey));
            }
        }

        return acc;
    }, {} as VisibilityState);
}
