import {Box, Button, Grid, IconButton, Paper, Stack, TextField, Typography} from "@mui/material";
import * as React from "react";
import ContainerLayout from "../components/ContainerLayout";
import SectionPdContainerLayout from "../components/SectionPdContainerLayout";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MailIcon from '@mui/icons-material/Mail';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookSharpIcon from '@mui/icons-material/FacebookSharp';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useProps } from "../src/context/state";
import {useTranslations} from "next-intl";
import {setStateHelper} from "../utils";
import {getAllShopAPI, submitContactForm} from "../src/controller/general.ts";
import {useSnackbarContext} from "../src/context/snackbar";
import {SnackBarType} from "../src/constants";
import Maps from "../components/Maps";

const ContactUs = () => {
    const {_handleChange} = useProps();
    const {handleOpenSnackbar} = useSnackbarContext();
    const t = useTranslations("BrandPage");
    const tb = useTranslations("Button");
    const [mainState, setMainState] = React.useState({
        name: '',
        email: '',
        phoneNumber: '',
        message: ''
    })
    const [shopList, setShopList] = React.useState([])

    React.useEffect(() => {
        handleGetShop();
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const id = e.target.id;
        const value = e.target.value;
        setStateHelper(setMainState)({[id]: value});
    };

    // {
    //     "name": "Test Company",
    //     "phoneNumber": "0123456789",
    //     "email": "test@gmail.com",
    //     "isBeautician": 2,
    //     "location": {
    //     "lat": 1.6591832,
    //         "lng": 103.6392351
    // }

    const handleGetShop = async () => {
        const {data, success} = await getAllShopAPI({
            changeContext: _handleChange,
            handleOpenSnackbar
        })
        if (success) {
            setShopList(data)
        }
    }

    const handleSubmitForm = async () => {
        const isSuccess = await submitContactForm({
            name: mainState.name,
            email: mainState.email,
            phoneNumber: mainState.phoneNumber,
            message: mainState.message,
            changeContext: _handleChange,
            handleOpenSnackbar
        })

        if (isSuccess) {
            handleOpenSnackbar('Successfully Submit', SnackBarType.Success)
            setMainState({
                name: '',
                email: '',
                phoneNumber: '',
                message: ''
            })
        }
    }

    return (
        <ContainerLayout>
            <SectionPdContainerLayout
                style={{
                    backgroundImage: `url(/assets/testimonial/testimonial-bg.png)`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    height: "50vh",
                    // backgroundPositionX: { lg: "0px", md: "0x", sm: "-170px" },
                }}
            >
                <Stack alignItems="center" sx={{pt: 10}}>
                    <Typography sx={{color: (t) => t.palette.secondary.light}}>{t('CT_SC_1_AB')}</Typography>
                    <Typography variant="h2" sx={{color: (t) => t.palette.secondary.main, mt: 2}}>
                        {t('CT_SC_1_TITLE')}
                    </Typography>

                </Stack>
            </SectionPdContainerLayout>
            <SectionPdContainerLayout
                style={{backgroundColor: (t: any) => t.palette.background.default}}
                innerStyle={{pt: 10, pb: 15, px: {xs: 0, md: "100px !important"}}}
            >
                <Paper sx={{backgroundColor: "white", mt: -30}} elevation={3}>
                    <Grid container>
                        <Grid item xs={12} sm={6}>
                            <Stack spacing={4} sx={{p: 6}}>
                                <TextField
                                    id="name"
                                    label={t('CT_FM_NAME')}
                                    type="text"
                                    variant="standard"
                                    value={mainState.name}
                                    onChange={handleChange}
                                    InputLabelProps={{
                                        shrink: true,
                                        style: {
                                            fontSize: 20,
                                        },
                                    }}
                                    placeholder="Your Full Name"
                                    sx={{
                                        color: (t) => t.palette.secondary.light,
                                    }}
                                />
                                <TextField
                                    id='email'
                                    label={t('CT_FM_MAIL')}
                                    type="e-mail"
                                    variant="standard"
                                    value={mainState.email}
                                    onChange={handleChange}
                                    InputLabelProps={{
                                        shrink: true,
                                        style: {
                                            fontSize: 20,
                                        },
                                    }}
                                    placeholder="Your E-mail"
                                    sx={{
                                        color: (t) => t.palette.secondary.light,
                                    }}
                                />
                                <TextField
                                    id='phoneNumber'
                                    label={t('CT_FM_PHONE')}
                                    type="tel"
                                    variant="standard"
                                    value={mainState.phoneNumber}
                                    onChange={handleChange}
                                    InputLabelProps={{
                                        shrink: true,
                                        style: {
                                            fontSize: 20,
                                        },
                                    }}
                                    placeholder="Your Phone Number"
                                    sx={{
                                        color: (t) => t.palette.secondary.light,
                                    }}
                                />
                                <TextField
                                    id='message'
                                    label={t('CT_FM_MESSAGE')}
                                    multiline
                                    rows={4}
                                    variant="standard"
                                    value={mainState.message}
                                    onChange={handleChange}
                                    InputLabelProps={{
                                        shrink: true,
                                        style: {
                                            fontSize: 20,
                                        },
                                    }}
                                    placeholder="Write Your Message"
                                    sx={{
                                        color: (t) => t.palette.secondary.light,
                                    }}
                                />
                                <Stack alignItems="center" sx={{pt: 2}}>
                                    <Button
                                        variant="contained"
                                        sx={{width: "200px", alignItems: "center"}}
                                        onClick={handleSubmitForm}
                                    >
                                        {tb('SUBMIT')}
                                    </Button>
                                </Stack>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Stack
                                spacing={4}
                                sx={{
                                    p: 6,
                                    height: '100%',
                                    backgroundImage: `url(/assets/contact/contact-bg.png)`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover",
                                }}
                            >
                                <Typography variant="h2" sx={{color: (t) => t.palette.secondary.light, fontSize: 32}}>
                                    {t('CT_SC_2_TITLE')}
                                </Typography>
                                <Typography sx={{color: (t) => t.palette.secondary.main}}>
                                    {t('CT_SC_2_DES')}
                                </Typography>
                                <Stack direction='row'>
                                    <LocalPhoneIcon color='primary'/>
                                    <Typography
                                        sx={{color: (t) => t.palette.secondary.main, fontSize: 20, marginLeft: 3}}>
                                        +60 19-223 1463
                                    </Typography>
                                </Stack>
                                <Stack direction='row'>
                                    <MailIcon color='primary'/>
                                    <Typography
                                        sx={{color: (t) => t.palette.secondary.main, fontSize: 20, marginLeft: 3}}>
                                        vosemalaysia@hotmail.com                                    </Typography>
                                </Stack>
                                <Stack direction='row'>
                                    <LocationOnIcon color='primary'/>
                                    <Typography
                                        sx={{color: (t) => t.palette.secondary.main, fontSize: 20, marginLeft: 3}}>
                                        Unit 07-11, level 7, Block 4,
                                        Mines Waterfront Business Park,
                                        No 3, Jalan Tasik, Mines Resort City,
                                        43300 Seri kembangan,
                                        Selangor.
                                    </Typography>
                                </Stack>
                                <Stack direction='row' justifyContent='flex-start' spacing={1}
                                       style={{marginLeft: -10, marginTop: 120}}>
                                    <IconButton>
                                        <FacebookSharpIcon color='primary'/>
                                    </IconButton>
                                    <IconButton>
                                        <InstagramIcon color='primary'/>
                                    </IconButton>
                                    <IconButton>
                                        <WhatsAppIcon color='primary'/>
                                    </IconButton>
                                </Stack>
                            </Stack>

                        </Grid>
                    </Grid>
                </Paper>
            </SectionPdContainerLayout>


            <SectionPdContainerLayout style={{
                // backgroundColor: (t: any) => t.palette.background.default,
                padding: '80px 0',
            }}>
                <Typography
                    variant="h2"
                    sx={{
                        color: (t) => t.palette.secondary.main,
                        mt: 2,
                        mb: 4,
                        textAlign: 'center'
                    }}>
                    {t('CT_MP_TITLE')}
                </Typography>
                <Maps list={shopList}/>
            </SectionPdContainerLayout>
        </ContainerLayout>
    );
};

export default ContactUs;

export const getServerSideProps = ({locale, locales}) => {
    return {
        props: {
            messages: {
                ...require(`../messages/${locale}.json`),
            },
        },
    };
};
