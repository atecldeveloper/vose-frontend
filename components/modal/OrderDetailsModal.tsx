import React, { useImperativeHandle } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack, Typography, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type OrderDetailsModalProps = {};

const OrderDetailsModal = React.forwardRef<any, OrderDetailsModalProps>(({}, ref) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [passwordObj, setPasswordObj] = React.useState<any>({
    currentPassword: "",
    confirmPassword: "",
    newPassword: "",
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useImperativeHandle(ref, () => ({
    handleOpen,
    handleClose,
  }));

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={"lg"}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        style: {
          width: "40%",
          backgroundColor: "white",
        },
      }}
    >
      <DialogTitle sx={{ padding: 1 }} id="alert-dialog-title">
        <Stack direction="row" justifyContent="space-between">
          <Box sx={{ m: 1 }} />
          <IconButton aria-label="delete" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontWeight: "700" }}>Reset Password</Typography>
        <Stack sx={{ width: "100%", maxWidth: "400px", mt: 1 }}>
        
        </Stack>
      </Box>
    </Dialog>
  );
});

OrderDetailsModal.displayName = 'OrderDetailsModal';

export default OrderDetailsModal;
