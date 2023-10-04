import React from "react";
import { ModelDirectoryLayout } from "../ModelDirectoryLayout";
import { Claimant } from "../../types/ObjectTypes";
import { useFilteredClaimants } from "../../contextProviders/FilteredClaimantsProvider/FilteredClaimantsProvider";
import { ModelNestedRowActionsProps } from "../ModelNestedRowActions";
import { useClaimantWrite } from "../../contextProviders/ClaimantWriteProvider/ClaimantWriteProvider";
import { useLanguages } from "../../contextProviders/LanguagesProvider";

export const ClaimantsDirectory: React.FC = () => {
  const {
    claimants,
    isLoading,
    page,
    setPage,
    totalRowCount,
    countPerPage,
    setCountPerPage,
  } = useFilteredClaimants();

  const { setIsEditOpen, setClaimant } = useClaimantWrite();
  const { getLanguageFromCode } = useLanguages();

  return (
    <ModelDirectoryLayout<Claimant>
      titleText="Claimants"
      tableProps={{
        data: claimants,
        omitFields: ["id"],
        rowActions: (data) => (
          <ModelNestedRowActionsProps<Claimant>
            datum={data}
            onEditClick={() => {
              setClaimant(data);
              setIsEditOpen(true);
            }}
          />
        ),
        fieldFormatters: {
          primaryLanguage: (lang) => getLanguageFromCode(lang),
          languages: (langs) => {
            return langs
              .map((lang: string) => getLanguageFromCode(lang))
              .join(", ");
          },
        },
      }}
      isLoading={isLoading}
      page={page}
      setPage={setPage}
      totalRowCount={totalRowCount}
      countPerPage={countPerPage}
      setCountPerPage={setCountPerPage}
    />
  );
};
