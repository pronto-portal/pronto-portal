import React, { createContext, useContext, useState } from "react";
import { Wrapper } from "../../types/PropTypes/Wrapper";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { TranslatorSelect } from "../../components/TranslatorSelect";
import { useUpdateAssignmentMutation } from "../../redux/reducers";
import { UpdateAssignment } from "../../types/InputTypes";
import { useSnackbar } from "notistack";
import { Translator } from "../../types/ObjectTypes";

interface AssignmentWriteContextProps {
  assignment: UpdateAssignment;
  setAssignment: React.Dispatch<React.SetStateAction<UpdateAssignment>>;
  isChangeTranslatorOpen: boolean;
  setIsChangeTranslatorOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AssignmentWriteContext = createContext<AssignmentWriteContextProps>(
  {} as AssignmentWriteContextProps
);

export const AssignmentWriteProvider: React.FC<Wrapper> = ({ children }) => {
  const [assignment, setAssignment] = useState<UpdateAssignment>(
    {} as UpdateAssignment
  );

  const [isChangeTranslatorOpen, setIsChangeTranslatorOpen] =
    useState<boolean>(false);

  const [updateAssignment] = useUpdateAssignmentMutation();
  const { enqueueSnackbar } = useSnackbar();

  const handleUpdateAssignment = (translator: Translator) => {
    setAssignment({
      ...assignment,
      assignedToId: translator.id,
    });
    setIsChangeTranslatorOpen(false);
    updateAssignment({
      input: assignment,
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
          <TranslatorSelect onConfirm={handleUpdateAssignment} />
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
