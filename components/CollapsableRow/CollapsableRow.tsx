import React, { useState } from "react";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { flexRender, Row } from "@tanstack/react-table";
import { SxProps, Theme } from "@mui/material";
import Box from "@mui/material/Box";

interface CollapsableRowProps<T extends {}> {
  row: Row<T>;
  children?: React.ReactNode;
  expandableSx?: SxProps<Theme>;
}

export const CollapsableRow = <T extends {}>({
  row,
  expandableSx = {},
  children,
}: CollapsableRowProps<T>) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        {row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id}>
            <Typography>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </Typography>
          </TableCell>
        ))}
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={expandableSx}>{children}</Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
