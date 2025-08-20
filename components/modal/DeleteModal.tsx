import React, { useImperativeHandle } from "react";
import Dialog from "@mui/material/Dialog";
import { Stack, Typography, Box, Button } from "@mui/material";

type DeleteModalProps = {
  handleConfirm: () => void;
};

const DeleteModal = React.forwardRef<any, DeleteModalProps>(({handleConfirm}, ref) => {
  const [open, setOpen] = React.useState<boolean>(false);

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
      maxWidth={"sm"}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        style: {
          padding: '30px 40px',
          backgroundColor: "white",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontWeight: "700", fontSize: 24 }} >Delete/Cancel?</Typography>
        <Typography sx={{ my: 2}}>Please ensure and then confirm!</Typography>
        <Stack direction='row' sx={{ width: "100%",  mt: 1 }}>
        <Button
          variant="text"
          sx={{ width: "140px"}}
          onClick={handleClose}
        >
          <Typography>
            Cancel
          </Typography>
        </Button>
        <Button
          variant="contained"
          sx={{ width: "140px"}}
          onClick={() => {
            handleConfirm();
          }}
        >
          <Typography>
            Confirm
          </Typography>
        </Button>
        </Stack>
      </Box>
    </Dialog>
  );
});

DeleteModal.displayName = 'DeleteModal';

export default DeleteModal;
