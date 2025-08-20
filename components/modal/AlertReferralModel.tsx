import React, { useImperativeHandle } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack, Typography, Box, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {useTranslations} from "next-intl";

type AlertReferralModalProps = {
    handleConfirm: () => void;
}

const AlertReferralModal = React.forwardRef<any, AlertReferralModalProps>(({handleConfirm}, ref) => {
    const t = useTranslations("Cart");
    const tb = useTranslations("Button");
    const [open, setOpen] = React.useState<boolean>(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useImperativeHandle(ref, () => ({
        open,
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
                <Typography sx={{ fontWeight: "700", fontSize: 24 }} >{t('REFERRAL_CHECK_TITLE')}</Typography>
                <Typography sx={{ mt: 2, textAlign: 'center'}}>
                    {t('REFERRAL_CHECK_DESC_1')}
                </Typography>
                <Typography sx={{ mb: 4, textAlign: 'center'}}>
                    {t('REFERRAL_CHECK_DESC_2')}
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

AlertReferralModal.displayName = 'AlertReferralModal';

export default AlertReferralModal;
