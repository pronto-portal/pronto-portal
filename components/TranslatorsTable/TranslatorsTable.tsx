import React from 'react';
import { User } from '../../types/User';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from '@tanstack/react-table';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

interface TranslatorsTableProps {
  data: User[];
}

export const TranslatorsTable: React.FC<TranslatorsTableProps> = ({ data }) => {
  const columnHelper = createColumnHelper<User>();

  const columns = [
    columnHelper.accessor('firstName', {
      cell: info => `${info.row.original.firstName} ${info.row.original.lastName}`,
      header: () => 'Name',
    }),
    columnHelper.accessor('email', {
      header: () => 'Email',
    }),
    columnHelper.accessor('phone', {
      header: () => 'Phone',
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table>
      <TableHead>
        {table.getHeaderGroups().map(headerGroup => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <TableCell key={header.id}>
                {header.isPlaceholder
                  ? null
                  : <Typography>{flexRender(header.column.columnDef.header, header.getContext())}</Typography>}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {table.getRowModel().rows.map(row => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map(cell => (
              <TableCell key={cell.id} >
                <Typography>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Typography>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
