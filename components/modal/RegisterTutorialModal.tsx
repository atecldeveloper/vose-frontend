import React, { useImperativeHandle } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack, Typography, Box, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CardMembershipIcon from '@mui/icons-material/CardMembership';
type RegisterTutorialModalProps = {
  handleConfirm: () => void;
};

const RegisterTutorialModal = React.forwardRef<any, RegisterTutorialModalProps>(({handleConfirm}, ref) => {
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
        }}
      >
        <Typography sx={{ fontWeight: "700", fontSize: 24, textAlign: 'center' }} >How To Register?</Typography>
        <Typography sx={{ mt: 2, fontWeight: '700', color: t => t.palette.primary.main}}>Step: 1</Typography>
        <Typography>
            Go to <b>"STORE/PRODUCT"</b>
        </Typography>
        <Typography sx={{ mt: 2, fontWeight: '700', color: t => t.palette.primary.main}}>Step: 2</Typography>

        <Typography>
            Add product <b>"VOSE Concentrated Booster"</b> to cart <br/>
           <span style={{fontSize: 16}}>
             Noted*: If you want to buy other products, it needs to exceed 42PV
            </span>
        </Typography>
        <Typography sx={{ mt: 2, fontWeight: '700', color: t => t.palette.primary.main}}>Step: 3</Typography>
        <Typography>
            Click <b>"CHECKOUT"</b> tick <b>"Join As Member" </b> fill up details
        </Typography>
        <Typography sx={{ mt: 2, fontWeight: '700', color: t => t.palette.primary.main}}>Step: 4</Typography>
        <Typography>
          Click <b>"PAYMENT"</b>
        </Typography>


        <Stack direction='row' justifyContent='center' sx={{ width: "100%",  mt: 3 }}>
          <CardMembershipIcon color={'primary'} sx={{fontSize: '50px'}}/>
        </Stack>

        <Typography sx={{ fontWeight: "700", fontSize: 22, textAlign: 'center', fontStyle: 'italic', color: t => t.palette.primary.main }}>
          After Payment Success<br/> You will become Our Member!
        </Typography>

        <Stack direction='row' justifyContent='center' sx={{ width: "100%",  mt: 4 }}>
        {/* <Button
          variant="text"
          sx={{ width: "140px"}}
          onClick={handleClose}
        >
          <Typography>
            Cancel
          </Typography>
        </Button> */}
        <Button
          variant="contained"
          sx={{ width: "200px"}}
          onClick={() => {
            handleConfirm();
          }}
        >
          <Typography>
            SHOP NOW
          </Typography>
        </Button>
        </Stack>
      </Box>
    </Dialog>
  );
});

RegisterTutorialModal.displayName = 'RegisterTutorialModal';

export default RegisterTutorialModal;
