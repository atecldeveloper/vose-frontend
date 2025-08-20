import React, { useImperativeHandle } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack, Typography, Box, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {useTranslations} from "next-intl";

type CheckCurrentMemberModalProps = {
    handleConfirm: () => void;
}

const CheckCurrentMemberModal = React.forwardRef<any, CheckCurrentMemberModalProps>(({handleConfirm}, ref) => {
    const t = useTranslations("Cart");
    const tb = useTranslations("Button");
    const [open, setOpen] = React.useState<boolean>(false);
    const [name, setName] = React.useState<string>('');
    const [isGuest, setIsGuest] = React.useState<boolean>(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useImperativeHandle(ref, () => ({
        open,
        handleOpen,
        handleClose,
        setName,
        setIsGuest
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
                {/* <Typography sx={{ fontWeight: "700", fontSize: 24 }} >{t('REFERRAL_CHECK_TITLE')}</Typography> */}
                <Typography sx={{ mt: 2, textAlign: 'center'}}>
                    {isGuest ? t('CURRENT_PAYMENT_GUEST') : t('CURRENT_PAYMENT_USER') + ' ' + name} 
                </Typography>
                <Stack direction='row' justifyContent='center' sx={{ width: "100%",  mt: 1 }}>
                    <Button
                        variant="text"
                        sx={{ width: "140px"}}
                        onClick={handleClose}
                    >
                        <Typography>
                            {tb('CANCEL')}
                        </Typography>
                    </Button>

                    <Button
                        variant="contained"
                        sx={{ width: "140px"}}
                        onClick={handleConfirm}
                    >
                        <Typography>
                            {tb('CONFIRM')}
                        </Typography>
                    </Button>
                </Stack>
            </Box>
        </Dialog>
    );
});

CheckCurrentMemberModal.displayName = 'CheckCurrentMemberModal';

export default CheckCurrentMemberModal;
