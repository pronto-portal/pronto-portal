import React, { useState, useCallback } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { debounce } from '@mui/material/utils';
import axios from 'axios';
import { BaseAddress } from '../../types/ObjectTypes';

interface GoogleMapsAutoCompleteProps {
    value: BaseAddress | undefined;
    onChange: (value: BaseAddress) => void;
}

const GoogleMapsAutoComplete: React.FC<GoogleMapsAutoCompleteProps> = ({ value: higherValue, onChange }) => {
    const [value, setValue] = useState<BaseAddress | null>(null);
    const [options, setOptions] = useState<readonly BaseAddress[]>([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchPlaces = useCallback(
        debounce((input: string) => {
            const higherValueAddressText = higherValue
                ? `${higherValue.address1} ${higherValue.address2} ${higherValue.city}, ${higherValue.state} ${higherValue.zipCode}`
                : '';

            axios
                .post('/api/google/places', {
                    text: input || higherValueAddressText,
                })
                .then((res) => {
                    setOptions(res.data);
                })
                .catch((error) => {
                    console.error('Error fetching places:', error);
                });
        }, 500), // 500ms debounce time
        []
    );

    const handleInputChange = (_: React.SyntheticEvent, newInputValue: string) => {
        fetchPlaces(newInputValue);
    };

    return (
        <Autocomplete
            id='google-map-demo'
            sx={{ width: '100%' }}
            getOptionLabel={(option) => `${option.address1} ${option.address2} ${option.city}, ${option.state} ${option.zipCode}`}
            filterOptions={(x) => x.filter((option) => option.address1)}
            options={options}
            autoComplete
            includeInputInList
            filterSelectedOptions
            value={value}
            noOptionsText='No locations'
            onChange={(_, newValue) => {
                setOptions(newValue ? [newValue, ...options] : options);
                setValue(newValue);

                if (newValue) onChange(newValue);
            }}
            onInputChange={handleInputChange}
            renderInput={(params) => <TextField {...params} label='Set a location' fullWidth />}
            renderOption={(props, option) => {
                return (
                    <li {...props}>
                        <Grid container alignItems='center'>
                            <Grid item sx={{ display: 'flex', width: 44 }}>
                                <LocationOnIcon sx={{ color: 'text.secondary' }} />
                            </Grid>
                            <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                                <Typography variant='body2' color='text.secondary'>
                                    {option.address1} {option.address2}
                                </Typography>
                                <Typography variant='body2' color='text.secondary'>
                                    {option.city ? `${option.city},` : ''} {option.state} {option.zipCode}
                                </Typography>
                            </Grid>
                        </Grid>
                    </li>
                );
            }}
        />
    );
};

export default GoogleMapsAutoComplete;
