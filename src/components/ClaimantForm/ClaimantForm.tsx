import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useAddAssignmentFlow } from '../../contextProviders/AddAssignmentFlowProvider';
import { useCreateClaimantMutation, useGetClaimantsQuery } from '../../redux/reducers/claimantReducer';
import { Claimant } from '../../types/ObjectTypes';
import { AssignmentFlowForm } from '../../types/PropTypes/AssignmentFlowForm';
import { AddEditClaimantForm } from '../AddEditClaimantForm';
import { UserInfoAutocompleteOption } from '../UserInfoAutocompleteOption';

export const ClaimantForm: React.FC<AssignmentFlowForm> = ({ onSuccess }) => {
    const { data } = useGetClaimantsQuery({});
    const [_, { isLoading }] = useCreateClaimantMutation();
    const { claimant, setClaimant } = useAddAssignmentFlow();

    const claimantExists = !!Object.keys(claimant).length;

    const handleOnSelectExistingClaimant = () => {
        if (claimantExists) {
            onSuccess();
        }
    };

    const onClaimantFormSubmit = (data?: Claimant) => {
        if (data) {
            setClaimant(data);
            onSuccess();
        }
    };

    return (
        <Grid container spacing={1} direction='column' alignItems='center' alignContent='center'>
            <Grid item width={1}>
                <AddEditClaimantForm onSuccess={onClaimantFormSubmit} id={claimant ? claimant.id : ''} />
            </Grid>
            <Grid item width={1} xs={2}>
                <Divider sx={{ paddingBottom: 1 }} />
            </Grid>
            <Grid item width={1} xs={1}>
                <Typography textAlign='center'>Or select an existing claimant</Typography>
            </Grid>

            <Grid item width={1} xs={1}>
                <Autocomplete
                    {...(claimantExists ? { defaultValue: claimant } : {})}
                    options={data?.getClaimants?.claimants || []}
                    getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                    onChange={(_, newValue) => {
                        if (newValue) {
                            setClaimant(newValue);
                        }
                    }}
                    renderOption={(props, option) => (
                        <li {...props} key={option.id}>
                            <UserInfoAutocompleteOption option={option} />
                        </li>
                    )}
                    renderInput={(params) => <TextField {...params} label='Claimants' variant='outlined' fullWidth />}
                />
            </Grid>
            <Grid item xs={2}>
                <Button onClick={handleOnSelectExistingClaimant} disabled={isLoading || !claimantExists} variant='contained'>
                    Select claimant
                </Button>
            </Grid>
        </Grid>
    );
};

ClaimantForm.defaultProps = {
    mode: 'create',
};
