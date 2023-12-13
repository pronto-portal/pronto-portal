import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { SxProps, Theme } from '@mui/material';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { flexRender, Row } from '@tanstack/react-table';

interface CollapsableRowProps<T extends {}> {
    row: Row<T>;
    children?: React.ReactNode;
    expandableSx?: SxProps<Theme>;
    actions?: (datum: T) => React.ReactNode;
}

export const CollapsableRow = <T extends {}>({ row, expandableSx = {}, children, actions }: CollapsableRowProps<T>) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                        <Typography>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Typography>
                    </TableCell>
                ))}
                {actions ? <TableCell>{actions(row.original as T)}</TableCell> : null}
                <TableCell>
                    <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout='auto' unmountOnExit>
                        <Box sx={expandableSx}>{children}</Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};
