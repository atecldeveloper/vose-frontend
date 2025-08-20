import * as React from "react";
import { useRouter } from "next/router";
import ContainerLayout from "../components/ContainerLayout";
import {
    Grid,
    Stack,
    Typography,
    TextField,
    Button,
    Box,
    Link,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {setStateHelper} from "../utils";
import {handleLoginAPI, handleRequestResetPasswordAPI} from "../src/controller/account";
import {useProps} from "../src/context/state";
import {useSnackbarContext} from "../src/context/snackbar";
import RegisterTutorialModal from "../components/modal/RegisterTutorialModal";
import ForgetPasswordModal from "../components/modal/ForgotPasswordModal";
import {useTranslations} from "next-intl";
import {RequestResetPasswordProps} from "../src/services/account";

const Login = () => {
    const { _handleChange } = useProps();
    const { handleOpenSnackbar } = useSnackbarContext();
    const t: any = useTranslations("Login");
    const tb = useTranslations("Button");
    const router = useRouter()
    const registerModalRef = React.useRef<any>();
    const forgotPasswordModalRef = React.useRef<any>();
    const [mainState, setMainState] = React.useState({
        username: '',
        password: '',
        showPassword: false
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const id = e.target.id;
        const value = e.target.value;
        setStateHelper(setMainState)({[id]: value});
    };

    const handleClickShowPassword = () => {
        setStateHelper(setMainState)({showPassword: !mainState.showPassword});
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleRequestResetPassword = async () => {
        const params: RequestResetPasswordProps = forgotPasswordModalRef.current.params;
        const {success} = await handleRequestResetPasswordAPI({
            ...params,
            changeContext: _handleChange,
            handleOpenSnackbar
        })

        if (success) {
            forgotPasswordModalRef.current.setStep(2)
        }
    }

    const handleKeyPress = (e: any) => {
        if(e.keyCode == 13){
            handleLogin()
        }
    }

    const handleLogin = async () => {
        const params = {
            username: mainState.username,
            password: mainState.password,
            changeContext: _handleChange,
            handleOpenSnackbar
        }
        const {data, success}: any = await handleLoginAPI(params)

        if (success) {
            if (data.isShop) {

                if (data.shopStatus == 2) {
                  router.push('/shop-panel/purchase')
                } else if (data.shopStatus == 3) {
                    router.push('/register-shop-pending')
                } else if (data.shopStatus !== 6) {
                    router.push('/shop-panel/profile')
                }
            } else {
                router.push('/panel/dashboard')
            }
        }
    }

    return (
        <ContainerLayout>
            <Grid container alignItems="center" sx={{height: "100%"}}>
                <Grid item xs={12} md={6}>
                    <Stack alignItems={"center"} justifyContent={"center"} spacing={1} sx={{px: '10vw'}}>
                        <Typography
                            variant={"h2"}
                            sx={{color: (t) => t.palette.secondary.main, fontWeight: 500, fontSize: 32}}
                        >
                          {t('LG_TITLE')}
                        </Typography>
                        <Typography sx={{color: (t) => t.palette.secondary.main}}>
                        {t('LG_DES')}
                        </Typography>
                        <Box sx={{p: 2}}/>
                        <TextField
                            id='username'
                            sx={{width: "100%"}}
                            label="Username"
                            variant="outlined"
                            value={mainState.username}
                            onChange={handleChange}
                            onKeyDown={handleKeyPress}
                        />
                        <Box sx={{p: 0.5}}/>
                        <FormControl sx={{m: 1, width: '100%'}} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="password"
                                type={mainState.showPassword ? 'text' : 'password'}
                                value={mainState.password}
                                onChange={handleChange}
                                onKeyDown={handleKeyPress}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {mainState.showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                        <Box sx={{p: 0.5}}/>
                        <Button variant="text" sx={{color: (t) => t.palette.secondary.main}} onClick={() => {forgotPasswordModalRef.current.handleOpen()}}>
                            {tb('FORGET_PASS')}
                        </Button>
                        <Box sx={{p: 4}}/>

                        <Button variant="contained" sx={{width: 200}} onClick={handleLogin}>
                            {tb('LOGIN')}
                        </Button>
                        <Box sx={{p: 1}}/>
                        <Stack direction="row" alignItems={"center"} spacing={1}>
                        <Typography sx={{color: (t) => t.palette.secondary.main}}>
                          {t('LG_S_DES')}
                        </Typography>
                        <Typography
                          component={Link}
                          color="secondary"
                          sx={{fontWeight: "bold", fontSize: 16, ml: 1, cursor: 'pointer'}}
                          onClick={() => {
                              router.push('/contact_us')
                              // registerModalRef.current.handleOpen();
                            }}
                          >
                            {t('LG_S_DES_2')}
                          </Typography>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item xs={0} md={6}>
                    <Stack
                        sx={{
                            backgroundImage: `url(${router.locale === 'en' ? '/assets/login-en.png' : '/assets/login-cn.png'})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundColor: 'white',
                            backgroundPositionX: 'center',
                            height: '100vh'
                        }}
                    >

                    </Stack>
                </Grid>
            </Grid>
            <RegisterTutorialModal ref={registerModalRef} handleConfirm={() => {router.push('/product/booster')}}/>
            <ForgetPasswordModal ref={forgotPasswordModalRef} handleConfirm={handleRequestResetPassword}/>
        </ContainerLayout>
    );
};

export default Login;

export const getServerSideProps = ({ locale, locales }) => {
    return {
        props: {
            messages: {
                ...require(`../messages/${locale}.json`),
            },
        },
    };
};
