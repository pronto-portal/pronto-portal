import React, { useState } from 'react';
import CommentIcon from '@mui/icons-material/Comment';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { TranslatorReviewsDialog } from '../TranslatorReviews/TranslatorReviews';

export const TranslatorRowActions = () => {
    const [openReviews, setOpenReviews] = useState(false);

    return (
        <>
            <Stack direction='row' spacing={1} alignItems='center' justifyContent='space-evenly'>
                <IconButton size='small' color='primary'>
                    <CommentIcon />
                </IconButton>
            </Stack>
            <TranslatorReviewsDialog open={openReviews} onClose={() => setOpenReviews(false)} />
        </>
    );
};
