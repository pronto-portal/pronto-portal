import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { TranslatorSearchByOption } from './TranslatorSearchByOption';
import { useFilteredTranslators } from '../../contextProviders/FilteredTranslatorsProvider';
import { useSelectCityState } from '../../hooks/useSelectCityState';
import { GetTranslatorsFilters } from '../../types/InputTypes';
import { Translator } from '../../types/ObjectTypes';
import { LanguagesAutocomplete } from '../LanguagesAutocomplete';

interface SearchableTranslator extends Translator {
    label: string;
}

type SearchableTranslatorKey = keyof Pick<Translator, 'phone' | 'email' | 'id' | 'firstName' | 'lastName'>;

type SelectableFields = SearchableTranslatorKey | 'name';

const searchableFields: SelectableFields[] = ['phone', 'email', 'id', 'name'];

export const TranslatorDirectorySearch: React.FC = () => {
    const { translators, filters: ctxFilter, setFilters: ctxSetFilter } = useFilteredTranslators();

    const [searchBy, setSearchBy] = useState<SelectableFields>('id');
    const [searchByValue, setSearchByValue] = useState<string>(ctxFilter.id || '');

    const [selectedLanguages, setSelectedLanguages] = useState<string[]>(ctxFilter.languages || []);
    const { city, setCity, state, setState, stateISOCodes, cities } = useSelectCityState();

    console.log('ctxFilter langs', ctxFilter.languages);
    console.log('selectedLanguages', selectedLanguages);
    console.log('------------------');

    useEffect(() => {
        if (ctxFilter.languages) setSelectedLanguages(ctxFilter.languages);

        if (ctxFilter.state) setState(ctxFilter.state);

        if (ctxFilter.state && ctxFilter.city) setCity(ctxFilter.city);

        if (ctxFilter.firstName && ctxFilter.lastName) {
            setSearchBy('name');
            setSearchByValue(ctxFilter.firstName + ' ' + ctxFilter.lastName);
        }

        if (searchBy !== 'name' && ctxFilter[searchBy]) setSearchByValue(ctxFilter[searchBy] as string);
        else if (searchBy === 'name' && ctxFilter.firstName && ctxFilter.lastName) {
            setSearchByValue(ctxFilter.firstName + ' ' + ctxFilter.lastName);
        }

        console.log('ctxFilter', ctxFilter);
        Object.keys(ctxFilter).forEach((key) => {
            if (searchableFields.includes(key as SearchableTranslatorKey)) {
                console.log(key);
                setSearchBy(key as SearchableTranslatorKey);
                setSearchByValue(ctxFilter[key as SearchableTranslatorKey] as string);
            }
        });
        // searchableFields.forEach((field) => {
        //   if (ctxFilter[field]) {
        //     setSearchBy(field);
        //     setSearchByValue(ctxFilter[field] as string);
        //   }
        // });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ctxFilter.languages, ctxFilter.city, ctxFilter.state, ctxFilter, setCity, setState]);

    const handleApplyFilters = () => {
        const newFilters: GetTranslatorsFilters = {};

        if (selectedLanguages && selectedLanguages.length) newFilters.languages = [...(newFilters.languages || []), ...selectedLanguages];

        if (city) newFilters.city = city;

        if (state) newFilters.state = state;

        if (searchBy && searchByValue) {
            if (searchBy === 'name') {
                const [firstName, lastName] = searchByValue.split(' ');
                newFilters.firstName = firstName;
                newFilters.lastName = lastName;
            } else {
                newFilters[searchBy] = searchByValue as string & string[];
            }
        } else {
            if (searchBy === 'name') {
                delete newFilters.firstName;
                delete newFilters.lastName;
            } else {
                delete newFilters[searchBy];
            }
        }

        console.log('Setting new filters', newFilters);
        ctxSetFilter(newFilters);
    };

    // const searchableTranslators: SearchableTranslator[] = translators.map(
    //   (translator) => ({
    //     label: `${translator.id} - ${translator.lastName}, ${translator.firstName} - ${translator.phone} - ${translator.email}`,
    //     ...translator,
    //   })
    // );

    return (
        <Stack direction='row' justifyContent='space-between' spacing={1} flexWrap={'nowrap'}>
            <Stack direction='column' justifyContent='space-between' spacing={1} flex={1} flexWrap={'nowrap'}>
                <Stack direction='row' justifyContent='space-between' spacing={1} alignItems='center'>
                    <Autocomplete
                        sx={{ flex: 1 }}
                        onChange={(_e, newValue) => {
                            setSearchByValue(
                                newValue ? (searchBy === 'name' ? newValue.firstName + ' ' + newValue.lastName : newValue[searchBy].toString()) : ''
                            );
                        }}
                        value={
                            translators.find((translator) => {
                                const searchBySplit = searchByValue.split(' ');
                                const firstName = searchBySplit[0];
                                const lastName = searchBySplit[1];
                                return searchBy === 'name'
                                    ? translator.firstName.toLowerCase() === firstName.toLowerCase() &&
                                          translator.lastName.toLowerCase() === lastName.toLowerCase()
                                    : translator[searchBy] === searchByValue;
                            }) || null
                        }
                        options={translators}
                        getOptionLabel={(option) => {
                            if (searchBy === 'name') return `${option.firstName} ${option.lastName}`;

                            return option[searchBy] ? option[searchBy].toString() : '';
                        }}
                        renderInput={(params) => <TextField {...params} label={`Search by ${searchBy}`} variant='standard' />}
                        renderOption={(props, option) => (
                            <Box component='li' {...props}>
                                <TranslatorSearchByOption translator={option} />
                            </Box>
                        )}
                    />
                    <TextField
                        sx={{ flex: 0.25 }}
                        select
                        defaultValue={searchBy}
                        value={searchBy}
                        onChange={(e) => setSearchBy(e.target.value as SearchableTranslatorKey)}
                        label='Search by'
                        variant='standard'
                    >
                        {searchableFields.map((field) => (
                            <MenuItem key={`searchableTranslatorField${field}`} value={field}>
                                {field}
                            </MenuItem>
                        ))}
                    </TextField>
                </Stack>
                <Stack direction='row' justifyContent='space-between' spacing={1} alignItems='center'>
                    <LanguagesAutocomplete
                        sx={{ flex: 1 }}
                        value={selectedLanguages || []}
                        onChange={(val) => {
                            console.log('val', val);
                            if (val) setSelectedLanguages(val as string[]);
                        }}
                        multiple
                        label='Languages'
                    />
                    <Autocomplete
                        value={state}
                        defaultValue={ctxFilter.state}
                        sx={{ flex: 1 }}
                        options={stateISOCodes}
                        autoHighlight
                        renderInput={(params) => (
                            <TextField {...params} label='State *' inputProps={{ ...params.inputProps, maxLength: 10 }} variant='standard' />
                        )}
                        onChange={(_e, newValue) => setState(newValue ?? '')}
                    />
                    <Autocomplete
                        value={city}
                        sx={{ flex: 1 }}
                        defaultValue={ctxFilter.city}
                        disabled={!state}
                        options={cities}
                        autoHighlight
                        onChange={(_e, newValue) => setCity(newValue ?? '')}
                        renderInput={(params) => (
                            <TextField {...params} label='City *' inputProps={{ ...params.inputProps, maxLength: 85 }} variant='standard' />
                        )}
                    />
                </Stack>
            </Stack>
            <Stack direction='column' justifyContent='space-around' spacing={1}>
                <Button variant='contained' onClick={handleApplyFilters} fullWidth>
                    Apply Filters
                </Button>
                <Button
                    variant='contained'
                    onClick={() => {
                        ctxSetFilter({});
                    }}
                    fullWidth
                >
                    Clear Filters
                </Button>
            </Stack>
        </Stack>
    );
};
