import React from "react";
import Stack from "@mui/material/Stack";
import { User } from "../../types/User";

interface TranslatorDirectorySearchProps {
  translators: User[];
}

export const TranslatorDirectorySearch: React.FC<
  TranslatorDirectorySearchProps
> = ({ translators }) => {
  return (
    <Stack direction="row" justifyContent="space-between" spacing={1}></Stack>
  );
};
