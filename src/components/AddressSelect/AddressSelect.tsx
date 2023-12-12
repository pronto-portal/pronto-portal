import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useGetAddressesQuery } from '../../redux/reducers';
import { Address } from '../../types/ObjectTypes';

interface AddressSelectProps {
    onChange?: (address: Address) => void;
    onConfirm?: (claimant: Address) => void;
    enableForm?: boolean;
    defaultValue?: Address;
}

const defaultOnChange: (claimant: Address) => void = (claimant = {} as Address) => {};

export const AddressSelect: React.FC<AddressSelectProps> = ({ onChange = defaultOnChange, onConfirm = defaultOnChange, enableForm = false, defaultValue }) => {
    const { data } = useGetAddressesQuery({});
    const [address, setAddress] = useState<Address>();

    return (
        <Stack width='100%' height='100%' direction='column' alignItems='center' spacing={2} p={2}>
            <Autocomplete
                {...(defaultValue ? { defaultValue } : {})}
                options={data ? data.getAddresses.addresses : []}
                getOptionLabel={(option) =>
                    `${option.address1}, ${option.address2 ? option.address2 + ',' : ''} ${option.city}, ${option.state}, ${option.zipCode}`
                }
                fullWidth
                onChange={(_, newValue) => {
                    if (newValue) {
                        if (enableForm) setAddress(newValue);
                        else onChange(newValue);
                    }
                }}
                renderInput={(params) => <TextField {...params} label='Address' variant='outlined' fullWidth />}
            />
            {enableForm ? (
                <Button
                    onClick={() => {
                        if (address) onConfirm(address);
                    }}
                    variant='contained'
                    disabled={!address}
                >
                    Confirm
                </Button>
            ) : null}
        </Stack>
    );
};
