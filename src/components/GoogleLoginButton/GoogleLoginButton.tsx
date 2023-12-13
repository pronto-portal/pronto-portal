import React from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import { Button, ButtonProps } from '@mui/material';

export const GoogleLoginButton: React.FC<ButtonProps> = (props) => {
    return (
        <Button startIcon={<GoogleIcon />} {...props}>
            Sign in with Google
        </Button>
    );
};
