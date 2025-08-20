import * as React from "react";
import {
    Stack,
    Typography,
    Paper,
    TextField,
    Button,
    InputLabel,
    Box,
    OutlinedInput,
    Input,
    InputAdornment,
    IconButton, FormControl
} from "@mui/material";
import SectionPdContainerLayout from "../components/SectionPdContainerLayout";
import {useRouter} from "next/router";
import {setStateHelper} from "../utils";
import {handleVerifyTokenAPI, resetPasswordAPI} from "../src/controller/general.ts";
import {useProps} from "../src/context/state";
import {useSnackbarContext} from "../src/context/snackbar";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import {SnackBarType} from "../src/constants";

const ResetPassword = () => {
    const {_handleChange} = useProps();
    const {handleOpenSnackbar} = useSnackbarContext();
    const router = useRouter();
    const {auth} = router.query;
    const [mainState, setMainState] = React.useState({
        password: '',
        confirmPassword: '',
        showPassword: false,
    })

    React.useEffect(() => {
        if (router.isReady) {
            handleValidateToken()
        }
    }, [router.isReady])

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

    const handleValidateToken = async () => {
        await handleVerifyTokenAPI({
            token: auth,
            changeContext: _handleChange,
            handleOpenSnackbar
        })
    }

    const handleSubmitReset = async () => {
        const isSuccess = await resetPasswordAPI({
            token: auth,
            password: mainState.password,
            confirmPassword: mainState.confirmPassword,
            changeContext: _handleChange,
            handleOpenSnackbar
        })

        if (isSuccess) {
            handleOpenSnackbar('Successfully Reset Password ', SnackBarType.Success)
            router.push('/login')
        }
    }

    return (
        <SectionPdContainerLayout
            style={{
                backgroundImage: `url(/assets/testimonial/testimonial-bg.png)`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: "100vh",
            }}
        >
            <Stack alignItems="center" sx={{pt: 10}}>
                <img src={"/assets/VOSE-01.png"} style={{width: "230px", objectFit: "cover"}}/>
                <Paper sx={{backgroundColor: 'white', px: 7, py: 5, maxWidth: '500px', mt: 3}} elevation={3}>
                    <Typography variant="h2" sx={{color: (t) => t.palette.secondary.main, mt: 2, fontSize: 32}}>
                        Reset Your Password
                    </Typography>
                    <Typography sx={{color: (t) => t.palette.secondary.main, mt: 2}}>
                        Strong passwords include numbers, letters, and punctuation marks.
                    </Typography>
                    <Box sx={{m: 4}}/>
                    <FormControl sx={{width: '100%'}} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <Input
                            id="password"
                            type={mainState.showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            // variant="standard"
                            value={mainState.password}
                            onChange={handleChange}
                            // onKeyDown={handleKeyPress}
                            // label="Password"
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
                        />
                    </FormControl>
                    <Box sx={{m: 2}}/>
                    <FormControl sx={{width: '100%'}} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                        <Input
                            id="confirmPassword"
                            type={mainState.showPassword ? 'text' : 'password'}
                            placeholder="Confirm Password"
                            value={mainState.confirmPassword}
                            onChange={handleChange}
                            // onKeyDown={handleKeyPress}
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
                        />
                    </FormControl>
                    <Stack direction="row" justifyContent="flex-end" sx={{width: "100%", mt: 5}}>
                        <Button
                            variant="contained"
                            sx={{width: "200px"}}
                            onClick={handleSubmitReset}
                        >
                            <Typography>Reset Password</Typography>
                        </Button>
                    </Stack>
                </Paper>


            </Stack>
        </SectionPdContainerLayout>
    );
};

export default ResetPassword;
