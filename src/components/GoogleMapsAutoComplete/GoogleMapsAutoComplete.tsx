import React, { useEffect, useState, useRef } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { debounce } from '@mui/material/utils';
import parse from 'autosuggest-highlight/parse';
import { PlaceType } from '../../types/google';

function loadScript(src: string, position: HTMLElement | null, id: string) {
    if (!position) {
        return;
    }

    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.setAttribute('id', id);
    script.src = src;
    position.appendChild(script);
}

const autocompleteService = { current: null };

interface GoogleMapsAutoCompleteProps {
    value: string | undefined;
    onChange: (value: string) => void;
}

const GoogleMapsAutoComplete: React.FC<GoogleMapsAutoCompleteProps> = ({ value: higherValue = '', onChange }) => {
    const [value, setValue] = useState<PlaceType | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState<readonly PlaceType[]>([]);
    const loaded = useRef(false);

    if (typeof window !== 'undefined' && !loaded.current) {
        if (!document.querySelector('#google-maps')) {
            loadScript(
                `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}&libraries=places`,
                document.querySelector('head'),
                'google-maps'
            );
        }

        loaded.current = true;
    }

    const fetch = React.useMemo(
        () =>
            debounce((request: { input: string }, callback: (results?: readonly PlaceType[]) => void) => {
                (autocompleteService.current as any).getPlacePredictions(request, callback);
            }, 400),
        []
    );

    useEffect(() => {
        let active = true;

        if (!autocompleteService.current && (window as any).google) {
            autocompleteService.current = new (window as any).google.maps.places.AutocompleteService();
        }
        if (!autocompleteService.current) {
            return undefined;
        }

        if (inputValue === '') {
            setOptions(value ? [value] : []);
            return undefined;
        }

        fetch({ input: inputValue }, (results?: readonly PlaceType[]) => {
            if (active) {
                let newOptions: readonly PlaceType[] = [];

                if (value) {
                    newOptions = [value];
                }

                if (results) {
                    newOptions = [...newOptions, ...results];
                }

                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };
    }, [value, inputValue, fetch]);

    return (
        <Autocomplete
            id='google-map-demo'
            sx={{ width: '100%' }}
            getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
            filterOptions={(x) => x}
            options={options}
            autoComplete
            includeInputInList
            filterSelectedOptions
            value={value}
            noOptionsText='No locations'
            onChange={(_, newValue: PlaceType | null) => {
                setOptions(newValue ? [newValue, ...options] : options);
                setValue(newValue);

                if (newValue) onChange(newValue.description);
            }}
            onInputChange={(_, newInputValue) => {
                setInputValue(newInputValue);
            }}
            renderInput={(params) => <TextField {...params} label='Set a location' fullWidth />}
            renderOption={(props, option) => {
                const matches = option.structured_formatting.main_text_matched_substrings || [];

                const parts = parse(
                    option.structured_formatting.main_text,
                    matches.map((match: any) => [match.offset, match.offset + match.length])
                );

                return (
                    <li {...props}>
                        <Grid container alignItems='center'>
                            <Grid item sx={{ display: 'flex', width: 44 }}>
                                <LocationOnIcon sx={{ color: 'text.secondary' }} />
                            </Grid>
                            <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                                {parts.map((part, index) => (
                                    <Box key={index} component='span' sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}>
                                        {part.text}
                                    </Box>
                                ))}
                                <Typography variant='body2' color='text.secondary'>
                                    {option.structured_formatting.secondary_text}
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
