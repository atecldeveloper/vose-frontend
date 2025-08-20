import React, {useImperativeHandle} from "react";
import Dialog from "@mui/material/Dialog";
import {Stack, Typography, Box, TextField, Button} from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {useRouter} from "next/router";
import {useTranslations} from "next-intl";
import {setStateHelper} from "../../utils";

type ForgetPasswordModalProps = {
    handleConfirm: () => void;
};

const ForgetPasswordModal = React.forwardRef<any, ForgetPasswordModalProps>(({handleConfirm}, ref) => {
    const t: any = useTranslations("Modal");
    const tb: any = useTranslations("Button");
    const [open, setOpen] = React.useState<boolean>(false);
    const [step, setStep] = React.useState<number>(1);
    const [mainState, setMainState] = React.useState({
        username: '',
        email: '',
    })

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setStep(1);
        setMainState({
            username: '',
            email: '',
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const id = e.target.id;
        const value = e.target.value;
        setStateHelper(setMainState)({[id]: value});
    };

    useImperativeHandle(ref, () => ({
        params: mainState,
        setStep,
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
                    padding: "30px 40px",
                    backgroundColor: "white",
                },
            }}
        >

            {step === 1 &&
            <Box
              sx={{
                  display: "flex",
                  flexDirection: "column",
              }}
            >
              <Typography sx={{fontWeight: "700", fontSize: 24}}>{t('FORGET_P')}</Typography>
              <Typography sx={{mt: 2, fontWeight: "700", color: (t) => t.palette.secondary.main}}>
                  {t('FORGET_P_D')}
              </Typography>
              <TextField
                id="username"
                type="text"
                variant="standard"
                placeholder="Your Username"
                value={mainState.username}
                onChange={handleChange}
                InputLabelProps={{
                    shrink: true,
                    style: {
                        fontSize: 20,
                    },
                }}
                sx={{
                    color: (t) => t.palette.secondary.light,
                    mt: 2
                }}
              />
              <TextField
                id="email"
                type="email"
                variant="standard"
                placeholder="Your Email"
                value={mainState.email}
                onChange={handleChange}
                InputLabelProps={{
                    shrink: true,
                    style: {
                        fontSize: 20,
                    },
                }}
                sx={{
                    color: (t) => t.palette.secondary.light,
                    mt: 2
                }}
              />
              <Stack direction="row" justifyContent="flex-end" sx={{width: "100%", mt: 4}}>
                <Button
                  variant="text"
                  sx={{width: "140px"}}
                  onClick={handleClose}
                >
                  <Typography>
                      {tb('CANCEL')}
                  </Typography>
                </Button>
                <Button
                  variant="contained"
                  sx={{width: "140px"}}
                  onClick={() => {
                      handleConfirm();
                  }}
                >
                  <Typography>
                      {tb('SEND')}
                  </Typography>
                </Button>
              </Stack>
            </Box>
            }

            {step === 2 &&
            <Box>
              <Stack direction='row' justifyContent='center'>
                <CheckCircleOutlineIcon sx={{fontSize: '80px', color: 'green'}}/>
              </Stack>

              <Typography sx={{mt: 2, fontWeight: "700", color: (t) => t.palette.secondary.main}}>
                  {t('FORGET_P_F')}
              </Typography>

              <Box sx={{m: 6}}/>

              <Stack justifyContent='center' alignItems='center'>
                <Button
                  variant="contained"
                  sx={{width: "140px"}}
                  onClick={handleClose}
                >
                    {tb('BACK')}
                </Button>
              </Stack>
            </Box>
            }
        </Dialog>
    );
});

ForgetPasswordModal.displayName = "ForgetPasswordModal";

export default ForgetPasswordModal;
