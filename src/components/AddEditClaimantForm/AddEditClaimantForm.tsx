// This component will be a form that will allow the user to edit the claimant's information using react hook form and an rtk query hook.
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import phone from 'phone';
import { Controller, SubmitHandler, set, useForm } from 'react-hook-form';
import { useCreateClaimantMutation, useEditClaiamantMutation, useGetClaimantQuery } from '../../redux/reducers/claimantReducer';
import { Claimant } from '../../types/ObjectTypes';
import { ModelForm } from '../../types/PropTypes/AssignmentFlowForm';
import { UpdateClaimantResponse } from '../../types/ResponseTypes';
import { ResponseData, ResponseError } from '../../types/ResponseTypes/base';
import { firstCharToUpper } from '../../utils/firstCharToUpper';
import { validateEmail } from '../../utils/validateEmail';
import { ClaimantSelect } from '../ClaimantSelect';
import { FlexRowGridItem } from '../FlexRowGridItem';
import { LanguagesAutocomplete } from '../LanguagesAutocomplete';
import { ResponsiveForm } from '../ResponsiveForm/ResponsiveForm';

interface AddEditClaimantFormInputs {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    primaryLanguage: string;
    languages: string[];
}

export const AddEditClaimantForm: React.FC<ModelForm<Claimant>> = ({ id = '', onSuccess, mode = 'create', selectExisting = false, defaultValue }) => {
    const { data } = useGetClaimantQuery({ input: { id } }, { skip: mode === 'create' });

    const defaultValues = {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        primaryLanguage: '',
        languages: [],
    };

    const oldClaimant = data?.getClaimant || defaultValues;

    const [editClaimant, { isLoading: isEditLoading }] = useEditClaiamantMutation();
    const [createClaimant, { isLoading: isCreateClaimant }] = useCreateClaimantMutation();
    const { enqueueSnackbar } = useSnackbar();

    const isLoading = isEditLoading || isCreateClaimant;

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<AddEditClaimantFormInputs>({
        defaultValues,
    });

    const [claimant, setClaimant] = useState<Claimant>({} as Claimant);

    useEffect(() => {
        if (data) reset(data.getClaimant);
    }, [data, reset]);

    const onSubmit: SubmitHandler<AddEditClaimantFormInputs> = (data) => {
        const claimantData = {
            ...oldClaimant,
            id: id,
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            email: data.email,
            primaryLanguage: data.primaryLanguage,
            languages: data.languages,
        };

        if (mode === 'edit') {
            editClaimant({ input: claimantData }).then((res) => {
                const { data } = res as ResponseData<UpdateClaimantResponse>;

                if (data) {
                    onSuccess(data.updateClaimant);
                    enqueueSnackbar('Claimant updated successfully', {
                        variant: 'success',
                    });
                } else {
                    const { error } = res as ResponseError;
                    enqueueSnackbar(error.message, { variant: 'error' });
                }
            });
        } else if (mode === 'create') {
            createClaimant({ input: data })
                .unwrap()
                .then((res) => {
                    if (res) {
                        onSuccess(res.createClaimant);
                        enqueueSnackbar('Claimant created', { variant: 'success' });
                    }
                })
                .catch(({ error }: ResponseError) => {
                    if (error) enqueueSnackbar(error.message, { variant: 'error' });
                });
        }
    };

    return (
        <ResponsiveForm onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={1} direction='column' alignItems='center' width={1} height={1}>
                <Grid item>
                    <Typography variant='h6' textAlign='center'>
                        {mode === 'create' ? firstCharToUpper(mode) + ' ' : firstCharToUpper(mode) + ' '}
                        Claimant {mode === 'edit' ? id : ''}
                    </Typography>
                </Grid>
                <FlexRowGridItem item>
                    <Controller
                        name='firstName'
                        rules={{ required: 'First name is required' }}
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label='First Name'
                                variant='outlined'
                                helperText={errors.firstName?.message || ' '}
                                error={!!errors.firstName?.message}
                                fullWidth
                            />
                        )}
                    />
                    <Controller
                        name='lastName'
                        rules={{ required: 'Last name is required' }}
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label='Last Name'
                                helperText={errors.lastName?.message || ' '}
                                error={!!errors.lastName?.message}
                                variant='outlined'
                                fullWidth
                            />
                        )}
                    />
                </FlexRowGridItem>
                <FlexRowGridItem item>
                    <Controller
                        name='phone'
                        rules={{
                            required: 'Phone is required',
                            validate: (value) => {
                                if (!phone(value).isValid) return 'Phone is invalid';

                                return true;
                            },
                        }}
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label='Phone'
                                variant='outlined'
                                helperText={errors.phone?.message || ' '}
                                error={!!errors.phone?.message}
                                onChange={(e) => {
                                    const phoneNumber = phone(e.target.value);
                                    field.onChange(phoneNumber.phoneNumber || e.target.value);
                                }}
                                fullWidth
                            />
                        )}
                    />

                    <Controller
                        name='email'
                        control={control}
                        rules={{
                            required: 'Email is required',
                            validate: (value) => {
                                if (!validateEmail(value)) return 'Email is invalid';

                                return true;
                            },
                        }}
                        render={({ field }) => <TextField {...field} label='Email' variant='outlined' fullWidth />}
                    />
                </FlexRowGridItem>

                <FlexRowGridItem item>
                    <Controller
                        name='primaryLanguage'
                        rules={{ required: 'Primary language is required' }}
                        control={control}
                        render={({ field: { value, onChange, ref } }) => (
                            <LanguagesAutocomplete
                                sx={{
                                    flex: 1,
                                }}
                                value={value}
                                onChange={onChange}
                                multiple={false}
                                label='Primary Language'
                            />
                        )}
                    />

                    <Controller
                        name='languages'
                        control={control}
                        render={({ field: { value, onChange, ref } }) => (
                            <LanguagesAutocomplete
                                sx={{
                                    flex: 1,
                                }}
                                value={value}
                                multiple={true}
                                onChange={onChange}
                                ref={ref}
                                label='Other languages'
                            />
                        )}
                    />
                </FlexRowGridItem>

                <Grid
                    item
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {isLoading ? (
                        <CircularProgress />
                    ) : (
                        <Button type='submit' variant='contained'>
                            {firstCharToUpper(mode)} Claimant
                        </Button>
                    )}
                </Grid>
                {selectExisting && (
                    <>
                        <Grid item width='100%'>
                            <Typography textAlign='center'>Or select an existing claimant</Typography>
                        </Grid>
                        <Grid item width='100%'>
                            <ClaimantSelect
                                defaultValue={defaultValue}
                                onChange={(data) => {
                                    if (data) setClaimant(data);
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <Button variant='contained' onClick={() => onSuccess(claimant)}>
                                Confirm
                            </Button>
                        </Grid>
                    </>
                )}
            </Grid>
        </ResponsiveForm>
    );
};

AddEditClaimantForm.defaultProps = {
    id: '',
    mode: 'create',
};
