import * as React from "react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button } from "@mui/material";

const ApplyInputButton = React.forwardRef<any, any>(({handleClick}, ref) => {
  const [text, setText] = React.useState("");

  const _handleClick = () => {
    handleClick(text);
  }

  return (
    <Box
      sx={{
        width: "100%",
        border: (t) =>  `1px solid ${t.palette.primary.main}`,
        pl: "10px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, color: (t) => t.palette.primary.main, fontSize: {xs: 13, md: 18} }}
        placeholder="Enter Promo Code"
        value={text}
        onChange={(e: any) => {setText(e.target.value)}}
      />
      <Button
        variant='contained'
        sx={{
          px: 3,
          borderRadius: 0,
          fontSize: 18,
        }}
        onClick={_handleClick}
      >
        APPLY
      </Button>
    </Box>
  );
});

export default ApplyInputButton;
