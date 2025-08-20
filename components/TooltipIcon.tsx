import React, { useState, Fragment } from "react";
import Tooltip from "@mui/material/Tooltip";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

type TooltipIconProps = {
  text: any;
  isQuestion?: boolean;
};

const TooltipIcon = ({ text, isQuestion = false }: TooltipIconProps) => {
  return (
    <Tooltip title={text}>
      {isQuestion ? (
        <HelpOutlineOutlinedIcon sx={{ color: (t) => t.palette.error.main }} className="tooltip-icon" />
      ) : (
        <InfoOutlinedIcon sx={{ color: (t) => t.palette.secondary.main }} className="tooltip-icon" />
      )}
    </Tooltip>
  );
};

export default TooltipIcon;
