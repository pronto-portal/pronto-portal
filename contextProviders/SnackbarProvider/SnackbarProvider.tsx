import React, { createContext, useContext, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

type severity = "error" | "warning" | "info" | "success";

interface SnackbarProviderContext {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  severity: severity;
  setSeverity: React.Dispatch<React.SetStateAction<severity>>;
  open?: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SnackbarContext = createContext<SnackbarProviderContext>(
  {} as SnackbarProviderContext
);

export const SnackbarProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [message, setMessage] = useState<string>("");
  const [severity, setSeverity] = useState<severity>("success");
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => setOpen(false);

  return (
    <SnackbarContext.Provider
      value={{ message, setMessage, severity, setSeverity, open, setOpen }}
    >
      {children}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const data = useContext(SnackbarContext);
  if (!data)
    throw new Error("Must be in a SnackbarProvider to use Snackbar Context");

  return data;
};
