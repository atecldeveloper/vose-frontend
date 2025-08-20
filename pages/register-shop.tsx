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


const registerShop = () => {
    const { _handleChange, account, isLogin, referralCode } = useProps();
    const t = useTranslations("RegisterShop");
    const tb = useTranslations("Button");
    const { handleOpenSnackbar } = useSnackbarContext();
    const history = useRouter();
    const [steps, setSteps] = React.useState([t('STEP_1'), t('STEP_2'), t('STEP_3')])
    const [activeStep, setActiveStep] = React.useState(0);
    const alertRef = React.useRef<any>();
    const ssmRef = React.useRef<any>();
    const shopPhotoRef = React.useRef<any>();
    const shopPhotoSubRef = React.useRef<any>();
    const icRef = React.useRef<any>([]);
    // const icBackRef = React.useRef<any>([]);
    const [stateList, setStateList] = React.useState([]);
    const [mainState, setMainState] = React.useState({
        firstName: '',
        lastName: '',
        contact: '', // shop phone
        contactNumber: '', // personal phone
        email: '',
        username: '',
        password: '',
        showPassword: false,
        referralCode: '',
        referralAlert: true,
        // Step 2
        companyName: '',
        ssmID: '',
        address1: "",
        address2: "",
        postalCode: "",
        city: '',
        state: 1,
        country: getArrayObjByValue(CountryList, 1).value,
        isBeautician: false,
        // Step 3
        partners: [
            {name: '', ic: ''},
        ],
    })
    const totalStep = isLogin ? activeStep === steps.length : activeStep === steps.length - 1;

    React.useEffect(() => {
        if (isLogin) {
            handleGetMemberInfo()
        }
        if (referralCode) {
          setStateHelper(setMainState)({referralCode})
        }
    }, [])

    React.useEffect(() => {
        handleGetStateList(mainState.country);
    }, [mainState.country]);

    const handleGetStateList = (countryID: number) => {
        const body: GetStateListAPIProps = {
            country: countryID,
            setMainState: setStateList,
            changeContext: _handleChange,
            handleOpenSnackbar,
        };

        handleGetStateListAPI(body);
    };

    const handleNext = async () => {
        let validStep: boolean = false;

        if (activeStep === 0 || activeStep === 1) {
            validStep = await validateStepItem({
                firstName: mainState.firstName,
                lastName: mainState.lastName,
                contact: mainState.contact,
                contactNumber: mainState.contactNumber,
                email: mainState.email,
                username: mainState.username,
                password: mainState.password,
                referralCode: mainState.referralCode,
                companyName: mainState.companyName,
                ssmID: mainState.ssmID,
                address1: mainState.address1,
                postalCode: mainState.postalCode,
                city: mainState.city,
                state: mainState.state,
                country: mainState.country,
                step: activeStep,
                changeContext: _handleChange,
                handleOpenSnackbar,
            })
        }

        if (activeStep === 2) {
            validStep = await handleRegisterShopAPI({
                firstName: mainState.firstName,
                lastName: mainState.lastName,
                contact: mainState.contact,
                contactNumber: mainState.contactNumber,
                email: mainState.email,
                username: mainState.username,
                password: mainState.password,
                referralCode: mainState.referralCode,
                companyName: mainState.companyName,
                ssmID: mainState.ssmID,
                address1: mainState.address1,
                postalCode: mainState.postalCode,
                city: mainState.city,
                state: mainState.state,
                country: mainState.country,
                isBeautician: mainState.isBeautician,
                partners: mainState.partners,
                ssmFiles: ssmRef.current.fileArr,
                shopPhotoFiles: shopPhotoRef.current.fileArr,
                shopPhotoSubFiles: shopPhotoSubRef.current.fileArr,
                icFiles: icRef.current.filter(n => n).map((e: any) => (e.fileArr[0])),
                // icBackFiles: icBackRef.current.filter(n => n).map((e: any) => (e.fileArr[0])),
                changeContext: _handleChange,
                handleOpenSnackbar,
            })
        }

        if (activeStep === 0 && validStep) {
            if (!mainState.referralCode && !alertRef.current.open) {
                alertRef.current.handleOpen();
                return;
            }

            alertRef.current.handleClose();
        }

        if (validStep) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const id = e.target.id;
        const value = e.target.value;
        setStateHelper(setMainState)({[id]: value});
    };

    const handleChangeCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStateHelper(setMainState)({isBeautician: e.target.checked});
    }

    const handleChangeSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const id = e.target.name;
        const value = e.target.value;
        setStateHelper(setMainState)({[id]: value});
    }

    const handleClickShowPassword = () => {
        setStateHelper(setMainState)({showPassword: !mainState.showPassword});
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleOnPartnerChange = (i: number) => (e: any) => {
        const id = e.target.id;
        const value = e.target.value;
        const cloneArr = [...mainState.partners];
        cloneArr[i][id] = value;

        setStateHelper(setMainState)({partners: cloneArr});
    }

    const handleAddPartner = () => {
        const cloneArr = [...mainState.partners]
        cloneArr.push({name: '', ic: ''});
        setStateHelper(setMainState)({partners: cloneArr})
    }

    const handleDeletePartner = (i: number) => () => {
        const cloneArr = [...mainState.partners]
        cloneArr.splice(i, 1)
        setStateHelper(setMainState)({partners: cloneArr})

        for (let n = 0; n < icRef.current.length; n++) {
            if (icRef.current[n+1] && n >= i) {
                const mvItem = icRef.current[n+1].fileArr
                icRef.current[n].setFileArr(mvItem)
            }
        }

        // for (let n = 0; n < icBackRef.current.length; n++) {
        //     if (icBackRef.current[n+1] && n >= i) {
        //         const mvItem = icBackRef.current[n+1].fileArr
        //         icBackRef.current[n].setFileArr(mvItem)
        //     }
        // }
    }

    const handleHomepage = () => {
        history.push('/')
    }

    const handleGetMemberInfo = async () => {
        const {data, success} = await handleGetDetailsReturnAPI({
            changeContext: _handleChange,
            handleOpenSnackbar
        })

        if (success) {
            if (!data.shop.length) {
                setSteps([t('STEP_2'), t('STEP_3')])
                setActiveStep(1)
                setStateHelper(setMainState)({
                    firstName: account.firstName,
                    lastName: account.lastName,
                    contactNumber: 'dummy',
                    email: account.email,
                    username: 'dummy',
                    password: 'dummy',
                })
            } else {
                const shopInfo = data.shop[0];

                if (shopInfo.status === 2) {
                    // Pending Payment
                    history.push('/')
                } else {
                    setSteps([t('STEP_2'), t('STEP_3')])
                    setActiveStep(4)
                }
            }
        }
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
                        {activeStep !== 0 ? t('RE_DONE_TITLE') : t('RE_S_TITLE')}
                    </Typography>
                    <Typography sx={{ color: (t) => t.palette.gary.light, whiteSpace: 'break-spaces',textAlign: "center", mt: 4, width: '65vw' }}>
                        {activeStep !== 0 ? t('RE_DONE_DES') : t('RE_S_DES')}
                    </Typography>
                </Stack>
            </SectionPdContainerLayout>

            <SectionPdContainerLayout
                style={{ backgroundColor: (t: any) => t.palette.background.default }}
                innerStyle={{ pt: 5, pb: 15, px: { xs: 0, md: "100px !important" } }}
            >
                <Paper sx={{ backgroundColor: "white", mt: {xs: 0, sm: -3, md:-5, lg: -15}, p: 3 }} elevation={3}>
                    <Box sx={{ width: '100%' }}>
                        <Stepper activeStep={activeStep} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>

                    <Box sx={{ my: 4 }}>
                        {activeStep === 0 &&
                        <Grid container sx={{ px: { xs: 3, sm: 10}, }} spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              id='firstName'
                              sx={{width: "100%"}}
                              label="First Name"
                              variant="outlined"
                              value={mainState.firstName}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              id='lastName'
                              sx={{width: "100%"}}
                              label="Last Name"
                              variant="outlined"
                              value={mainState.lastName}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              id='contactNumber'
                              sx={{width: "100%"}}
                              label="Contact No."
                              variant="outlined"
                              value={mainState.contactNumber}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              id='email'
                              sx={{width: "100%"}}
                              label="Email"
                              variant="outlined"
                              value={mainState.email}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              id='username'
                              sx={{width: "100%"}}
                              label="Username"
                              variant="outlined"
                              value={mainState.username}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControl sx={{width: '100%'}} variant="outlined">
                              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                              <OutlinedInput
                                id="password"
                                type={mainState.showPassword ? 'text' : 'password'}
                                value={mainState.password}
                                onChange={handleChange}
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
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              id='referralCode'
                              sx={{width: "100%"}}
                              label="Referral Code"
                              variant="outlined"
                              value={mainState.referralCode}
                              onChange={handleChange}
                            />
                          </Grid>
                        </Grid>
                        }

                        {activeStep === 1 &&
                          <React.Fragment>

                            <Typography sx={{ color: (t) => t.palette.secondary.light, mt: 2, mb: 2, fontSize: 24, px: { xs: 3, sm: 10} }}>
                              {t('TITLE_INFO')}
                            </Typography>
                            <Grid container sx={{ px: { xs: 3, sm: 10} }} spacing={2}>

                              <Grid item xs={12} sm={6}>
                                <TextField
                                  id='companyName'
                                  sx={{width: "100%"}}
                                  label="Shop name"
                                  variant="outlined"
                                  value={mainState.companyName}
                                  onChange={handleChange}
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  id='ssmID'
                                  sx={{width: "100%"}}
                                  label="SSM/Cert ID"
                                  variant="outlined"
                                  value={mainState.ssmID}
                                  onChange={handleChange}
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  id='contact'
                                  sx={{width: "100%"}}
                                  label="Shop Contact No."
                                  variant="outlined"
                                  value={mainState.contact}
                                  onChange={handleChange}
                                />
                              </Grid>
                             <Grid item xs={12}>
                                <Stack direction='row' alignItems='center'>
                                    <Checkbox
                                      checked={mainState.isBeautician}
                                      onChange={handleChangeCheckBox}
                                    />

                                    <Typography sx={{ color: (t) => t.palette.secondary.main, fontSize: 18, mb: "-4px" }}>
                                        {t('SHOP_TYPE')}
                                    </Typography>
                                </Stack>
                              </Grid>
                            </Grid>
                            <Typography sx={{ color: (t) => t.palette.secondary.light, mt: 3, fontSize: 24, px: { xs: 3, sm: 10} }}>
                              {t('TITLE_ADDRESS')}
                            </Typography>
                            <Grid container sx={{ px: {xs: 3 , sm: 10}, mt: 1 }} spacing={2}>
                              <Grid item xs={12}>
                                <TextField
                                  id={"address1"}
                                  sx={{ width: "100%" }}
                                  label="Address"
                                  variant="outlined"
                                  value={mainState.address1}
                                  onChange={handleChange}
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  id={"city"}
                                  sx={{ width: "100%" }}
                                  label="City"
                                  variant="outlined"
                                  value={mainState.city}
                                  onChange={handleChange}
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  sx={{ width: "100%" }}
                                  select
                                  name="country"
                                  label="Country"
                                  value={mainState.country}
                                  onChange={handleChangeSelect}
                                >
                                    {CountryList.map((option: any) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  id={"postalCode"}
                                  sx={{ width: "100%" }}
                                  label="Postcode"
                                  variant="outlined"
                                  value={mainState.postalCode}
                                  onChange={handleChange}
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  sx={{ width: "100%" }}
                                  select
                                  name={"state"}
                                  label="State"
                                  value={mainState.state}
                                  onChange={handleChangeSelect}
                                >
                                    {stateList.map((option: any) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                              </Grid>
                            </Grid>
                          </React.Fragment>
                        }

                        {activeStep === 2 &&
                            <Box sx={{ px: { xs: 3, sm: 10} }}>

                              <Box sx={{ my: 5 }} />
                              <Typography sx={{ color: (t) => t.palette.secondary.light, mt: 2, fontSize: 24 }}>
                                {t('TITLE_UPLOAD_BORANG')}
                              </Typography>
                              <Typography sx={{ color: (t) => t.palette.secondary.light, mt: 0, mb: 2, fontSize: 14 }}>
                                  {t('TITLE_UPLOAD_BORANG_NOTE')}
                              </Typography>
                              <UploadSSM
                                ref={ssmRef}
                                maxFiles={10}
                                minFiles={1}
                                type={1}
                                handleDelete={() => {}}
                              />

                              <Box sx={{ my: 5 }} />

                              <Typography sx={{ color: (t) => t.palette.secondary.light, mt: 2, mb: 2, fontSize: 24 }}>
                                  {t('TITLE_UPLOAD_SIGN')} {mainState.isBeautician ? `(${t('OPTIONAL')})` : ''} x 1
                              </Typography>
                              <UploadSSM
                                ref={shopPhotoRef}
                                maxFiles={1}
                                // disabled={mainState.isBeautician}
                                type={4}
                                handleDelete={() => {}}
                              />

                              <Box sx={{ my: 5 }} />

                              <Typography sx={{ color: (t) => t.palette.secondary.light, mt: 2, mb: 2, fontSize: 24 }}>
                                  {t('TITLE_UPLOAD_STORE')} {mainState.isBeautician ? `(${t('OPTIONAL')})` : ''} x1
                              </Typography>
                              <UploadSSM
                                ref={shopPhotoSubRef}
                                maxFiles={1}
                                // disabled={mainState.isBeautician}
                                type={4}
                                handleDelete={() => {}}
                              />

                              <Box sx={{ my: 5 }} />

                              <Typography sx={{ color: (t) => t.palette.secondary.light, mt: 2, mb: 2, fontSize: 24 }}>
                                {t('TITLE_UPLOAD_PARTNERS')}
                              </Typography>

                              <Box sx={{ my: 2 }} />

                              <Grid container spacing={4}>
                                  {mainState.partners.map((e: any, i: number) => (
                                      <Grid item key={e} xs={12} sm={6} sx={{ position: 'relative' }}>
                                          <Paper sx={{ backgroundColor: "white", p: 3 }} elevation={3}>
                                              <TextField
                                                  id={"name"}
                                                  sx={{ width: "100%" }}
                                                  label="Name"
                                                  variant="outlined"
                                                  value={e.name}
                                                  onChange={handleOnPartnerChange(i)}
                                              />
                                              <Box sx={{ my: 2 }} />
                                              <TextField
                                                  id={"ic"}
                                                  sx={{ width: "100%" }}
                                                  label="IC"
                                                  variant="outlined"
                                                  value={e.ic}
                                                  onChange={handleOnPartnerChange(i)}
                                              />
                                              <Box sx={{ my: 2 }} />
                                              <Typography sx={{ color: (t) => t.palette.secondary.light, mt: 2, mb: 2, fontSize: 18 }}>
                                                  Front IC:
                                              </Typography>
                                              <UploadSSM
                                                  ref={el => icRef.current[i] = el}
                                                  maxFiles={1}
                                                  type={2}
                                                  index={i}
                                                  handleDelete={() => {}}
                                              />

                                              {/*<Typography sx={{ color: (t) => t.palette.secondary.light, mt: 2, mb: 2, fontSize: 18 }}>*/}
                                              {/*    Back IC:*/}
                                              {/*</Typography>*/}
                                              {/*<UploadSSM*/}
                                              {/*    ref={el => icBackRef.current[i] = el}*/}
                                              {/*    maxFiles={1}*/}
                                              {/*    type={3}*/}
                                              {/*    index={i}*/}
                                              {/*    handleDelete={() => {}}*/}
                                              {/*/>*/}
                                          </Paper>
                                          {mainState.partners.length > 1 &&
                                              <IconButton
                                                sx={{ position: 'absolute', top: '0', right: '-20px' }}
                                                onClick={handleDeletePartner(i)}
                                              >
                                                  <CancelIcon />
                                              </IconButton>
                                          }
                                      </Grid>
                                  ))
                                  }
                              </Grid>

                              <Box sx={{ my: 4 }} />

                              <Button variant="contained" onClick={handleAddPartner}>Add Partner</Button>
                            </Box>
                        }

                        {activeStep === 3 &&
                            <Stack alignItems='center' justifyContent='center'>

                              <Stack direction='row' justifyContent='center' sx={{ width: "100%",  mt: 3 }}>
                                <CheckCircleOutlineIcon color={'primary'} sx={{fontSize: '50px'}}/>
                              </Stack>
                              <Typography sx={{ color: (t) => t.palette.primary.main, mt: 2, mb: 2, fontSize: 24 }}>
                                Successfully Submit!
                              </Typography>
                              {/*<Typography sx={{ color: (t) => t.palette.gary.light, textAlign: "center", mt: 4 }}>*/}
                              {/*    {t('RE_DONE_DES')}*/}
                              {/*</Typography>*/}

                              <Box sx={{ my: 4 }} />

                              <Button variant="contained" sx={{ fontSize: '16px' }} onClick={handleHomepage}>Back to Home page</Button>
                            </Stack>
                        }

                        {activeStep === 4 &&
                            <Stack alignItems='center' justifyContent='center'>
                                <Stack direction='row' justifyContent='center' sx={{ width: "100%",  mt: 3 }}>
                                <PendingActionsIcon color={'primary'} sx={{fontSize: '50px'}}/>
                              </Stack>
                              <Typography sx={{ color: (t) => t.palette.primary.main, mt: 2, mb: 2, fontSize: 24 }}>
                                Pending Verify!
                              </Typography>

                               <Typography sx={{ color: (t) => t.palette.gary.light, textAlign: "center", mt: 4 }}>
                                Thanks for registering. Please wait for our administrator to verify your shop.
                              </Typography>

                              <Box sx={{ my: 4 }} />

                              <Button variant="contained" sx={{ fontSize: '16px' }} onClick={handleHomepage}>Back to Home page</Button>
                            </Stack>
                        }

                    </Box>

                    {(activeStep !== 3 && activeStep !== 4) &&
                    <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                      <Button
                        color="inherit"
                        disabled={((activeStep === 0) || (isLogin && activeStep === 1)) }
                        onClick={handleBack}
                        sx={{mr: 1}}
                      >
                          {tb('BACK')}
                      </Button>
                      <Box sx={{flex: '1 1 auto'}}/>
                      <Button onClick={handleNext}>
                          {totalStep ? tb('FINISH') : tb('NEXT')}
                      </Button>
                    </Box>
                    }
                </Paper>

                <AlertReferralModal
                    ref={alertRef}
                    handleConfirm={handleNext}
                />
            </SectionPdContainerLayout>
        </ContainerLayout>
    )
}

export default registerShop;

export const getServerSideProps = ({ locale, locales }) => {
    return {
        props: {
            messages: {
                ...require(`../messages/${locale}.json`),
            },
        },
    };
};
