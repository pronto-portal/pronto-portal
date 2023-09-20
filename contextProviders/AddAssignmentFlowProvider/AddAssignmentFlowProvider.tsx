import React, { useState, useContext, createContext } from "react";
import { Address, Claimant, Translator, User } from "../../types/ObjectTypes";
import { Wrapper } from "../../types/PropTypes/Wrapper";
import { Reminder } from "../../types/ObjectTypes";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { AddEditAddressForm } from "../../components/AddEditAddressForm";
import { AddEditClaimantForm } from "../../components/AddEditClaimantForm";
import { ReminderForm } from "../../components/ReminderForm";
import { AddEditTranslatorForm } from "../../components/AddEditTranslatorForm";
import { DateTimeForm } from "../../components/DateTimeForm";

type AssignmentFlowEditingType =
  | "address"
  | "claimant"
  | "reminder"
  | "translator"
  | "date";

interface AddAssignmentFlowContextProps {
  address: Address;
  setAddress: React.Dispatch<React.SetStateAction<Address>>;
  claimant: Claimant;
  setClaimant: React.Dispatch<React.SetStateAction<Claimant>>;
  reminder: Reminder;
  setReminder: React.Dispatch<React.SetStateAction<Reminder>>;
  translator: Translator;
  setTranslator: React.Dispatch<React.SetStateAction<Translator>>;
  date?: Date;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  createReminder: boolean;
  setCreateReminder: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpenEditing: (type: AssignmentFlowEditingType) => void;
  reset: () => void;
}

const AddAssignmentFlowContext = createContext<AddAssignmentFlowContextProps>(
  {} as AddAssignmentFlowContextProps
);

export const AddAssignmentFlowProvider: React.FC<Wrapper> = ({ children }) => {
  const [address, setAddress] = useState<Address>({} as Address);
  const [claimant, setClaimant] = useState<Claimant>({} as Claimant);
  const [reminder, setReminder] = useState<Reminder>({} as Reminder);
  const [translator, setTranslator] = useState<Translator>({} as Translator);
  const [date, setDate] = useState<Date>();
  const [createReminder, setCreateReminder] = useState<boolean>(true);
  const [editing, setEditing] = useState<AssignmentFlowEditingType>();
  const [openEditing, setOpenEditing] = useState<boolean>(false);

  const handleOpenEditing = (editingType: AssignmentFlowEditingType) => {
    setEditing(editingType);
    setOpenEditing(true);
  };

  const reset = () => {
    setAddress({} as Address);
    setClaimant({} as Claimant);
    setReminder({} as Reminder);
    setTranslator({} as Translator);
    setDate(undefined);
    setCreateReminder(true);
  };

  return (
    <>
      <AddAssignmentFlowContext.Provider
        value={{
          address,
          setAddress,
          claimant,
          setClaimant,
          reminder,
          createReminder,
          setCreateReminder,
          setReminder,
          translator,
          setTranslator,
          date,
          setDate,
          handleOpenEditing,
          reset,
        }}
      >
        {children}
      </AddAssignmentFlowContext.Provider>
      <Dialog
        open={openEditing}
        onClose={() => setOpenEditing(false)}
        maxWidth="sm"
      >
        <DialogContent>
          {editing === "address" && (
            <AddEditAddressForm
              mode="edit"
              id={address.id}
              onSuccess={(data) => {
                if (data) {
                  setAddress(data);
                  setOpenEditing(false);
                }
              }}
            />
          )}
          {editing === "claimant" && (
            <AddEditClaimantForm
              mode="edit"
              id={claimant.id}
              onSuccess={(data) => {
                if (data) {
                  setClaimant(data);
                  setOpenEditing(false);
                }
              }}
            />
          )}
          {editing === "reminder" && (
            <ReminderForm
              onSuccess={() => {
                setOpenEditing(false);
              }}
            />
          )}
          {editing === "translator" && (
            <AddEditTranslatorForm
              mode="edit"
              id={translator.id}
              onSuccess={(data) => {
                if (data) {
                  setTranslator(data);
                  setOpenEditing(false);
                }
              }}
            />
          )}
          {editing === "date" && (
            <DateTimeForm
              mode="edit"
              onSuccess={(data) => {
                if (data) {
                  setDate(data);
                  setOpenEditing(false);
                }
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export const useAddAssignmentFlow = () => {
  const data = useContext(AddAssignmentFlowContext);

  if (!data)
    throw new Error(
      "useAddAssignmentFlow must be used within AddAssignmentFlowProvider"
    );

  return data;
};
