import * as React from 'react';
import {useSnackbarContext} from "../src/context/snackbar";
// Material UI
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert, { AlertProps } from '@mui/material/Alert';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ConsecutiveSnackbars() {
    const {open, messageInfo, handleClose, handleExited} = useSnackbarContext();

    return (
        <div>
            <Snackbar
                key={messageInfo ? messageInfo.key : undefined}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                TransitionProps={{ onExited: handleExited }}
                // message={messageInfo ? messageInfo.message : undefined}
                // action={
                    // <React.Fragment>
                    //     <Button color="secondary" size="small" onClick={handleClose}>
                    //         UNDO
                    //     </Button>
                    //     <IconButton
                    //         aria-label="close"
                    //         color="inherit"
                    //         sx={{ p: 0.5 }}
                    //         onClick={handleClose}
                    //     >
                    //         <CloseIcon />
                    //     </IconButton>
                        
                    // </React.Fragment>
                // }
            >
            <Alert onClose={handleClose} severity={messageInfo ? messageInfo.type as any: 'warning'} sx={{ width: '100%' }}>
              {messageInfo ? messageInfo.message : undefined}
            </Alert>
            </Snackbar>
        </div>
    );
}
