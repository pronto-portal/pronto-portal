import React from 'react';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useStripeProvider } from '../../contextProviders/StripeProvider';
import useUser from '../../hooks/useUser';
import { Role } from '../../types/ObjectTypes';
import { firstCharToUpper } from '../../utils/firstCharToUpper';
import { formatCurrency } from '../../utils/formatCurrency';

interface SubscriptionCardProps {
    role: Role;
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ role }) => {
    const { name, description, priceCents, features, stripePriceId } = role;
    const { user } = useUser();

    const { createCheckoutSession } = useStripeProvider();
    const theme = useTheme();

    return (
        <Paper sx={{ width: '100%', height: '100%', padding: 0, borderRadius: '50px' }}>
            <Grid container direction='column' sx={{ height: '100%' }} flexWrap='nowrap'>
                <Grid
                    item
                    xs={2}
                    sx={{
                        backgroundColor: theme.palette.primary.dark,
                        borderTopLeftRadius: '50px',
                        borderTopRightRadius: '50px',
                    }}
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                >
                    <Typography variant='h5' textAlign='center' color='#fff'>
                        {firstCharToUpper(name)}
                    </Typography>
                </Grid>
                <Grid item container xs={10} direction='column' flexWrap='nowrap' padding={1}>
                    <Grid item xs={1}>
                        <Typography variant='body1' textAlign='center'>
                            {description}
                        </Typography>
                    </Grid>

                    <Grid item xs={9}>
                        <Box width='100%' height='100%'>
                            <List>
                                {features.map((feature) => (
                                    <ListItem key={`${name}${feature}`}>
                                        <Stack direction='row' alignItems='center' justifyContent='space-between' columnGap={1}>
                                            <WhatshotIcon color='primary' sx={{ width: '15px', height: '15px' }} />
                                            <ListItemText primary={<Typography>{feature}</Typography>} />
                                        </Stack>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Grid>

                    <Grid item xs={1}>
                        <Typography variant='body1' textAlign='center' color={theme.palette.primary.dark}>
                            {formatCurrency(priceCents)} / month
                        </Typography>
                    </Grid>

                    <Grid item xs={1} display='flex' alignItems='flex-end' justifyContent='center'>
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={() => createCheckoutSession(stripePriceId)}
                            disabled={!stripePriceId || (user && user.role.name.toLowerCase() === name.toLowerCase())}
                        >
                            {user && user.role.name.toLowerCase() === name.toLowerCase() ? 'Current Plan' : 'Subscribe'}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};
