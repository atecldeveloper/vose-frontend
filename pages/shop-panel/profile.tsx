import {variables} from "../../src/config/variables";
import {Box, Grid, TextField, Divider, Typography, Stack, InputAdornment, IconButton, Button, MenuItem} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import * as React from "react";
import PanelContainerLayout from "../../components/PanelContainerLayout";
import { getArrayObjByValue, setStateHelper } from "../../utils";
import {useProps} from "../../src/context/state";
import {useSnackbarContext} from "../../src/context/snackbar";
import {CountryList, SnackBarType} from "../../src/constants";
import { GetStateListAPIProps, handleGetStateListAPI } from "../../src/controller/general.ts";
import {GetShopDetailsAPIProps, handleGetShopDetailsAPI, handleUpdateDetailsAPI} from "../../src/controller/shop";
import { useTranslations } from "next-intl";


const ShopProfile = () => {
  const { _handleChange } = useProps();
  const { handleOpenSnackbar } = useSnackbarContext();
  const t = useTranslations('ShopProfile');
  const [stateList, setStateList] = React.useState([]);
  const [mainState, setMainState] = React.useState({
    shopName: "",
    phoneNumber: "",
    ssmNumber: '',
    email: "",
    username: "",
    shopCode: "SHOPWW",
  });

  const [shopAddress, setShopAddress] = React.useState({
    address1: "",
    address2: "",
    postalCode: "",
    city: '',
    state: 0,
    stateCode: "",
    country: getArrayObjByValue(CountryList, 0).value,
  });


  React.useEffect(() => {
    handleGetStateList(shopAddress.country);
  }, [shopAddress.country]);

  React.useEffect(() => {
    handleGetDetails();
  }, [])

  const handleGetStateList = (countryID: number) => {
    const body: GetStateListAPIProps = {
      country: countryID,
      setMainState: setStateList,
      changeContext: _handleChange,
      handleOpenSnackbar,
    };

    handleGetStateListAPI(body)
  };


  const handleSetMainState = (setState: any) => (event: any) => {
    let id = event.target.id;
    if (!id) {
      id = event.target.name;
    }
    setStateHelper(setState)({ [id]: event.target.value });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(mainState.shopCode).then(() => {
        handleOpenSnackbar("Copied!", SnackBarType.Success);
    })
  }

  const handleGetDetails = () => {
      const body: GetShopDetailsAPIProps = {
        setAddress: setStateHelper(setShopAddress),
        setMainState: setStateHelper(setMainState),
        changeContext: _handleChange,
        handleOpenSnackbar
      }

      handleGetShopDetailsAPI(body);
  }

  const handleUpdate = async () => {
      const params = {
        shopName: mainState.shopName,
        email: mainState.email,
        phoneNumber: mainState.phoneNumber,
        shopAddress: shopAddress,
      }
      await handleUpdateDetailsAPI({
          ...params,
          changeContext: _handleChange,
          handleOpenSnackbar
      })
  }

  return (
    <PanelContainerLayout isShop>
      <Box>
        <Typography
          variant="h2"
          sx={{ color: (t) => t.palette.secondary.main, mb: 3, fontSize: 32, fontWeight: 500 }}
        >
          {t('TITLE')}
        </Typography>
        <Typography sx={{ color: (t) => t.palette.secondary.light, mt: 2, mb: 2, fontSize: 24 }}>
          {t('SHOP_INFO')}
        </Typography>
        <Divider sx={{ mb: 4 }} />
        <Grid container spacing={3}>
          <Grid item xs={6}>
          <TextField
              sx={{ width: "100%" }}
              label={t('MY_SHOP_CODE')}
              variant="outlined"
              value={mainState.shopCode}
              disabled
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: <InputAdornment position="start">
                  <IconButton
                    onClick={handleCopy}
                    edge="end"
                  >
                   <ContentCopyIcon/>
                  </IconButton>
                 </InputAdornment>,
              }}
            />
            </Grid>
          <Grid item xs={6}>
            <TextField
              id={"shopName"}
              sx={{ width: "100%" }}
              label={t('SHOP_NAME')}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder={"Enter your Shop Name"}
              value={mainState.shopName}
              onChange={handleSetMainState(setMainState)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id={"phoneNumber"}
              sx={{ width: "100%" }}
              label={t('SHOP_CONTACT_NO')}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder={"Enter your Shop Contact No."}
              value={mainState.phoneNumber}
              onChange={handleSetMainState(setMainState)}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              id={"email"}
              sx={{ width: "100%" }}
              label={t('SHOP_EMAIL')}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder={"Enter your Shop Email"}
              value={mainState.email}
              onChange={handleSetMainState(setMainState)}
            />
          </Grid>


{/*
            <Grid item xs={12}>
                <Stack direction='row' justifyContent='flex-end'>
                    <Button variant='contained' sx={{width: '140px'}} onClick={handleUpdate}>Update</Button>
                </Stack>
            </Grid> */}
        </Grid>
        <Typography sx={{ color: (t) => t.palette.secondary.light, mt: 4, mb: 2, fontSize: 24 }}>
        {t('SHOP_ADDRESS')}
        </Typography>
        <Divider sx={{ mb: 4 }} />
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              id={"address1"}
              sx={{ width: "100%" }}
              label={t('ADDRESS')}
              variant="outlined"
              value={shopAddress.address1}
              onChange={handleSetMainState(setShopAddress)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id={"city"}
              sx={{ width: "100%" }}
              label={t('CITY')}
              variant="outlined"
              value={shopAddress.city}
              onChange={handleSetMainState(setShopAddress)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{ width: "100%" }}
              select
              name="country"
              label={t('COUNTRY')}
              value={shopAddress.country}
              onChange={handleSetMainState(setShopAddress)}
            >
              {CountryList.map((option: any) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id={"postalCode"}
              sx={{ width: "100%" }}
              label={t('POSTCODE')}
              variant="outlined"
              value={shopAddress.postalCode}
              onChange={handleSetMainState(setShopAddress)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{ width: "100%" }}
              select
              name={"state"}
              label={t('STATE')}
              value={shopAddress.state}
              onChange={handleSetMainState(setShopAddress)}
            >
              {stateList.map((option: any) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Stack direction='row' justifyContent='flex-end'>
              <Button variant='contained' sx={{width: '140px'}} onClick={handleUpdate}>{t('UPDATE')}</Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </PanelContainerLayout>
  );
};

export default ShopProfile;

export const getServerSideProps = ({ locale, locales }) => {
  return {
    props: {
      messages: {
        ...require(`../../messages/${locale}.json`),
      },
    },
  };
};
