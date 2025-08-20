import moment from "moment";
import { useQRCode } from 'next-qrcode';
import {variables} from "../../src/config/variables";
import {Box, Grid, TextField, Divider, Typography, Stack, InputAdornment, IconButton, Button} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import * as React from "react";
import PanelContainerLayout from "../../components/PanelContainerLayout";
import { getArrayObjByValue, setStateHelper } from "../../utils";
import {handleGetDetailsAPI, handleUpdateAPI} from "../../src/controller/account";
import {useProps} from "../../src/context/state";
import {useSnackbarContext} from "../../src/context/snackbar";
import {SnackBarType} from "../../src/constants";
import { STATIC_VARIABLE } from "../../src/constants/staticData";
import { useTranslations } from "use-intl";


const Profile = () => {
  const t: any = useTranslations("Profile");
  const { _handleChange, account } = useProps();
  const { handleOpenSnackbar } = useSnackbarContext();
  const { Canvas } = useQRCode();
  const [referralLink, setReferralLink] = React.useState<any>(variables.websiteUrl)
  const [mainState, setMainState] = React.useState({
    firstName: "",
    lastName: "",
    icNumber: "",
    email: "",
    phoneNumber: "",
    username: "",
    birthday: null,
    refererBy: {
      firstName: '',
      lastName: '',
    },
    referralCode: '',
    tier: 1
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const value = e.target.value;
    setStateHelper(setMainState)({[id]: value});
  };

    const handleCopy = () => {
        navigator.clipboard.writeText(mainState.referralCode).then(() => {
            handleOpenSnackbar("Copied!", SnackBarType.Success);
        })
    }

    const handleDownload = () => {
        if (typeof window !== 'undefined') {
            const canvas = document.getElementsByTagName("canvas");
            const pngURL = canvas[0].toDataURL("image/png").replace("image/png", "image/octet-stream");
            let downLoadLink: any = document.createElement("a");
            downLoadLink.href = pngURL;
            downLoadLink.download = "Referral_Code.png";
            document.body.appendChild(downLoadLink);
            downLoadLink.click();
            document.body.removeChild(downLoadLink);
        }
    }

  const handleChangeDate = (e: any) => {
      setStateHelper(setMainState)({birthday: e});
  }

  const handleGetDetails = async () => {
      await handleGetDetailsAPI({
          setMainState: setStateHelper(setMainState),
          changeContext: _handleChange,
          handleOpenSnackbar
      })
  }

  const handleUpdate = async () => {
    const date = moment(mainState.birthday).format('MM-DD-YYYY');

      const params = {
          firstName: mainState.firstName,
          lastName: mainState.lastName,
          email: mainState.email,
          phoneNumber: mainState.phoneNumber,
          birthday: date,
      }
      await handleUpdateAPI({
          ...params,
          changeContext: _handleChange,
          handleOpenSnackbar
      })
  }

  React.useEffect(() => {
      handleGetDetails()
  }, [])

  React.useEffect(() => {
      const referralLink = `${variables.websiteUrl}/product/booster?referralCode=${mainState.referralCode}`
      setReferralLink(referralLink)
  }, [mainState.referralCode])

  const levelBadge = getArrayObjByValue(STATIC_VARIABLE.levelStatusArray, mainState.tier).label

  return (
    <PanelContainerLayout>
      <Box>
        <Typography
          variant="h2"
          sx={{ color: (t) => t.palette.secondary.main, mb: 3, fontSize: 32, fontWeight: 500 }}
        >
          {t('TITLE')}
        </Typography>
        <Typography sx={{ color: (t) => t.palette.secondary.light, mt: 2, mb: 2, fontSize: 24 }}>
        {t('PERSONAL_INFO')}
        </Typography>
        <Divider sx={{ mb: 4 }} />
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              id={"firstName"}
              sx={{ width: "100%" }}
              label={t('F_NAME')}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder={"Enter your First Name"}
              value={mainState.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id={"lastName"}
              sx={{ width: "100%" }}
              label={t('L_NAME')}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder={"Enter your Last Name"}
              value={mainState.lastName}
              onChange={handleChange}
            />
          </Grid>
          {!account.isShop &&
          <Grid item xs={6}>
                <TextField
                  id={"icNumber"}
                  disabled
                  sx={{ width: "100%" }}
                  label={t('IC_N')}
                  variant="outlined"
                  value={mainState.icNumber}
                  onChange={handleChange}
                />
          </Grid>
          }
          <Grid item xs={6}>
            <TextField
              id={"email"}
              sx={{ width: "100%" }}
              label={t('EMAIL')}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder={"Enter your Email"}
              value={mainState.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
              label={t('BOD')}
              maxDate={new Date()}
                value={mainState.birthday}
                onChange={handleChangeDate}
                inputFormat='dd/MM/yyyy'
                renderInput={(params) => {
                  return (
                  <TextField
                    sx={{ width: "100%" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...params}
                  />
                )}}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id={"phoneNumber"}
              sx={{ width: "100%" }}
              label={t('PHONE')}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder={"Enter your Phone Number"}
              value={mainState.phoneNumber}
              onChange={handleChange}
            />
          </Grid>
            <Grid item xs={12}>
                <Stack direction='row' justifyContent='flex-end'>
                    <Button variant='contained' sx={{width: '140px'}} onClick={handleUpdate}>{t('UPDATE')}</Button>
                </Stack>
            </Grid>
        </Grid>
        <Typography sx={{ color: (t) => t.palette.secondary.light, mt: 4, mb: 2, fontSize: 24 }}>
        {t('ACCOUNT_INFO')}
        </Typography>
        <Divider sx={{ mb: 4 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              sx={{ width: "100%" }}
              label={t('U_NAME')}
              variant="outlined"
              disabled
              value={mainState.username}
            />
            <TextField
              sx={{ width: "100%", mt: 3 }}
              label={t('REFER_BY')}
              variant="outlined"
              disabled
              value={mainState.refererBy.firstName + ' ' + mainState.refererBy.lastName }
            />
            <TextField
              sx={{ width: "100%", mt: 3 }}
              label={t('REFER_CODE')}
              variant="outlined"
              value={mainState.referralCode}
              disabled
              InputProps={{
                endAdornment: <InputAdornment position="start">
                  <IconButton
                    onClick={handleCopy}
                    edge="end"
                  >
                   <ContentCopyIcon/>
                  </IconButton>
                  <IconButton
                    onClick={handleDownload}
                    edge="end"
                  >
                    <QrCode2Icon/>
                  </IconButton>
                 </InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{
                height: "100%",
                py: 2,
                px: 10,
                borderColor: (t) => t.palette.secondary.main,
                borderStyle: "solid",
                borderWidth: 1,
              }}
            >
              <Box
                sx={{
                  backgroundColor: (t) => t.palette.gary.light,
                  color: "white",
                  fontWeight: "bold",
                  pt: 1.2,
                  pb: 1,
                  px: 3,
                  borderRadius: 1,
                }}
              >
                <Typography sx={{ fontSize: 40 }}>{ levelBadge}</Typography>
              </Box>
              <Typography sx={{ color: (t) => t.palette.secondary.main, pt: 2 }}>{t('CURRENT_T')}: {levelBadge} </Typography>
              <Typography
                sx={{ color: (t) => t.palette.gary.light, fontSize: 16, textAlign: "center", my: 1 }}
              >
                  {mainState.tier === 3 ? t('TIER_F') : t('TIER_D')}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
          <Box sx={{ m: 2 }} />
          <Box sx={{ visibility: 'hidden', position: 'absolute' }}>
              <Canvas
                  text={referralLink}
                  options={{
                      type: 'image/jpeg',
                      quality: 0.3,
                      level: 'M',
                      margin: 3,
                      scale: 4,
                      width: 200,
                  }}
              />
          </Box>
      </Box>
    </PanelContainerLayout>
  );
};

export default Profile;

export const getServerSideProps = ({ locale, locales }) => {
    return {
        props: {
            messages: {
                ...require(`../../messages/${locale}.json`),
            },
        },
    };
};
