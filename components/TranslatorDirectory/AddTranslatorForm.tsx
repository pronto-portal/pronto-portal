import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { AddEditTranslatorForm } from "../AddEditTranslatorForm";

interface AddTranslatorFormProps {
  open: boolean;
  handleClose: () => void;
}

export const AddTranslatorForm: React.FC<AddTranslatorFormProps> = ({
  open,
  handleClose,
}) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogContent>
        <AddEditTranslatorForm
          onSuccess={() => {
            handleClose();
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
