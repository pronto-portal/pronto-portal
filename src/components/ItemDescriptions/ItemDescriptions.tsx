import React, { useCallback, useMemo, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
    Box,
    Button,
    Grid,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Typography,
} from '@mui/material';
import {
    CellContext,
    ExpandedState,
    SortingState,
    GroupingState,
    flexRender,
    getCoreRowModel,
    getExpandedRowModel,
    getSortedRowModel,
    getGroupedRowModel,
    getFilteredRowModel,
    useReactTable,
    VisibilityState,
} from '@tanstack/react-table';
import TableToolbar from './TableToolBar';
import { generateColumns, HeaderColumns } from './tableUtils';
import { processVisibility } from './tableUtils';
import { FilteredAssignmentsContextProps } from '../../contextProviders/FilteredAssignmentsProvider';
import { PaginationState } from '../../hooks/usePaginationState';
interface ItemDescriptionsProps<T extends {}> {
    data: T[];
    /**
     * @param {HeaderColumns<T>} overrides - Object specifying custom configurations for columns.
     *                                       This object can include both top-level keys and nested keys.
     *                                       Top-level keys directly correspond to properties of T.
     *                                       For nested properties, use string keys in dot notation.
     *
     *                                       ```js
     *                                       Example:
     *                                       {
     *                                           firstName: { type: 'date' },
     *                                           'address.city': { type: 'boolean' },
     *                                           'address.address1': {}
     *                                       }
     *                                       ```
     *
     *                                       In this example, 'firstName' is a top-level property of T,
     *                                       while 'address.city' and 'address.address1' are nested properties
     *                                       accessed using dot notation.
     */
    headerColumns: HeaderColumns<T>;
    isLoading?: boolean;
    handleSaveCellChanges?: (updatedData: T[]) => void;
    paginationProps: PaginationState & Pick<FilteredAssignmentsContextProps, 'totalRowCount'>;
    editExpandOverrideComponent?: JSX.Element;
}

const ItemDescriptions = <T extends { id?: string }>({
    data,
    isLoading,
    headerColumns,
    paginationProps: { page, setPage, countPerPage, setCountPerPage, totalRowCount },
}: ItemDescriptionsProps<T>) => {
    // const [isEditMode, setIsEditMode] = useState(false);
    const [editedModeActive, setEditedModeActive] = useState<Record<string, boolean>>({});

    // Tanstack table states
    const [expanded, setExpanded] = React.useState<ExpandedState>({});
    const [modifiedRows, setModifiedRows] = useState<T[]>([]);
    const [grouping, setGrouping] = React.useState<GroupingState>([]);
    // const [rowSelection, setRowSelection] = React.useState({});
    const [sorting, setSorting] = React.useState<SortingState>([]);

    const initialVisibility = useMemo(() => processVisibility(headerColumns), [headerColumns]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(initialVisibility);

    const toggleEditModeForRow = (rowId: string, value: boolean) => {
        setEditedModeActive((prev) => ({
            ...prev,
            [rowId]: value,
        }));
    };

    const handleCellChange = useCallback(
        (rowId: string, columnId: string, newValue: any) => {
            console.log('MODIFIED', rowId, columnId, newValue);
            setModifiedRows((prevRows) => {
                const existingRow = prevRows.find((row) => row.id === rowId);
                if (existingRow) {
                    return prevRows.map((row) => (row.id === rowId ? { ...row, [columnId]: newValue } : row));
                } else {
                    const newRow = { ...data.find((row) => row.id === rowId), [columnId]: newValue };
                    return [...prevRows, newRow as T]; // Casting newRow as T to satisfy TypeScript
                }
            });
        },
        [data]
    );

    const mergedData = useMemo(() => {
        const modifiedMap = new Map(modifiedRows.map((item) => [item.id, item]));
        return data.map((item) => modifiedMap.get(item.id) || item);
    }, [data, modifiedRows]);

    const handleDelete = (rowId: string) => {
        // Implement delete logic
        console.log('Delete', rowId);
    };

    // console.log(mergedData);

    const columns = useMemo(() => {
        const generatedColumns = generateColumns<T>(data, mergedData, headerColumns, false, handleCellChange);

        // Action buttons
        generatedColumns.push({
            id: 'expander',
            header: 'Actions',
            cell: ({ row }: CellContext<T, unknown>) => {
                const rowId = row.original!.id!;
                // return isEditMode ? (
                //     <IconButton id='edit-toggle' aria-label='edit row' size='small' onClick={() => row.toggleExpanded()}>
                //         <EditIcon color={row.getIsExpanded() ? 'primary' : undefined} />
                //     </IconButton>
                // ) : (
                //     <IconButton id='expand-toggle' aria-label='expand row' size='small' onClick={() => row.toggleExpanded()}>
                //         {row.getIsExpanded() ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
                //     </IconButton>
                // );
                return (
                    <Box display='flex' alignItems='center' justifyContent='space-around'>
                        <IconButton
                            aria-label='view row'
                            size='small'
                            onClick={() => {
                                // If already in edit mode and expanded, keep expanded and switch to view mode
                                if (editedModeActive[rowId] && row.getIsExpanded()) {
                                    toggleEditModeForRow(rowId, false); // switch to view mode
                                } else {
                                    toggleEditModeForRow(rowId, false); // ensure view mode
                                    row.toggleExpanded(); // toggle expanded normally
                                }
                            }}
                        >
                            <VisibilityIcon />
                        </IconButton>
                        <IconButton
                            aria-label='edit row'
                            size='small'
                            onClick={() => {
                                // If already in view mode and expanded, switch to edit mode without collapsing
                                if (!editedModeActive[rowId] && row.getIsExpanded()) {
                                    toggleEditModeForRow(rowId, true); // switch to edit mode
                                } else {
                                    // If not already expanded or in edit mode, toggle both
                                    toggleEditModeForRow(rowId, true); // ensure edit mode
                                    row.toggleExpanded(); // toggle expanded normally
                                }
                            }}
                        >
                            <EditIcon />
                        </IconButton>
                        <IconButton aria-label='delete row' size='small' onClick={() => handleDelete(rowId)}>
                            <NotInterestedIcon />
                        </IconButton>
                    </Box>
                );
            },
        });

        // Selector buttons
        // generatedColumns.unshift({
        //     id: 'select',
        //     header: ({ table }) => (
        //         <Checkbox
        //             checked={table.getIsAllRowsSelected()}
        //             indeterminate={table.getIsSomeRowsSelected()}
        //             onChange={table.getToggleAllRowsSelectedHandler()}
        //         />
        //     ),
        //     cell: ({ row }) => (
        //         <div className='px-1'>
        //             <Checkbox
        //                 checked={row.getIsSelected()}
        //                 disabled={!row.getCanSelect()}
        //                 indeterminate={row.getIsSomeSelected()}
        //                 onChange={row.getToggleSelectedHandler()}
        //             />
        //         </div>
        //     ),
        // });

        return generatedColumns;
    }, [data, mergedData, headerColumns, handleCellChange, editedModeActive]);

    // console.log(columns);

    const table = useReactTable({
        data,
        columns,
        state: {
            expanded,
            sorting,
            grouping,
            columnVisibility,
            // rowSelection,
        },
        autoResetExpanded: false,
        // enableRowSelection: true,
        onColumnVisibilityChange: setColumnVisibility,
        onExpandedChange: setExpanded,
        // onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onGroupingChange: setGrouping,
        getGroupedRowModel: getGroupedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        debugTable: true,
    });

    return (
        <Box width={'100%'}>
            <Button onClick={() => handleCellChange('7274cdf9-fc13-4d8a-bee0-ba345fc14aa7', 'isComplete', true)}>CLICK</Button>
            <TableContainer>
                {/* <TableToolbar onEditClick={handleEditClick} /> */}
                <Table>
                    <TableHead>
                        {table.getHeaderGroups().map((headerGroup) => {
                            return (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableCell
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            {...{
                                                onClick: header.column.getToggleSortingHandler(),
                                                // TODO add class name
                                                className: header.column.getIsSorted() ? 'cursor-pointer select-none' : '',
                                            }}
                                        >
                                            {header.isPlaceholder ? null : (
                                                <div>
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                    {header.column.getCanSort() && (
                                                        <TableSortLabel
                                                            active={!!header.column.getIsSorted()}
                                                            direction={
                                                                header.column.getIsSorted() ? (header.column.getIsSorted() === 'desc' ? 'desc' : 'asc') : 'asc'
                                                            }
                                                        />
                                                    )}
                                                </div>
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            );
                        })}
                    </TableHead>
                    <TableBody>
                        {table.getRowModel().rows.map((row) => {
                            console.log(row.getAllCells());
                            const rowEditMode = editedModeActive[row.original!.id!];
                            return (
                                <>
                                    <TableRow key={row.id}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                        ))}
                                    </TableRow>
                                    {row.getIsExpanded() && (
                                        <TableRow key={`${row.id}-expanded`}>
                                            <TableCell colSpan={row.getVisibleCells().length} sx={{ padding: 2 }}>
                                                {rowEditMode ? (
                                                    <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                                                        <Grid item xs={12}>
                                                            <Typography variant='subtitle1'>Modify Row</Typography>
                                                        </Grid>
                                                        {row.getAllCells().map((cell: any) => {
                                                            if (!cell.column.columnDef.editSettings?.isVisible || cell.column.id === 'expander') {
                                                                return null;
                                                            }
                                                            return (
                                                                <Grid item xs={12} sm={4} md={2} key={cell.id} sx={{ display: 'flex' }}>
                                                                    {flexRender(cell.column.columnDef.cell, {
                                                                        ...cell.getContext(),
                                                                        isExpanded: row.getIsExpanded(),
                                                                        isEditMode: rowEditMode,
                                                                    })}
                                                                    <Typography variant='subtitle2' sx={{ marginY: 'auto' }}>
                                                                        {cell.column.columnDef.header}
                                                                    </Typography>
                                                                </Grid>
                                                            );
                                                        })}
                                                        <Grid container item justifyContent='flex-end'>
                                                            <Grid item>
                                                                <Button variant='contained'>save</Button>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                ) : (
                                                    <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                                                        <Grid item xs={12}>
                                                            <Typography variant='subtitle1'>View Row</Typography>
                                                        </Grid>
                                                        {row.getAllCells().map((cell: any) => {
                                                            if (!cell.column.columnDef.expandSettings?.isVisible || cell.column.id === 'expander') {
                                                                return null;
                                                            }
                                                            return (
                                                                <Grid item xs={12} sm={4} md={2} key={cell.id}>
                                                                    <Typography variant='subtitle2' sx={{ marginY: 'auto' }}>
                                                                        {cell.column.columnDef.header}
                                                                    </Typography>
                                                                    {flexRender(cell.column.columnDef.cell, {
                                                                        ...cell.getContext(),
                                                                        isExpanded: row.getIsExpanded(),
                                                                        isEditMode: false,
                                                                    })}
                                                                </Grid>
                                                            );
                                                        })}
                                                    </Grid>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </>
                            );
                        })}
                    </TableBody>
                </Table>
                <TablePagination
                    component='div'
                    style={{ width: '100%' }}
                    page={page}
                    onPageChange={(_, page) => setPage(page)}
                    count={totalRowCount}
                    rowsPerPage={countPerPage}
                    onRowsPerPageChange={(e) => setCountPerPage(parseInt(e.target.value, 10))}
                />
            </TableContainer>
        </Box>
    );
};

export default ItemDescriptions;
