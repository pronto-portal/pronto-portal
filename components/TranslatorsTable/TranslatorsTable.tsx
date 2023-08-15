import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import React from "react";
import { User } from "../../types/User";

interface TranslatorsTable {
  data: User[];
}

export const TranslatorsTable: React.FC<TranslatorsTable> = ({ data }) => {
  // const tableInstance = useReactTable({
  //   data,
  //   getCoreRowModel: getCoreRowModel(),
  //   getPaginationRowModel: getPaginationRowModel(),
  //   getSortedRowModel: getSortedRowModel(), //order doesn't matter anymore!
  //   // etc.
  // });
  return <></>;
};
