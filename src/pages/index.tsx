import React from 'react';
import { Stack } from '@mui/material';
import { TranslatorDirectory } from '../components/TranslatorDirectory/TranslatorDirectory';
import { FilteredTranslatorsProvider } from '../contextProviders/FilteredTranslatorsProvider';
import { TranslatorWriteProvider } from '../contextProviders/TranslatorWriteProvider';
import useDetectRouteChange from '../src/hooks/useDetectRouteChange';

export default function Translators() {
    return (
        <FilteredTranslatorsProvider key='translatorPage'>
            <TranslatorWriteProvider>
                <Stack direction='column' width='100%' height='100%' alignItems='flex-start' justifyContent='flex-start' spacing={2} p={2}>
                    <TranslatorDirectory />
                </Stack>
            </TranslatorWriteProvider>
        </FilteredTranslatorsProvider>
    );
}
