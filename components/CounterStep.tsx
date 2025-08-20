import { IconButton, Stack, TextField } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
type CounterStepProps = {
  size?: 'xs' | 'lg',
  initNumber?: number,
  isAbleZero?: boolean,
  handleGetCount?: (value: number) => void
};
const CounterStep =  React.forwardRef<any, CounterStepProps>(
  ({ size = 'lg', initNumber = 0, handleGetCount, isAbleZero=false }, ref) => {
  const [text, setText] = React.useState(initNumber);

  let protectNumber = isAbleZero ? -1 : 0;
  React.useEffect(() => {
    setText(initNumber);
  }, [initNumber])
  React.useImperativeHandle(ref, () => ({
    text,
    setText
  }))

  const handleChange = (event: any) => {
      let value = parseInt(event.target.value ? event.target.value : 1)
      if (value < 0) {
          value = 0
      }

      setText(value);
  }

  return (
    <Stack direction="row" justifyContent="space-between" sx={{width: size == 'xs' ? 150 : 250}}>
      <IconButton sx={{ width: "20%" }} onClick={() => {
        if (text > protectNumber) {
          setText(text - 1);
          handleGetCount && handleGetCount(text - 1)
        }
      }}
      disabled={isAbleZero ? text == 0 : text == 1}
      >
        <RemoveIcon />
      </IconButton>
      <TextField
        id="outlined-basic"
        label=""
        variant="outlined"
        type={"number"}
        value={text}
        InputProps={{ inputProps: { min: 0, max: 10 } }}
        onChange={handleChange}
        onBlur={()=> {handleGetCount && handleGetCount(text)}}
        sx={{
          width: "40%",
          ml: 1,
          ".MuiOutlinedInput-input": {
            px: 1,
            py: 1,
          },
        }}
      />
      <IconButton sx={{ width: "20%" }} onClick={() => {
        setText(text + 1);
        handleGetCount && handleGetCount(text + 1)
      }}>
        <AddIcon />
      </IconButton>
    </Stack>
  );
});

export default CounterStep;
