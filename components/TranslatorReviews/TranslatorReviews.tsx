import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

interface TranslatorReviewsDialogProps {
  open: boolean;
  onClose: () => void;
}

export const TranslatorReviewsDialog: React.FC<
  TranslatorReviewsDialogProps
> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography>Reviews</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography>Reviews go here</Typography>
      </DialogContent>
    </Dialog>
  );
};
