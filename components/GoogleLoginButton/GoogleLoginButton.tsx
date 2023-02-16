import React from "react";
import { Button, ButtonProps } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

export const GoogleLoginButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button startIcon={<GoogleIcon />} {...props}>
      Sign in with Google
    </Button>
  );
};
