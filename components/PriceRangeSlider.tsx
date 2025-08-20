import * as React from "react";
import Slider from "@mui/material/Slider";
import { InputAdornment, Button, TextField, Stack, Box } from "@mui/material";

type CustomAccordionProps = {
  minRange: number,
  maxRange: number,
  handleClick: (value: number[]) => void,
};


const RangeSlider = ({minRange, maxRange, handleClick}: CustomAccordionProps) => {
  const [value, setValue] = React.useState<number[]>([minRange, maxRange]);

  function valuetext(value: number) {
    return `RM ${value}`;
  }

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleTextChange = (newValue: any, isMin: boolean) => {
    let _value = [...value];
    if (isMin) {
      if (newValue < _value[1]) {
        _value[0] = parseFloat(newValue);
      }
    }
    else {
      _value[1] = parseFloat(newValue);
    }
    setValue(_value as number[]);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Slider
        min={0}
        max={1000}
        getAriaLabel={() => "Temperature range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        valueLabelFormat={valuetext}
        disableSwap
      />
      <TextField
        sx={{ width: "100%", my: 1, "& .MuiOutlinedInput-input": { p: "10px 20px !important" } }}
        InputProps={{
          startAdornment: <InputAdornment position="start">RM</InputAdornment>,
        }}
        label="Min Price"
        type='number'
        value={value[0]}
        variant="outlined"
        onChange={(e: any) => {
          handleTextChange(e.target.value, true)
        }}
      />
      <TextField
        sx={{ width: "100%", my: 1, "& .MuiOutlinedInput-input": { p: "10px 20px !important" } }}
        InputProps={{
          startAdornment: <InputAdornment position="start">RM</InputAdornment>,
        }}
        label="Max Price"
        type='number'
        value={value[1]}
        variant="outlined"
        onChange={(e: any) => {
          handleTextChange(e.target.value, false)
        }}
      />
      <Stack sx={{ mt: 2 }} onClick={() => {handleClick(value)}}>
        <Button variant='contained'>Search</Button>
      </Stack>
    </Box>
  );
};

export default RangeSlider;
