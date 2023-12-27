import React from 'react';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import { useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface ConfirmationModalProps {
    open: boolean;
    title?: string;
    buttonText?: string;
    message: string;
    onClose: () => void;
    onConfirm: () => void;
    isLoading?: boolean;
    type: 'info' | 'warning' | 'error' | 'success';
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ open, title, buttonText, message, onClose, onConfirm, isLoading, type = 'info' }) => {
    const theme = useTheme();
    const color = type == 'info' ? theme.palette.info.main : type == 'warning' ? theme.palette.warning.main : theme.palette.success.main;

    const IconStyling = { color, fontSize: '50px' };
    const Icon =
        type === 'info' ? (
            <InfoIcon sx={IconStyling} />
        ) : type === 'warning' ? (
            <WarningIcon sx={IconStyling} />
        ) : type === 'error' ? (
            <ErrorIcon sx={IconStyling} />
        ) : (
            <CheckBoxIcon sx={IconStyling} />
        );

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{ m: 0, p: 2 }}>
                <Stack
                    direction='row'
                    alignItems='center'
                    justifyContent='space-between' // Change to space-between for positioning
                    width='100%'
                >
                    <Stack direction='row' alignItems='center' justifyContent='center' spacing={1} width='100%'>
                        {Icon}
                        {title ? <Typography variant='h6'>{title}</Typography> : null}
                    </Stack>
                    <IconButton
                        aria-label='close'
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Stack>
            </DialogTitle>

            <DialogContent>
                <Stack direction='column' alignItems='center' justifyContent='center' spacing={3} paddingTop={2}>
                    <Typography textAlign='center'>{message}</Typography>
                    {isLoading ? (
                        <CircularProgress />
                    ) : (
                        <Button onClick={onConfirm} variant='contained' color={type}>
                            {buttonText ? buttonText : 'Confirm'}
                        </Button>
                    )}
                </Stack>
            </DialogContent>
        </Dialog>
    );
};
