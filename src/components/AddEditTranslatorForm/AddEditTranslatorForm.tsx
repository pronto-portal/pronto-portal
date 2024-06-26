import React, { useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import phone from 'phone';
import { useForm, Controller, SubmitHandler, set } from 'react-hook-form';
import { useSelectCityState } from '../../hooks/useSelectCityState';
import {
    useAddNonUserTranslatorMutation,
    useGetNonUserTranslatorQuery,
    useUpdateNonUserTranslatorMutation,
} from '../../redux/reducers/nonUserTranslatorReducer';
import { Translator, User } from '../../types/ObjectTypes';
import { ModelForm } from '../../types/PropTypes/AssignmentFlowForm';
import { firstCharToUpper } from '../../utils/firstCharToUpper';
import { validateEmail } from '../../utils/validateEmail';
import { FlexRowGridItem } from '../FlexRowGridItem';
import { LanguagesAutocomplete } from '../LanguagesAutocomplete';
import { ResponsiveForm } from '../ResponsiveForm/ResponsiveForm';

export const AddEditTranslatorForm: React.FC<ModelForm<Translator>> = ({ id = '', onSuccess, mode = 'create' }) => {
    const { data, isLoading: isGetUserLoading } = useGetNonUserTranslatorQuery(
        {
            input: { id },
        },
        { skip: mode === 'create' }
    );

    const defaultValues: Partial<Translator> = {
        firstName: '',
        lastName: '',
        city: '',
        state: '',
        email: '',
        phone: '',
        languages: [],
    };

    const oldTranslator = data?.getNonUserTranslator || defaultValues;

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues,
    });

    const { cities, stateISOCodes, city, setCity, state, setState } = useSelectCityState();

    useEffect(() => {
        if (mode === 'edit' && data && data.getNonUserTranslator) {
            reset(data.getNonUserTranslator);
            setCity(data.getNonUserTranslator.city || '');
            setState(data.getNonUserTranslator.state || '');
        }
    }, [data, mode, reset, setCity, setState]);

    const [addAndCreateTranslator, { isLoading: isAddAndCreateLoading }] = useAddNonUserTranslatorMutation();
    const [updateTranslator, { isLoading: isUpdateLoading }] = useUpdateNonUserTranslatorMutation();
    const { enqueueSnackbar } = useSnackbar();

    const isLoading = isAddAndCreateLoading || isUpdateLoading || isGetUserLoading;

    const submit: SubmitHandler<Partial<User>> = (data) => {
        if (mode === 'create')
            addAndCreateTranslator({
                input: {
                    firstName: data.firstName || '',
                    lastName: data.lastName || '',
                    email: data.email || '',
                    phone: data.phone || '',
                    city: data.city,
                    state: data.state,
                    languages: data.languages || [],
                },
            }).then((res) => {
                if ('data' in res) {
                    enqueueSnackbar('Successfully added translator', {
                        variant: 'success',
                    });
                    onSuccess(res.data.addNonUserTranslator);
                } else {
                    enqueueSnackbar('Unable to add or create translator', {
                        variant: 'error',
                    });
                }
            });
        else if (mode === 'edit') {
            updateTranslator({
                input: {
                    ...oldTranslator,
                    id: id,
                    firstName: data.firstName || '',
                    lastName: data.lastName || '',
                    email: data.email || '',
                    phone: data.phone || '',
                    city: data.city,
                    state: data.state,
                    languages: data.languages || [],
                },
            }).then((res) => {
                if ('data' in res) {
                    enqueueSnackbar('Successfully updated translator', {
                        variant: 'success',
                    });
                    onSuccess(res.data.updateNonUserTranslator);
                } else {
                    enqueueSnackbar('Unable to update translator', {
                        variant: 'error',
                    });
                }
            });
        }
    };

    return (
        <ResponsiveForm onSubmit={handleSubmit(submit)}>
            <Grid container direction='column' width={1} height={1} gap={1} p={1} spacing={1}>
                <Grid item>
                    <Typography textAlign='center'>{mode === 'create' ? 'Add Translator' : 'Edit Translator'}</Typography>
                </Grid>
                <FlexRowGridItem item>
                    <Controller
                        name='firstName'
                        rules={{ required: true }}
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label='First Name'
                                error={!!errors.firstName}
                                helperText={!!errors.firstName ? 'First Name required' : ' '}
                            />
                        )}
                    />
                    <Controller
                        name='lastName'
                        rules={{ required: true }}
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label='Last Name'
                                error={!!errors.lastName}
                                helperText={!!errors.lastName ? 'Last Name required' : ' '}
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
                                if (!phone(value || '').isValid) return 'Phone is invalid';

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
                                if (!validateEmail(value || '')) return 'Email is invalid';

                                return true;
                            },
                        }}
                        render={({ field }) => <TextField {...field} label='Email' variant='outlined' fullWidth />}
                    />
                </FlexRowGridItem>
                <FlexRowGridItem>
                    <Controller
                        name='state'
                        rules={{ required: false }}
                        control={control}
                        render={({ field }) => (
                            <Autocomplete
                                {...field}
                                value={state}
                                defaultValue={state}
                                sx={{ flex: 1 }}
                                options={stateISOCodes}
                                autoHighlight
                                renderInput={(params) => (
                                    <TextField {...params} label='State *' inputProps={{ ...params.inputProps, maxLength: 10 }} helperText=' ' />
                                )}
                                onChange={(e, newValue) => {
                                    setState(newValue ?? '');
                                    field.onChange(newValue);
                                }}
                            />
                        )}
                    />
                    <Controller
                        name='city'
                        rules={{ required: true }}
                        control={control}
                        render={({ field }) => (
                            <Autocomplete
                                {...field}
                                value={city}
                                sx={{ flex: 1 }}
                                defaultValue={city}
                                disabled={!state}
                                options={cities}
                                autoHighlight
                                renderInput={(params) => (
                                    <TextField {...params} label='City *' inputProps={{ ...params.inputProps, maxLength: 85 }} helperText=' ' />
                                )}
                                onChange={(e, newValue) => {
                                    setCity(newValue ?? '');
                                    field.onChange(newValue);
                                }}
                            />
                        )}
                    />
                </FlexRowGridItem>
                <Grid item>
                    <Controller
                        name='languages'
                        rules={{ required: false }}
                        control={control}
                        render={({ field: { onChange, ref, value } }) => (
                            <LanguagesAutocomplete
                                sx={{
                                    flex: 1,
                                }}
                                value={value}
                                multiple={true}
                                onChange={onChange}
                                ref={ref}
                                label='Languages'
                            />
                        )}
                    />
                </Grid>
                <FlexRowGridItem
                    item
                    sx={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {isLoading ? (
                        <CircularProgress />
                    ) : (
                        <Button type='submit' variant='contained'>
                            {firstCharToUpper(mode)} translator
                        </Button>
                    )}
                </FlexRowGridItem>
            </Grid>
        </ResponsiveForm>
    );
};
