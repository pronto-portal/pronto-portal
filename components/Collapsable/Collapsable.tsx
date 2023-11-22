import React from "react";
import { Wrapper } from "../../types/PropTypes/Wrapper";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { SxProps } from "@mui/material/styles";
import { Theme } from "@mui/material/styles";
import AccordionActions from "@mui/material/AccordionActions";

interface CollapsableProps extends Wrapper {
  sx?: SxProps<Theme>;
  sxSummary?: SxProps<Theme>;
  sxDetails?: SxProps<Theme>;
  title: React.ReactNode | string;
  actions?: React.ReactNode;
  open?: boolean; // New prop for initial state
  onToggle?: () => void; // New prop for callback when open
}

export const Collapsable: React.FC<CollapsableProps> = ({
  children,
  sx,
  sxSummary,
  sxDetails,
  title,
  actions,
  open = false,
  onToggle = () => {},
}) => {
  return (
    <Accordion
      expanded={open}
      onChange={() => {
        onToggle();
      }}
      sx={sx}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={sxSummary}>
        {typeof title === "string" ? <Typography>{title}</Typography> : title}
      </AccordionSummary>
      <AccordionDetails sx={sxDetails}>{children}</AccordionDetails>
      {actions ? <AccordionActions>{actions}</AccordionActions> : null}
    </Accordion>
  );
};
