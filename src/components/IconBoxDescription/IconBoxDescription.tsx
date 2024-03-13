import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface IconBoxDescriptionProps {
    title: string;
    description?: string;
    IconComponent?: React.ReactNode;
    orientation: 'left' | 'right';
}

export const IconBoxDescription: React.FC<IconBoxDescriptionProps> = ({ title, description, IconComponent = null, orientation }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '40px',
                width: '100%',
                textAlign: 'center',
                backgroundColor: 'primary.main',
                color: 'white',
                borderRadius: orientation === 'left' ? '0px 40px 40px 0px' : '40px 0px 0px 40px',
                height: '500px',
            }}
            padding={1}
        >
            <Stack direction={orientation === 'left' ? 'row' : 'row-reverse'} alignItems='center' justifyContent='center' gap='40px'>
                {IconComponent}
                <Typography variant='h4' color='white'>
                    {title}
                </Typography>
            </Stack>

            {description ? (
                <Typography variant='h6' color='white'>
                    {description}
                </Typography>
            ) : null}
        </Box>
    );
};
