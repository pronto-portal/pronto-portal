import React from 'react';
import { Box, Typography } from '@mui/material';
import { SvgIconProps } from '@mui/material/SvgIcon';

interface FeatureCardProps {
    IconComponent: React.ElementType<SvgIconProps>;
    title: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ IconComponent, title }) => {
    return (
        <Box
            display={'flex'}
            alignItems={'center'}
            flexDirection={'column'}
            p={3}
            sx={{ backgroundColor: 'primary.main', borderRadius: '10px', width: { xs: '300px', sm: '350px' } }}
        >
            <Box p={{ xs: 4, sm: 5, md: 5 }} sx={{ borderRadius: '50%', display: 'flex', justifyContent: 'center', backgroundColor: 'white' }}>
                <IconComponent sx={{ color: 'grey', fontSize: 40 }} />
            </Box>
            <Typography mt={2} fontSize={18} color={'white'}>
                {title}
            </Typography>
        </Box>
    );
};
