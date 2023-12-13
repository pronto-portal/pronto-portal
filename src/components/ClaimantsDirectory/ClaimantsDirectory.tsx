import React from 'react';
import { useClaimantWrite } from '../../contextProviders/ClaimantWriteProvider/ClaimantWriteProvider';
import { useFilteredClaimants } from '../../contextProviders/FilteredClaimantsProvider/FilteredClaimantsProvider';
import { useLanguages } from '../../contextProviders/LanguagesProvider';
import { Claimant } from '../../types/ObjectTypes';
import { ModelDirectoryLayout } from '../ModelDirectoryLayout';
import { ModelNestedRowActionsProps } from '../ModelNestedRowActions';

export const ClaimantsDirectory: React.FC = () => {
    const { claimants, isLoading, page, setPage, totalRowCount, countPerPage, setCountPerPage } = useFilteredClaimants();

    const { setIsEditOpen, setClaimant } = useClaimantWrite();
    const { getLanguageFromCode } = useLanguages();

    return (
        <ModelDirectoryLayout<Claimant>
            titleText='Claimants'
            tableProps={{
                data: claimants,
                omitFields: ['id'],
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
                        return langs.map((lang: string) => getLanguageFromCode(lang)).join(', ');
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
