import React, { createContext, useState } from "react";
import { Translator } from "../../types/ObjectTypes";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Wrapper } from "../../types/PropTypes/Wrapper";
import { AddEditTranslatorForm } from "../../components/AddEditTranslatorForm";

interface TranslatorWriteContextProps {
  isEditOpen: boolean;
  setIsEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDeleteOpen: boolean;
  setIsDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
  translator: Translator;
  setTranslator: React.Dispatch<React.SetStateAction<Translator>>;
}

const TranslatorWriteContext = createContext<TranslatorWriteContextProps>(
  {} as TranslatorWriteContextProps
);

export const TranslatorWriteProvider: React.FC<Wrapper> = ({ children }) => {
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [translator, setTranslator] = useState<Translator>({} as Translator);

  return (
    <>
      <TranslatorWriteContext.Provider
        value={{
          isEditOpen,
          setIsEditOpen,
          isDeleteOpen,
          setIsDeleteOpen,
          translator,
          setTranslator,
        }}
      >
        {children}
      </TranslatorWriteContext.Provider>
      <Dialog open={isEditOpen}>
        <DialogTitle>Edit Translator</DialogTitle>
        <DialogContent>
          <AddEditTranslatorForm
            mode="edit"
            onSuccess={() => setIsEditOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export const useTranslatorWrite = () => {
  const context = React.useContext(TranslatorWriteContext);

  if (context === undefined) {
    throw new Error(
      "useTranslatorWrite must be used within a TranslatorWriteProvider"
    );
  }

  return context;
};
