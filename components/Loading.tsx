import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles } from '@mui/styles'

interface Props {
  open: boolean
}

const useStyles = makeStyles(() => ({
  backdrop: {
    '&.MuiBackdrop-root': {
      zIndex: 9999999999,
      color: '#fff',
    }
  },
}));

export default function Loading(props: Props) {
  const classes = useStyles();
  const {open} = props;

  return (
    <div>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
