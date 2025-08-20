import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Typography } from "@mui/material";
import RangeSlider from "./PriceRangeSlider";

type CustomAccordionProps = {
  title: string;
  selectedID?: number;
  dataArr?: any;
  isInfo?: boolean;
  isOpen?: boolean;
  handleClick?: (id: string) => void;
  minRange?: number;
  maxRange?: number;
  handleSearch?: (value: number[]) => void;
};

const CustomAccordion = ({ title, selectedID, dataArr, isInfo = false, isOpen = false, handleClick, minRange, maxRange, handleSearch }: CustomAccordionProps) => {
  return (
    <Accordion
      sx={{
        backgroundColor: "white",
        borderRadius: "0px !important",
        boxShadow: "none !important",
        ".MuiPaper-root.MuiAccordion-root": {
          backgroundColor: "white",
        },
        border: "solid",
        borderColor: (t) => t.palette.background.paper,
        borderWidth: 1,
        // maxWidth: isInfo ? "auto" : 250,
        margin: "16px 0px",
        ":before": {
          height: 0,
        },
      }}
      defaultExpanded={isOpen}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{
          p: 2
        }}
      >
        <Typography sx={{ color: (t) => t.palette.secondary.light, fontSize: 20 }}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{px: 4, pt: 0}}>
        {dataArr ? (
          dataArr.map((e: any) => {
            let selectedStyle = { }
            if (selectedID == e.ID) {
              selectedStyle  = {
                border: "solid",
                borderColor: (t: any) => t.palette.gary.light,
                borderWidth: 0,
                borderBottomWidth: isInfo ? 0:1 ,
              }
            }
            return (
              <Box
                sx={{
                  cursor: "pointer",
                  ml: 2,
                  mr: 1,
                  mb: 2,
                  borderBottom: '1px solid transparent',
                  ...selectedStyle,
                  ":hover": !isInfo
                    ? {
                        border: "solid",
                        borderColor: (t) => t.palette.gary.light,
                        borderWidth: 0,
                        borderBottomWidth: 1,
                      }
                    : {},
                }}
                onClick={() => {
                  handleClick && handleClick(e.ID)
                }}
              >
                <Typography sx={{ color: (t) => t.palette.gary.light, fontWeight: 500 }}>
                  {e.label}
                </Typography>
              </Box>
            );
          })
        ) : (
          <RangeSlider minRange={minRange ? minRange : 0} maxRange={maxRange ?maxRange : 0} handleClick={handleSearch? handleSearch : () => {}}/>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordion;
