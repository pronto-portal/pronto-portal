import React from "react";
import { ModelDirectoryLayout } from "../ModelDirectoryLayout";
import { Claimant } from "../../types/ObjectTypes";
import { useFilteredClaimants } from "../../contextProviders/FilteredClaimantsProvider/FilteredClaimantsProvider";
import { ModelNestedRowActionsProps } from "../ModelNestedRowActions";
import { useClaimantWrite } from "../../contextProviders/ClaimantWriteProvider/ClaimantWriteProvider";

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
