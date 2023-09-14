import React, { useState } from "react";
import { Wrapper } from "../../types/PropTypes/Wrapper";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { SxProps } from "@mui/material/styles";
import { Theme } from "@mui/material/styles";

interface CollapsableProps extends Wrapper {
  sx?: SxProps<Theme>;
  sxSummary?: SxProps<Theme>;
  sxDetails?: SxProps<Theme>;
  title: string;
}

export const Collapsable: React.FC<CollapsableProps> = ({
  children,
  sx,
  sxSummary,
  sxDetails,
  title,
}) => {
  return (
    <Accordion sx={sx}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={sxSummary}>
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={sxDetails}>{children}</AccordionDetails>
    </Accordion>
  );
};
