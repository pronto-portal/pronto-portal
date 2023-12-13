import React from 'react';
import { Box } from '@mui/material';
import GlobalStyles from '@mui/material/GlobalStyles';
import { Wrapper } from '../../types/PropTypes/Wrapper';

export const PageWrapper: React.FC<Wrapper> = ({ children }) => {
    return (
        <Box
            sx={{
                width: '100vw',
                height: '100vh',
                position: 'fixed',
            }}
        >
            <GlobalStyles
                styles={{
                    '*::-webkit-scrollbar': {
                        width: '0.4em',
                    },
                    '*::-webkit-scrollbar-track': {
                        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
                    },
                    '*::-webkit-scrollbar-thumb': {
                        backgroundColor: 'rgba(0,0,0,.3)',
                    },
                }}
            />
            {children}
        </Box>
    );
};
