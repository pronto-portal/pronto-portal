import React, { useState } from 'react';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import styled from '@mui/system/styled';
import moment from 'moment';
import { useRouter } from 'next/router';
import { ConfirmationModal } from '../../../components/ConfirmationModal';
import { FlexRowGridItem } from '../../../components/FlexRowGridItem';
import { useStripeProvider } from '../../../contextProviders/StripeProvider';
import useUser from '../../../hooks/useUser';
import { useGetUserQuery } from '../../../redux/reducers';

const HorizontalDivider = styled(Divider)(({ theme }) => ({
    width: '100%',
    borderColor: theme.palette.primary.light,
}));

const FlexGridItemCenterItems = styled(FlexRowGridItem)({
    alignItems: 'center',
    justifyContent: 'space-between',
});

const Subscribe: React.FC = () => {
    const router = useRouter();
    const { user, isLoading, role, remainingReminders, remainingTranslators, translatorsLimit, remindersLimit, refetch } = useUser();
    const { toggleAutoRenewal, isToggleAutoRenewalLoading } = useStripeProvider();
    const [open, setOpen] = useState(false);

    const roleName: React.ReactNode = role && !isLoading ? role.name : <CircularProgress sx={{ height: '100%' }} />;

    const monthlyPrice: React.ReactNode = role && !isLoading ? role.priceCents / 100 : <CircularProgress sx={{ height: '100%' }} />;

    const handeConfirmationClose = () => {
        refetch();
        setOpen(false);
    };

    return (
        <>
            <Stack
                direction='column'
                alignItems='center'
                justifyContent='center'
                width='100%'
                height='100%'
                spacing={2}
                paddingTop={3}
                paddingBottom={3}
                paddingLeft={1}
                paddingRight={1}
            >
                <Box
                    sx={{
                        width: '60%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        borderRadius: '50px',
                    }}
                >
                    <Box
                        sx={{
                            borderTopLeftRadius: '50px',
                            borderTopRightRadius: '50px',
                        }}
                        width='100%'
                        paddingTop={2}
                    >
                        <Typography variant='h5' textAlign='center'>
                            Manage Subscription
                        </Typography>
                    </Box>
                    <Grid container direction='column' paddingTop={3} paddingBottom={3} spacing={2} width='90%' height='100%'>
                        <FlexGridItemCenterItems>
                            <Typography variant='body1' textAlign='right' fontWeight='bold'>
                                Subscription tier:
                            </Typography>
                            <Typography variant='body1'>{roleName}</Typography>
                        </FlexGridItemCenterItems>
                        <FlexGridItemCenterItems>
                            <HorizontalDivider />
                        </FlexGridItemCenterItems>
                        <FlexGridItemCenterItems>
                            <Typography variant='body1' fontWeight='bold'>
                                Translators remaining:
                            </Typography>
                            <Typography variant='body1'>
                                {role && role.name.toLowerCase() === 'unlimited' ? <AllInclusiveIcon /> : `${remainingTranslators} / ${translatorsLimit}`}
                            </Typography>
                        </FlexGridItemCenterItems>
                        <FlexGridItemCenterItems>
                            <HorizontalDivider />
                        </FlexGridItemCenterItems>
                        <FlexGridItemCenterItems>
                            <Typography variant='body1' fontWeight='bold'>
                                Assignment reminders remaining:
                            </Typography>
                            <Typography variant='body1'>
                                {role && role.name.toLowerCase() === 'unlimited' ? <AllInclusiveIcon /> : `${remainingReminders} / ${remindersLimit}`}
                            </Typography>
                        </FlexGridItemCenterItems>
                        <FlexGridItemCenterItems>
                            <HorizontalDivider />
                        </FlexGridItemCenterItems>
                        <FlexGridItemCenterItems>
                            <Typography variant='body1' fontWeight='bold'>
                                Monthly Cost:
                            </Typography>
                            <Typography variant='body1'>${monthlyPrice}</Typography>
                        </FlexGridItemCenterItems>
                        <FlexGridItemCenterItems>
                            <HorizontalDivider />
                        </FlexGridItemCenterItems>
                        <FlexGridItemCenterItems>
                            <Typography variant='body1' fontWeight='bold'>
                                {user && user.autoRenewSubscription ? 'Subscription ends on' : 'Subscription will auto-renew on'}
                            </Typography>
                            <Typography variant='body1'>
                                {user && user.subscriptionEndDate ? moment(user.subscriptionEndDate).format('MMM Do, YYYY') : 'N/A'}
                            </Typography>
                        </FlexGridItemCenterItems>
                        <FlexGridItemCenterItems>
                            <HorizontalDivider />
                        </FlexGridItemCenterItems>
                        <FlexRowGridItem sx={{ justifyContent: 'space-around', flex: 0.5 }}>
                            <Button
                                variant='contained'
                                onClick={() => {
                                    router.push('/subscribe');
                                }}
                            >
                                Change Subscription
                            </Button>
                            <Button color={user && user.autoRenewSubscription ? 'success' : 'error'} variant='contained' onClick={() => setOpen(true)}>
                                {`${user && user.autoRenewSubscription ? 'Enable' : 'Disable'} Autorenewal`}
                            </Button>
                        </FlexRowGridItem>
                    </Grid>
                </Box>
            </Stack>
            <ConfirmationModal
                buttonText={`${user && user.autoRenewSubscription ? 'Enable' : 'Disable'} Auto renewal`}
                open={open}
                message={`Are you sure you want to ${user && user.autoRenewSubscription ? 'enable' : 'disable'} auto-renewal of your subscription?`}
                onConfirm={() => toggleAutoRenewal(handeConfirmationClose)}
                onClose={handeConfirmationClose}
                isLoading={isToggleAutoRenewalLoading}
                type={user && !user.autoRenewSubscription ? 'warning' : 'success'}
            />
        </>
    );
};

export default Subscribe;
