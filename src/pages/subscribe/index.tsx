import React from 'react';
import { colors } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SubscriptionCards } from '../../components/SubscriptionCards/SubscriptionCards';

export default function subscribe() {
    return (
        <Stack direction='column' alignItems='center' justifyContent='center' width='100%' height='100%' spacing={2} padding={3}>
            <Typography variant='h3'>Subscribe</Typography>
            <Box width='100%' height='75%'>
                <SubscriptionCards />
            </Box>
        </Stack>
    );
}
