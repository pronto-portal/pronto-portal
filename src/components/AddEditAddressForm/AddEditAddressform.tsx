import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useCreateAddressMutation, useGetAddressQuery, useUpdateAddressMutation } from '../../redux/reducers';
import { Address } from '../../types/ObjectTypes';
import { ModelForm } from '../../types/PropTypes/AssignmentFlowForm';
import { CreateAddressResponse, UpdateAddressResponse } from '../../types/ResponseTypes';
import { ResponseData, ResponseError } from '../../types/ResponseTypes/base';
import { firstCharToUpper } from '../../utils/firstCharToUpper';
import geocodeByAddress from '../../utils/geocodeByAddress';
import { AddressSelect } from '../AddressSelect';
import GoogleMaps from '../GoogleMapsAutoComplete/GoogleMapsAutoComplete';
import { ResponsiveForm } from '../ResponsiveForm/ResponsiveForm';

interface AddressFormState {
    apt: string;
}

interface AddEditAddressFormProps extends ModelForm<Address> {
    onSuccess: (data?: Address) => void;
}

export const AddEditAddressForm: React.FC<AddEditAddressFormProps> = ({ onSuccess, mode = 'create', id = '', selectExisting = false, defaultValue }) => {
    const { control, handleSubmit, setValue } = useForm<AddressFormState>({
        defaultValues: {
            apt: defaultValue?.address2 || '',
        },
    });

    const [address, setAddress] = useState<Address>({} as Address);
    const [googleAddress, setGoogleAddress] = useState<string>('');
    const { data, isLoading: isGetAddressLoading } = useGetAddressQuery(
        {
            input: {
                id: id,
            },
        },
        { skip: mode === 'create' }
    );

    const [createAddress, { isLoading: isCreateAddressLoading }] = useCreateAddressMutation();

    const [editAddress, { isLoading: isEditAddressLoading }] = useUpdateAddressMutation();
    const { enqueueSnackbar } = useSnackbar();

    const isLoading = isCreateAddressLoading || isGetAddressLoading || isEditAddressLoading;

    const onSubmit: SubmitHandler<AddressFormState> = async (submitData) => {
        if (googleAddress) {
            const results = await geocodeByAddress(googleAddress);
            const address = results[0].address_components;
            const streetNumber = address.find((item) => item.types.includes('street_number'));
            const streetName = address.find((item) => item.types.includes('route'));
            const city = address.find((item) => item.types.includes('locality'));
            const state = address.find((item) => item.types.includes('administrative_area_level_1'));
            const zipCode = address.find((item) => item.types.includes('postal_code'));
            const address1 = `${streetNumber?.long_name} ${streetName?.long_name}`;

            if (address1 && city && state && zipCode) {
                const addressData = {
                    address1: address1,
                    address2: submitData.apt,
                    city: city.long_name,
                    state: state.short_name,
                    zipCode: zipCode.long_name,
                };

                if (mode === 'create') {
                    createAddress({ input: addressData }).then((res) => {
                        const { data } = res as ResponseData<CreateAddressResponse>;

                        if (data) {
                            enqueueSnackbar('Address created successfully', {
                                variant: 'success',
                            });
                            onSuccess(data.createAddress);
                        } else {
                            const { error } = res as ResponseError;
                            enqueueSnackbar(error.message, { variant: 'error' });
                        }
                    });
                } else if (mode === 'edit') {
                    editAddress({ input: { ...addressData, id: id } }).then((res) => {
                        const { data } = res as ResponseData<UpdateAddressResponse>;

                        if (data) {
                            enqueueSnackbar('Address updated successfully', {
                                variant: 'success',
                            });
                            onSuccess(data.updateAddress);
                        } else {
                            const { error } = res as ResponseError;
                            enqueueSnackbar(error.message, { variant: 'error' });
                        }
                    });
                }
            }
        }
    };

    useEffect(() => {
        if ((data && data.getAddress) || defaultValue) {
            const existingAddress: Address | undefined = data ? data.getAddress : defaultValue;

            if (existingAddress) {
                const googleAddress = `${existingAddress.address1} ${existingAddress.city} ${existingAddress.state} ${existingAddress.zipCode}`;

                setAddress(existingAddress);
                setGoogleAddress(googleAddress);
                setValue('apt', existingAddress.address2 || '');
            }
        }
    }, [data, setGoogleAddress, setValue, defaultValue]);

    return (
        <ResponsiveForm onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} direction='column' alignItems='center' alignContent='center' width='100%' height='100%'>
                <Grid item xs={1}>
                    <Typography>
                        {firstCharToUpper(mode)} address {mode === 'edit' ? id : ''}
                    </Typography>
                </Grid>
                <Grid item xs={2} width={0.75}>
                    <GoogleMaps
                        value={googleAddress}
                        onChange={(newVal: string) => {
                            setGoogleAddress(newVal);
                        }}
                    />
                </Grid>
                <Grid item xs={2} width={0.75}>
                    <Controller name='apt' control={control} render={({ field }) => <TextField {...field} label='Apt/Suite' variant='outlined' fullWidth />} />
                </Grid>
                <Grid item xs={2}>
                    {isLoading ? (
                        <CircularProgress />
                    ) : (
                        <Button type='submit' variant='contained'>
                            {firstCharToUpper(mode)} address
                        </Button>
                    )}
                </Grid>
                {selectExisting && (
                    <>
                        <Grid item xs={2} width={0.75}>
                            <Typography textAlign='center'>Or select an existing address</Typography>
                        </Grid>
                        <Grid item xs={2} width={0.75}>
                            <AddressSelect
                                defaultValue={defaultValue}
                                onChange={(data: Address) => {
                                    setGoogleAddress(`${data.address1} ${data.city} ${data.state} ${data.zipCode}`);
                                    setAddress(data);
                                }}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant='contained' onClick={() => onSuccess(address)}>
                                Confirm
                            </Button>
                        </Grid>
                    </>
                )}
            </Grid>
        </ResponsiveForm>
    );
};