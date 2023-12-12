import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface MetricProps {
    titleText: string;
    children: React.ReactNode;
}

export const Metric: React.FC<MetricProps> = ({ titleText, children }) => {
    return (
        <Card sx={{ width: '100%', height: '100%' }}>
            <CardHeader
                sx={{ height: '5%', margin: 0, paddingTop: '1rem' }}
                title={
                    <Stack justifyContent='space-between' direction='column' alignItems='center'>
                        <Typography textAlign='center'>{titleText}</Typography>
                        <Divider sx={{ width: '100%' }} />
                    </Stack>
                }
            />
            <CardContent sx={{ width: '100%', height: '95%' }}>{children}</CardContent>
        </Card>
    );
};
