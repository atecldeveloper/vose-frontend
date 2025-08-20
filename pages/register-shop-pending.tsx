import * as React from "react";
import { useRouter } from "next/router";
import {getArrayObjByValue, setStateHelper} from "../utils";
import {useTranslations} from "next-intl";
import {CountryList} from "../src/constants";
// @mui
import {
    Grid,
    Typography,
    Stack,
    Paper,
    Box,
    Stepper,
    Step,
    StepLabel,
    Button,
    TextField,
    InputLabel,
    OutlinedInput,
    InputAdornment, IconButton, FormControl, MenuItem, Checkbox
} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
// Components
import ContainerLayout from "../components/ContainerLayout";
import SectionPdContainerLayout from "../components/SectionPdContainerLayout";
import {UploadSSM} from "../components/shopRegister/UploadsSSM";
import AlertReferralModal from "../components/modal/AlertReferralModel";
// Controller
import {GetStateListAPIProps, handleGetStateListAPI} from "../src/controller/general.ts";
import {handleRegisterShopAPI, validateStepItem} from "../src/controller/shop";
import {handleGetDetailsReturnAPI} from "../src/controller/account";
import {useProps} from "../src/context/state";
import {useSnackbarContext} from "../src/context/snackbar";

const registerShopPending = () => {
    const t = useTranslations("RegisterShop");
    const tb = useTranslations("Button");
    const history = useRouter();
    const [steps, setSteps] = React.useState([t('P_STEP_1'), t('P_STEP_2'), t('P_STEP_3')])

    const handleHomepage = () => {
        history.push('/')
    }

    return (
        <ContainerLayout>
            <SectionPdContainerLayout
                style={{
                    backgroundImage: `url(/assets/testimonial/testimonial-bg.png)`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    height: { xs: '38vh', lg: '50vh' }
                    // backgroundPositionX: { lg: "0px", md: "0x", sm: "-170px" },
                }}
            >
                <Stack alignItems="center" sx={{ pt: 10 }}>
                    <Typography sx={{ color: (t) => t.palette.secondary.light }}>{t('RE_S_AB')}</Typography>
                    <Typography variant="h2" sx={{ color: (t) => t.palette.secondary.main, mt: 2, textAlign: 'center' }}>
                        {t('RE_DONE_TITLE')}
                    </Typography>
                    <Typography sx={{ color: (t) => t.palette.gary.light, whiteSpace: 'break-spaces',textAlign: "center", mt: 4, width: '65vw' }}>
                        {t('RE_DONE_DES')}
                    </Typography>
                </Stack>
            </SectionPdContainerLayout>

            <SectionPdContainerLayout
                style={{ backgroundColor: (t: any) => t.palette.background.default }}
                innerStyle={{ pt: 5, pb: 15, px: { xs: 0, md: "100px !important" } }}
            >
                <Paper sx={{ backgroundColor: "white", mt: {xs: -10, md:-15}, p: 3 }} elevation={3}>
                    <Box sx={{ width: '100%' }}>
                        <Stepper activeStep={3} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>

                    <Stack alignItems='center' justifyContent='center' sx={{ mt: 5 }}>
                        <Stack direction='row' justifyContent='center' sx={{ width: "100%",  mt: 3 }}>
                            <CheckCircleOutlineIcon color={'primary'} sx={{fontSize: '50px'}}/>
                        </Stack>
                        <Typography sx={{ color: (t) => t.palette.primary.main, mt: 2, mb: 2, fontSize: 24 }}>
                            Pending Approve!
                        </Typography>
                        {/*<Typography sx={{ color: (t) => t.palette.gary.light, textAlign: "center", mt: 4 }}>*/}
                        {/*    {t('RE_DONE_DES')}*/}
                        {/*</Typography>*/}

                        <Box sx={{ my: 4 }} />

                        <Button variant="contained" sx={{ fontSize: '16px' }} onClick={handleHomepage}>Back to Home page</Button>
                    </Stack>
                </Paper>
            </SectionPdContainerLayout>
        </ContainerLayout>
    )
}

export default registerShopPending;

export const getServerSideProps = ({ locale, locales }) => {
    return {
        props: {
            messages: {
                ...require(`../messages/${locale}.json`),
            },
        },
    };
};
