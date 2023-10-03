import React, { createContext, useContext, useState } from "react";
import { Wrapper } from "../../types/PropTypes/Wrapper";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TranslatorSelect } from "../../components/TranslatorSelect";
import { useUpdateAssignmentMutation } from "../../redux/reducers";
import { UpdateAssignment } from "../../types/InputTypes";
import { useSnackbar } from "notistack";
import { Assignment } from "../../types/ObjectTypes";
import { ClaimantSelect } from "../../components/ClaimantSelect";
import { AddressSelect } from "../../components/AddressSelect";
import Typography from "@mui/material/Typography";

interface AssignmentWriteContextProps {
  assignment: Assignment;
  setAssignment: React.Dispatch<React.SetStateAction<Assignment>>;
  isChangeTranslatorOpen: boolean;
  setIsChangeTranslatorOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isChangeClaimantOpen: boolean;
  setIsChangeClaimantOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isChangeAddressOpen: boolean;
  setIsChangeAddressOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AssignmentWriteContext = createContext<AssignmentWriteContextProps>(
  {} as AssignmentWriteContextProps
);

export const AssignmentWriteProvider: React.FC<Wrapper> = ({ children }) => {
  const [assignment, setAssignment] = useState<Assignment>({} as Assignment);

  const [isChangeTranslatorOpen, setIsChangeTranslatorOpen] =
    useState<boolean>(false);

  const [isChangeClaimantOpen, setIsChangeClaimantOpen] =
    useState<boolean>(false);

  const [isChangeAddressOpen, setIsChangeAddressOpen] =
    useState<boolean>(false);

  const [updateAssignment] = useUpdateAssignmentMutation();
  const { enqueueSnackbar } = useSnackbar();

  const handleUpdateAssignment = (
    key: keyof UpdateAssignment,
    data: UpdateAssignment[keyof UpdateAssignment]
  ) => {
    console.log(assignment);
    setIsChangeTranslatorOpen(false);
    updateAssignment({
      input: {
        id: assignment.id,
        [key]: data,
      },
    }).then((res) => {
      if ("data" in res && res.data.updateAssignment) {
        enqueueSnackbar("Successfully updated assignment", {
          variant: "success",
        });
      } else {
        enqueueSnackbar("Failed to update assignment", {
          variant: "error",
        });
      }
    });
  };

  return (
    <>
      <AssignmentWriteContext.Provider
        value={{
          assignment,
          setAssignment,
          isChangeTranslatorOpen,
          setIsChangeTranslatorOpen,
          isChangeClaimantOpen,
          setIsChangeClaimantOpen,
          isChangeAddressOpen,
          setIsChangeAddressOpen,
        }}
      >
        {children}
      </AssignmentWriteContext.Provider>
      <Dialog
        open={isChangeTranslatorOpen}
        onClose={() => setIsChangeTranslatorOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogContent>
          <TranslatorSelect
            onConfirm={(translator) => {
              handleUpdateAssignment("assignedToId", translator.id);
            }}
          />
        </DialogContent>
      </Dialog>
      <Dialog
        open={isChangeClaimantOpen}
        onClose={() => setIsChangeClaimantOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          <Typography textAlign="center">Change Claimant</Typography>
        </DialogTitle>
        <DialogContent>
          <ClaimantSelect
            enableForm
            onConfirm={(claimant) => {
              handleUpdateAssignment("claimantId", claimant.id);
            }}
            defaultValue={assignment.claimant}
          />
        </DialogContent>
      </Dialog>
      <Dialog
        open={isChangeAddressOpen}
        onClose={() => setIsChangeAddressOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          <Typography textAlign="center">Change Address</Typography>
        </DialogTitle>
        <DialogContent>
          <AddressSelect
            enableForm
            onConfirm={(address) => {
              handleUpdateAssignment("addressId", address.id);
            }}
            defaultValue={assignment.address}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export const useAssignmentWrite = () => {
  const context = useContext(AssignmentWriteContext);

  if (context === undefined) {
    throw new Error(
      "useAssignmentWrite must be used within a AssignmentWriteProvider"
    );
  }

  return context;
};
