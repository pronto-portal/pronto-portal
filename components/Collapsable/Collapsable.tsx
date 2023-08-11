import React, { useState } from "react";
import { Wrapper } from "../../types/Wrapper";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { SxProps } from "@mui/material/styles";
import { Theme } from "@mui/material/styles";

interface CollapsableProps extends Wrapper {
  sx?: SxProps<Theme>;
  title: string;
}

export const Collapsable: React.FC<CollapsableProps> = ({
  children,
  sx,
  title,
}) => {
  return (
    <Accordion sx={sx}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};
