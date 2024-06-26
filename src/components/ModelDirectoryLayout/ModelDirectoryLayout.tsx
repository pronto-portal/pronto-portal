import React from 'react';
import Info from '@mui/icons-material/Info';
import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import Stack from '@mui/material/Stack';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import { PaginationState } from '../../hooks/usePaginationState';
import { ModelsTableProps } from '../../types/PropTypes/ModelTableProps';
import { Collapsable } from '../Collapsable';
import { ModelsTable } from '../ModelsTable';

interface ModelDirectoryLayoutProps<T extends {}> extends PaginationState {
    titleText: string;
    totalRowCount: number;
    isLoading?: boolean;
    actions?: React.ReactNode;
    renderFilters?: React.ReactNode;
    filtersOpen?: boolean;
    setFiltersOpen?: (newVal: boolean) => void;
    tableProps: ModelsTableProps<T>;
}

export const ModelDirectoryLayout = <T extends {}>({
    titleText,
    actions,
    renderFilters,
    isLoading,
    page,
    setPage,
    totalRowCount,
    countPerPage,
    setCountPerPage,
    tableProps,
    filtersOpen = false,
    setFiltersOpen = (_: boolean) => {},
}: ModelDirectoryLayoutProps<T>) => {
    return (
        <>
            {!isLoading ? (
                <Stack
                    direction='column'
                    flexWrap='nowrap'
                    flexDirection='column'
                    justifyContent='space-between'
                    sx={{ width: '100%', height: '100%' }}
                    spacing={1}
                >
                    {!isLoading && renderFilters !== undefined ? (
                        <Box sx={{ width: '100%', flex: 0.25 }}>
                            <Collapsable
                                sx={{
                                    width: '100%',
                                    backgroundColor: grey[100],
                                    boxShadow: 'none',
                                    borderWidth: 0,
                                }}
                                sxSummary={{
                                    height: 'auto',
                                }}
                                sxDetails={{
                                    height: '100%',
                                }}
                                title='Filters'
                                open={filtersOpen}
                                onToggle={() => setFiltersOpen(!filtersOpen)}
                            >
                                {renderFilters}
                            </Collapsable>
                        </Box>
                    ) : null}

                    {tableProps.data.length ? (
                        <>
                            <Box
                                sx={{
                                    width: '100%',
                                    flex: 1,
                                    overflowY: 'auto',
                                }}
                            >
                                <ModelsTable {...tableProps} />
                            </Box>
                            <Box sx={{ width: '100%', flex: 0.25 }}>
                                <TablePagination
                                    component='div'
                                    page={page}
                                    onPageChange={(_, page) => setPage(page)}
                                    count={totalRowCount}
                                    rowsPerPage={countPerPage}
                                    onRowsPerPageChange={(e) => setCountPerPage(parseInt(e.target.value, 10))}
                                />
                            </Box>
                        </>
                    ) : (
                        <Stack alignItems='center' justifyContent='center' width='100%' height='100%' direction='column' sx={{ opacity: 0.5 }}>
                            <Info
                                sx={{
                                    color: 'warning.main',
                                    width: '4rem',
                                    height: '4rem',
                                }}
                            />
                            <Typography variant='h4' textAlign='center' color='warning.main'>
                                No {titleText} Found
                            </Typography>
                        </Stack>
                    )}
                    <Stack direction='row' justifyContent='flex-end' alignItems='center' spacing={1}>
                        {actions}
                    </Stack>
                </Stack>
            ) : null}
        </>
    );
};
