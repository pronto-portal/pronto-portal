import React, { useState } from "react";
import { TranslatorDirectorySearch } from "./TranslatorDirectorySearch";
import { useFilteredTranslators } from "../../contextProviders/FilteredTranslatorsProvider";
import { ModelDirectoryLayout } from "../ModelDirectoryLayout";
import { Translator } from "../../types/ObjectTypes";
import { AddTranslatorForm } from "./AddTranslatorForm";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export const TranslatorDirectory: React.FC = () => {
  const {
    translators,
    isLoading,
    page,
    setPage,
    totalRowCount,
    countPerPage,
    setCountPerPage,
  } = useFilteredTranslators();

  const [openAddTranslatorForm, setOpenAddTranslatorForm] =
    useState<boolean>(false);

  return (
    <>
      <ModelDirectoryLayout<Translator>
        titleText="Translators"
        tableProps={{
          data: translators,
          omitFields: ["id"],
          baseRowActions: <></>,
        }}
        actions={
          <Stack direction="row" justifyContent="flex-end" width="100%">
            <Button
              variant="contained"
              onClick={() => setOpenAddTranslatorForm(true)}
            >
              Add Translator
            </Button>
          </Stack>
        }
        isLoading={isLoading}
        page={page}
        setPage={setPage}
        totalRowCount={totalRowCount}
        countPerPage={countPerPage}
        setCountPerPage={setCountPerPage}
        renderFilters={<TranslatorDirectorySearch />}
      />
      <AddTranslatorForm
        open={openAddTranslatorForm}
        handleClose={() => setOpenAddTranslatorForm(false)}
      />
    </>
  );
};
