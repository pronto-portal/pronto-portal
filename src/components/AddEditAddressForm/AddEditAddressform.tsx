import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useCreateAddressMutation, useGetAddressQuery, useUpdateAddressMutation } from '../../redux/reducers';
import { Address, BaseAddress } from '../../types/ObjectTypes';
import { ModelForm } from '../../types/PropTypes/AssignmentFlowForm';
import { CreateAddressResponse, UpdateAddressResponse } from '../../types/ResponseTypes';
import { ResponseData, ResponseError } from '../../types/ResponseTypes/base';
import { firstCharToUpper } from '../../utils/firstCharToUpper';
import { AddressSelect } from '../AddressSelect';
import GoogleMapsAutoComplete from '../GoogleMapsAutoComplete/GoogleMapsAutoComplete';
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
    const [googleAddress, setGoogleAddress] = useState<BaseAddress>();
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
            const { address1, city, state, zipCode } = googleAddress;

            if (address1 && city && state && zipCode) {
                const addressData = {
                    address1: address1,
                    address2: submitData.apt,
                    city: city,
                    state: state,
                    zipCode: zipCode,
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
                setAddress(existingAddress);
                setGoogleAddress(existingAddress);
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
                    <GoogleMapsAutoComplete
                        value={googleAddress}
                        onChange={(newVal: BaseAddress) => {
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
                                    setGoogleAddress(data);
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
