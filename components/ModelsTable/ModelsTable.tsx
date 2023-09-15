import React from "react";
import {
  getCoreRowModel,
  useReactTable,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { splitCamelCase } from "../../utils/splitCamelCase";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";

interface ModelsTableProps<T extends {}> {
  data: T[];
  omitFields?: string[];
}

export const ModelsTable = <T extends {}>({
  data,
  omitFields,
}: ModelsTableProps<T>) => {
  const dataKeys = data && data.length > 0 ? Object.keys(data[0]) : [];

  const columns: ColumnDef<T, unknown>[] = dataKeys
    .map((key) => {
      const column: ColumnDef<T, unknown> = {
        accessorKey: key,
        id: key,
        header: splitCamelCase(key),
      };

      return column;
    })
    .filter((column) => {
      if (omitFields) {
        return !omitFields.includes(column.accessorKey.toString());
      } else {
        return true;
      }
    });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <TableContainer sx={{ maxHeight: "100%", height: "100%" }}>
      <Table stickyHeader sx={{ maxHeight: "100%", height: "100%" }}>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell key={header.id}>
                  {header.isPlaceholder ? null : (
                    <Typography>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </Typography>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody
          sx={{
            overflowY: "scroll",
            height: "100%",
            maxHeight: "100%",
            position: "relative",
          }}
        >
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  <Typography>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
