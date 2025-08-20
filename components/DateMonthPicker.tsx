import React, { useRef, useState } from 'react';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import Picker from 'react-month-picker';
import moment from 'moment';
import "react-month-picker/css/month-picker.css";
import { Stack, Typography } from '@mui/material';

interface YearMonth {
  year: number
  month: number
}

interface ResParams {
  from: YearMonth
  to: YearMonth
}

interface Props {
  range: ResParams
  onChange: (res: ResParams) => void
}

const MonthlyDataPicker = ({
  range,
  onChange
}: Props) => {
  const pickRange = useRef<any>(null);

  const [rangeValue, setRangeValue] = useState(range);
  const pickerLang = {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    from: 'From', to: 'To',
    }
    const makeText = m => {
      if (m && m.year && m.month) return (pickerLang.months[m.month-1] + '. ' + m.year)
      return '?'
    }

  return(
    <Picker
      ref={pickRange}
      years={{min: 2013}}
      value={rangeValue}
      lang={pickerLang}
      theme="light"
      onDismiss={(e: any) => {
        setRangeValue(e);
        onChange(e);
      }}
    >
      <Stack
        sx={{ border: 'solid 0.5px rgba(0,0,0,0.3)',p: 1, borderRadius: 2, cursor: 'pointer'}}
        direction='row'
        alignItems='center'
        onClick={(e) => {
            pickRange.current.show()
        }}>
        <CalendarMonthOutlinedIcon sx={{mr: 1, color: 'rgba(0,0,0,0.4)'}} />
        <Typography sx={{mt: '4px'}}>{makeText(rangeValue.from) + ' - ' + makeText(rangeValue.to)}</Typography>
      </Stack>
    </Picker>
  );
}

export default MonthlyDataPicker;
