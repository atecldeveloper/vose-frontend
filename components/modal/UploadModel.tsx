import React, {useEffect, useImperativeHandle} from "react";
import Dialog from "@mui/material/Dialog";
import { Stack, Typography, Box, IconButton, Button } from "@mui/material";
import {useTranslations} from "next-intl";
import {UploadSSM} from "../shopRegister/UploadsSSM";


type UploadModalProps = {
    handleConfirm: () => void;
}

const UploadModal = React.forwardRef<any, UploadModalProps>(({handleConfirm}, ref) => {
    const t = useTranslations("Cart");
    const tb = useTranslations("Button");
    const receiptRef = React.useRef<any>();
    const [open, setOpen] = React.useState<boolean>(false);
    const [proceed, setProceed] = React.useState<boolean>(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setProceed(false)
    };

    useImperativeHandle(ref, () => ({
        file: receiptRef.current,
        open,
        handleOpen,
        handleClose,
    }));

    const handleFileUploaded = (files: any) => {
        setProceed(!!files.length)
    }


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
                    minWidth: '50vw',
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
                <Typography sx={{ fontWeight: "700", fontSize: 24 }} >
                    {t('ADMIN_CODE_TITLE')}
                </Typography>
                <Typography sx={{ mt: 2, mb: 4, textAlign: 'center'}}>
                    {t('ADMIN_CODE_DESC')}
                </Typography>

                <UploadSSM
                    ref={receiptRef}
                    maxFiles={1}
                    minFiles={1}
                    type={4}
                    handleDelete={() => {}}
                    handleUploaded={handleFileUploaded}
                />

                <Box sx={{ my: 3 }} />

                {/*<Typography sx={{ mb: 4, textAlign: 'center'}}>*/}
                {/*    {t('REFERRAL_CHECK_DESC_2')}*/}
                {/*</Typography>*/}
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
                        disabled={!proceed}
                    >
                        <Typography>
                            {tb('CONFIRM')}
                        </Typography>
                    </Button>
                </Stack>
            </Box>
        </Dialog>
    )
});

UploadModal.displayName = 'UploadModal';

export default UploadModal;
