import React from "react";
import { ModelDirectoryLayout } from "../ModelDirectoryLayout";
import { Claimant } from "../../types/ObjectTypes";
import { useFilteredClaimants } from "../../contextProviders/FilteredClaimantsProvider/FilteredClaimantsProvider";

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

  return (
    <ModelDirectoryLayout<Claimant>
      titleText="Claimants"
      tableProps={{
        data: claimants,
        omitFields: ["id"],
        baseRowActions: <></>,
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
