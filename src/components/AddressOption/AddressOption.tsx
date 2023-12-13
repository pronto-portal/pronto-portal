import React from 'react';
import LocationOn from '@mui/icons-material/LocationOn';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Address } from '../../types/ObjectTypes';

interface AddressOptionProps {
    address: Partial<Address>;
}

export const AddressOption: React.FC<AddressOptionProps> = ({ address }) => {
    console.log(address);
    const addressObject = Object.fromEntries(
        Object.entries(address).filter(([key, value]) => typeof value === 'string' && value !== '' && value !== undefined && key !== 'id') as [string, string][]
    );

    const addressValues = Object.values(addressObject).filter((add) => typeof add === 'string' && add !== '' && add !== undefined) as string[];
    return (
        <Grid container alignItems='center'>
            <Grid item sx={{ display: 'flex', width: 44 }}>
                <LocationOn sx={{ color: 'text.secondary' }} />
            </Grid>
            <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                {addressValues.map((value, index) => (
                    <Box key={index} component='span'>
                        {value}
                        {index !== addressValues.length - 1 ? ', ' : ''}
                    </Box>
                ))}
            </Grid>
        </Grid>
    );
};
