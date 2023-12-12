import React from 'react';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const Error404 = () => {
    return (
        <Stack
            sx={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
            }}
        >
            <SentimentDissatisfiedIcon sx={{ fontSize: '10rem' }} />
            <Typography variant='h4' component='h1' gutterBottom>
                Page Not Found
            </Typography>
            <Typography variant='subtitle1' gutterBottom>
                The page you are looking for does not exist.
            </Typography>
        </Stack>
    );
};

export default Error404;
