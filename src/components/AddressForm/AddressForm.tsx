import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useAddAssignmentFlow } from '../../contextProviders/AddAssignmentFlowProvider';
import { useCreateAddressMutation, useGetAddressesQuery } from '../../redux/reducers';
import { Address } from '../../types/ObjectTypes';
import { AssignmentFlowForm } from '../../types/PropTypes/AssignmentFlowForm';
import { AddEditAddressForm } from '../AddEditAddressForm';

export const AddressForm: React.FC<AssignmentFlowForm> = ({ onSuccess }) => {
    const { data } = useGetAddressesQuery({});
    const [_, { isLoading }] = useCreateAddressMutation();

    const { address, setAddress } = useAddAssignmentFlow();
    console.log(address);

    const addressExists = !!Object.keys(address).length;

    const handleOnSelectExistingAddress = () => {
        if (addressExists) {
            onSuccess();
        }
    };

    return (
        <Grid container spacing={2} direction='column' alignItems='center'>
            <AddEditAddressForm
                onSuccess={(data?: Address) => {
                    if (data) {
                        setAddress(data);
                        onSuccess();
                    }
                }}
                defaultValue={address}
            />
            <Grid xs={1} item width={0.75}>
                <Divider />
            </Grid>
            <Grid item xs={1}>
                <Typography>Or select an existing address</Typography>
            </Grid>
            <Grid item xs={2} width={0.75}>
                <Autocomplete
                    {...(addressExists ? { defaultValue: address } : {})}
                    options={data ? data.getAddresses.addresses : []}
                    getOptionLabel={(option) =>
                        `${option.address1}, ${option.address2 ? option.address2 + ',' : ''} ${option.city}, ${option.state}, ${option.zipCode}`
                    }
                    onChange={(_, newValue) => {
                        if (newValue) {
                            setAddress(newValue);
                        }
                    }}
                    renderInput={(params) => <TextField {...params} label='Address' variant='outlined' fullWidth />}
                />
            </Grid>
            <Grid item xs={2}>
                <Button onClick={handleOnSelectExistingAddress} variant='contained' disabled={isLoading || !addressExists}>
                    Select
                </Button>
            </Grid>
        </Grid>
    );
};
