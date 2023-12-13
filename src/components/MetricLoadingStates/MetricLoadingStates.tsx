import React from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import Info from '@mui/icons-material/Info';
import Warning from '@mui/icons-material/Warning';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface MetricLoadingStatesProps {
    isEmpty: boolean;
    isError: boolean;
    isLoading: boolean;
    children: React.ReactNode;
}

export const MetricLoadingStates: React.FC<MetricLoadingStatesProps> = ({ isEmpty, isError, isLoading, children }) => {
    return (
        <Stack width='100%' height='100%' alignItems='center' justifyContent='center' direction='column' spacing={1}>
            {isLoading ? (
                <CircularProgress />
            ) : isError ? (
                <>
                    <ErrorIcon sx={{ color: 'error.main' }} />
                    <Typography sx={{ color: 'error.main' }}>Error fetching data</Typography>
                </>
            ) : isEmpty ? (
                <>
                    <Info sx={{ color: 'warning.main', opacity: 0.5 }} />
                    <Typography sx={{ color: 'warning.main', opacity: 0.5 }}>No data available</Typography>
                </>
            ) : null}
            {!isLoading && !isError && !isEmpty ? children : null}
        </Stack>
    );
};
