import React from 'react';
import { Stack, Typography } from '@mui/material';
import Link from 'next/link';

interface IconLabelProps {
    icon: React.ReactNode;
    text: string;
    to?: string;
    onClick?: React.MouseEventHandler;
}

export const IconLabel: React.FC<IconLabelProps> = ({ icon, text, to, onClick }) => {
    return (
        <Stack direction='row' alignItems='center' spacing={1} onClick={onClick}>
            {icon}
            {to ? (
                <Link href={to}>
                    <Typography>{text}</Typography>
                </Link>
            ) : (
                <Typography>{text}</Typography>
            )}
        </Stack>
    );
};
