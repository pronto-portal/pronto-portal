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
import TableContainer from "@mui/material/TableContainer";
import { CollapsableRow } from "../CollapsableRow/CollapsableRow";
import { ModelsTableProps } from "../../types/PropTypes/ModelTableProps";
import { grey } from "@mui/material/colors";
import Paper from "@mui/material/Paper";

export const ModelsTable = <T extends {}>({
  data,
  expandObjects,
  expandObjectDepth = 0,
  depth = 0,
  omitFields,
  omitExpandFields = [],
  nestedRowActions,
  rowActions,
  fieldFormatters = {},
}: ModelsTableProps<T>) => {
  const dataKeys =
    data && data.length > 0 && data[0] ? Object.keys(data[0]) : [];
  const expandableEntries =
    data && data.length > 0 && data[0]
      ? Object.entries(data[0]).filter(
          ([_, value]) => typeof value === "object"
        )
      : [];

  const expandableKeys = expandableEntries.length
    ? expandableEntries
        .filter(([_, value]) => typeof value === "object")
        .map(([key]) => key)
    : [];

  const columns: ColumnDef<T, unknown>[] = dataKeys
    .map((key) => {
      const column: ColumnDef<T, unknown> = {
        accessorKey: key,
        id: key,
        header: splitCamelCase(key),
        cell: (props) => {
          const value = props.row.original[key as keyof T];
          const formatter = fieldFormatters[key as keyof T];

          if (formatter) {
            return formatter(value);
          }

          return value;
        },
      };

      return column;
    })
    .filter((column) => {
      const key = column.accessorKey.toString();
      const allExluded = Array.from(
        new Set([...(omitFields || []), ...expandableKeys])
      );

      const showColumn = allExluded.indexOf(key) === -1;

      return showColumn;
    });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const showExpandedObjects = expandObjects && depth < expandObjectDepth;

  const stickyHeader = depth === 0 ? true : false;

  return (
    <Paper sx={{ maxHeight: "100%", height: "100%" }}>
      <TableContainer sx={{ maxHeight: "100%", height: "100%" }}>
        <Table
          stickyHeader={stickyHeader}
          sx={{ maxHeight: "100%", height: "100%" }}
        >
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    sx={{ backgroundColor: "primary.dark" }}
                  >
                    {header.isPlaceholder ? null : (
                      <Typography fontWeight="bold" color="#fff">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </Typography>
                    )}
                  </TableCell>
                ))}
                {rowActions !== undefined ? (
                  <TableCell sx={{ backgroundColor: "primary.dark" }} />
                ) : null}
                {showExpandedObjects ? (
                  <TableCell sx={{ backgroundColor: "primary.dark" }} />
                ) : null}
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
            {table.getRowModel().rows.map((row) =>
              showExpandedObjects ? (
                <CollapsableRow
                  row={row}
                  key={row.id}
                  expandableSx={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: grey[100],
                  }}
                  actions={rowActions && depth === 0 ? rowActions : undefined}
                >
                  {
                    // This will render every expanded object as a new table recursively
                    expandableEntries.map(([key, value]) => {
                      const column: ColumnDef<T, unknown> = {
                        accessorKey: key,
                        id: key,
                        header: splitCamelCase(key),
                      };

                      const childTableData: (T[keyof T] & {})[] = Array.isArray(
                        value
                      )
                        ? value
                        : [value];

                      const renderRowActions =
                        nestedRowActions !== undefined && depth > 0
                          ? nestedRowActions(row.original)[key as keyof T]
                          : rowActions
                          ? rowActions(row.original)
                          : undefined;

                      return (
                        omitExpandFields.findIndex((val) => val === key) ===
                          -1 && (
                          <TableCell
                            key={column.id}
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              rowGap: 5,
                            }}
                          >
                            <Typography variant="h5">
                              {splitCamelCase(key)}
                            </Typography>
                            <ModelsTable
                              data={childTableData}
                              expandObjects={expandObjects}
                              omitExpandFields={omitExpandFields}
                              expandObjectDepth={expandObjectDepth}
                              depth={depth + 1}
                              omitFields={omitFields}
                              rowActions={(_) => renderRowActions}
                            />
                          </TableCell>
                        )
                      );
                    })
                  }
                </CollapsableRow>
              ) : (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell key={cell.id}>
                        <Typography>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </Typography>
                      </TableCell>
                    );
                  })}
                  {rowActions !== undefined ? (
                    <TableCell>{rowActions(row.original)}</TableCell>
                  ) : null}
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
