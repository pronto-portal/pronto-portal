import { truncate } from 'fs';
import React, { useCallback, useMemo, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { AddAssignmentsForm } from './AddAssignmentForm';
import { AssignmentsDirectorySearch } from './AssignmentsDirectorySearch';
import EditModeCustomLayout from './EditModeCustomLayout';
import { AddAssignmentFlowProvider } from '../../contextProviders/AddAssignmentFlowProvider';
import { useAssignmentWrite } from '../../contextProviders/AssignmentWriteProvider/AssignmentWriteProvider';
import { useFilteredAssignments } from '../../contextProviders/FilteredAssignmentsProvider/FilteredAssignmentsProvider';
import { Assignment } from '../../redux/graphql/codegen/types/graphql';
import { useUpdateAssignmentMutation } from '../../redux/reducers';
import { Address, Claimant, Translator } from '../../types/ObjectTypes';
import { NestedRowActions } from '../../types/PropTypes/ModelTableProps';
import { dateToString } from '../../utils/dateFormat';
import { EditAssignmentForm } from '../EditAssignmentForm';
import TranslatorEditMode from '../ItemDescriptions/CustomColumnComponents/TranslatorEditMode';
import ItemDescriptions from '../ItemDescriptions/ItemDescriptions';
import { HeaderColumns } from '../ItemDescriptions/tableUtils';
import { ModelDirectoryLayout } from '../ModelDirectoryLayout';
import { ModelNestedRowActionsProps } from '../ModelNestedRowActions';
import { StaticCheckbox } from '../StaticCheckbox';

export const AssignmentDirectory: React.FC = () => {
    const { assignments, isLoading, page, setPage, totalRowCount, countPerPage, setCountPerPage, filtersOpen, setFiltersOpen } = useFilteredAssignments();

    const { setIsChangeTranslatorOpen, setIsChangeClaimantOpen, setIsChangeAddressOpen, setAssignment } = useAssignmentWrite();
    const [openAddAssignmentsForm, setOpenAddAssignmentsForm] = useState<boolean>(false);

    // const nestedRowActions: NestedRowActions<Assignment> = (rowData) => ({
    //     assignedTo: (
    //         <ModelNestedRowActionsProps<Translator>
    //             onEditClick={() => {
    //                 setIsChangeTranslatorOpen(true);
    //                 setAssignment(rowData);
    //             }}
    //             datum={rowData.assignedTo as Translator}
    //         />
    //     ),
    //     claimant: (
    //         <ModelNestedRowActionsProps<Claimant>
    //             onEditClick={() => {
    //                 setIsChangeClaimantOpen(true);
    //                 setAssignment(rowData);
    //             }}
    //             datum={rowData.claimant as Claimant}
    //         />
    //     ),
    //     address: (
    //         <ModelNestedRowActionsProps<Address>
    //             onEditClick={() => {
    //                 setIsChangeAddressOpen(true);
    //                 setAssignment(rowData);
    //             }}
    //             datum={rowData.address as Address}
    //         />
    //     ),
    // });

    const handleSaveCellChanges = (updatedAssignments: Assignment[]) => {
        // Call mutation with updatedAssignments
        // Example: updateManyAssignmentsMutation({ variables: { assignments: updatedAssignments } });
    };

    const headerColumns: HeaderColumns<Assignment> = useMemo(() => {
        return {
            // dateTime: {
            //     type: 'date',
            //     expandSettings: {
            //         isVisible: true,
            //     },
            // },
            // isComplete: {
            //     type: 'boolean',
            //     isTab: true,
            //     editSettings: {
            //         isVisible: true,
            //     },
            //     expandSettings: {
            //         isVisible: true,
            //     },
            // },
            // createdAt: {
            //     type: 'date',
            //     expandSettings: {
            //         isVisible: true,
            //     },
            // },
            // claimantNoShow: {
            //     type: 'boolean',
            //     editSettings: {
            //         isVisible: true,
            //     },
            // },
            // translatorNoShow: {
            //     type: 'boolean',
            //     isVisible: false,
            //     editSettings: {
            //         isVisible: true,
            //     },
            // },
            claimant: {
                isVisible: false,
                forceRoot: true,
                editSettings: {
                    componentOverride: <TranslatorEditMode />,
                },
            },
            address: {
                isVisible: true,
                forceRoot: true,
                editSettings: {
                    isVisible: true,
                    componentOverride: <h1>test</h1>,
                },
                // Dont have access to when forceRoot is true
                // address1: {
                //     isVisible: true,
                //     expandSettings: {
                //         isVisible: true,
                //     },
                // },
            },
        };
    }, []);

    const [updateAssignment] = useUpdateAssignmentMutation();

    return (
        <>
            <ItemDescriptions<Assignment>
                data={assignments}
                isLoading={isLoading}
                headerColumns={headerColumns}
                handleSaveCellChanges={handleSaveCellChanges}
                // expandComponentOverride={}
                // expandEditComponentOverride={}
                // expandData={{}}
                paginationProps={{ page, setPage, countPerPage, setCountPerPage, totalRowCount }}
                editExpandOverrideComponent={<EditModeCustomLayout />}
            />
            <AddAssignmentFlowProvider>
                <AddAssignmentsForm open={openAddAssignmentsForm} handleClose={() => setOpenAddAssignmentsForm(false)} />
            </AddAssignmentFlowProvider>
        </>
    );
};
