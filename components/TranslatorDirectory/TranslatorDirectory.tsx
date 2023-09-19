import React from "react";
import { TranslatorDirectorySearch } from "./TranslatorDirectorySearch";
import { useFilteredTranslators } from "../../contextProviders/FilteredTranslatorsProvider";
import { ModelDirectoryLayout } from "../ModelDirectoryLayout";
import { User } from "../../types/ObjectTypes";

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

  return (
    <ModelDirectoryLayout<User>
      titleText="Translators"
      tableProps={{
        data: translators,
        omitFields: ["id"],
        baseRowActions: <></>,
      }}
      isLoading={isLoading}
      page={page}
      setPage={setPage}
      totalRowCount={totalRowCount}
      countPerPage={countPerPage}
      setCountPerPage={setCountPerPage}
      renderFilters={<TranslatorDirectorySearch />}
    />
  );
};
