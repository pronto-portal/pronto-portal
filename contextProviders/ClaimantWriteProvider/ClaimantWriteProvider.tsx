import React, { createContext, useContext, useState } from "react";
import { Wrapper } from "../../types/PropTypes/Wrapper";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TranslatorSelect } from "../../components/TranslatorSelect";
import { useEditClaiamantMutation } from "../../redux/reducers";
import { UpdateClaimant } from "../../types/InputTypes";
import { useSnackbar } from "notistack";
import { Claimant } from "../../types/ObjectTypes";
import { ClaimantSelect } from "../../components/ClaimantSelect";
import Typography from "@mui/material/Typography";
import { AddEditAddressForm } from "../../components/AddEditAddressForm";
import { AddEditClaimantForm } from "../../components/AddEditClaimantForm";

interface ClaimantWriteContextProps {
  claimant: Claimant;
  setClaimant: React.Dispatch<React.SetStateAction<Claimant>>;
  isEditOpen: boolean;
  setIsEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ClaimantWriteContext = createContext<ClaimantWriteContextProps>(
  {} as ClaimantWriteContextProps
);

export const ClaimantWriteProvider: React.FC<Wrapper> = ({ children }) => {
  const [claimant, setClaimant] = useState<Claimant>({} as Claimant);

  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

  return (
    <>
      <ClaimantWriteContext.Provider
        value={{
          claimant,
          setClaimant,
          isEditOpen,
          setIsEditOpen,
        }}
      >
        {children}
      </ClaimantWriteContext.Provider>
      <Dialog
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          <Typography textAlign="center">Change Claimant</Typography>
        </DialogTitle>
        <DialogContent>
          <AddEditClaimantForm
            mode="edit"
            id={claimant ? claimant.id : ""}
            onSuccess={(_) => {}}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export const useClaimantWrite = () => {
  const context = useContext(ClaimantWriteContext);

  if (context === undefined) {
    throw new Error(
      "useClaimantWrite must be used within a ClaimantWriteProvider"
    );
  }

  return context;
};
