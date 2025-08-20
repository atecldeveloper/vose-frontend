import {
  Box,
  Grid,
  TextField,
  Divider,
  Typography,
  MenuItem,
  Button,
  Stack,
  Checkbox,
} from "@mui/material";
import * as React from "react";
import PanelContainerLayout from "../../components/PanelContainerLayout";
import { getArrayObjByValue, setStateHelper } from "../../utils";
import { CountryList } from "../../src/constants";
import { GetStateListAPIProps, handleGetStateListAPI } from "../../src/controller/general.ts";
import { useProps } from "../../src/context/state";
import { useSnackbarContext } from "../../src/context/snackbar";
import { GetAddressAPIProps, handleGetAddressAPI, handleUpdateAddressAPI, UpdateAddressAPIProps } from "../../src/controller/account";
import { useTranslations } from "use-intl";

const Address = () => {
  const t: any = useTranslations('Address');
  const { _handleChange } = useProps();
  const { handleOpenSnackbar } = useSnackbarContext();
  const [stateBillingList, setBillingStateList] = React.useState([]);
  const [stateList, setStateList] = React.useState([]);
  const [ isSameAddress, setIsSameAddress ] = React.useState(false);
  const [shippingAddress, setShippingAddress] = React.useState({
    address1: "",
    address2: "",
    postalCode: "",
    city: '',
    state: 1,
    stateCode: "",
    country: getArrayObjByValue(CountryList, 1).value,
  });

  const [billingAddress, setBillingAddress] = React.useState({
    address1: "",
    address2: "",
    postalCode: "",
    city: '',
    state: 1,
    stateCode: "",
    country: getArrayObjByValue(CountryList, 1).value,
  });

  React.useEffect(() => {
      handleGetAddress();
  }, [])

  const handleGetAddress = () => {
    const body: GetAddressAPIProps = {
      setBillingAddress,
      setShippingAddress,
      changeContext: _handleChange,
      handleOpenSnackbar,
    }
    handleGetAddressAPI(body).then(({shippingAddress, billingAddress}: any) => {
      if(shippingAddress && billingAddress) {
        handleGetStateList(shippingAddress.country, true, true);
        handleGetStateList(billingAddress.country, false, true);
      }
    });
  }

  const handleGetStateList = (countryID: number, isShipping: boolean, isFirst: boolean = false) => {
    const body: GetStateListAPIProps = {
      country: countryID,
      setMainState: isShipping ? setStateList : setBillingStateList,
      changeContext: _handleChange,
      handleOpenSnackbar,
    };
    handleGetStateListAPI(body).then((data) => {
      if (!isFirst) {
        setStateHelper(isShipping ? setShippingAddress : setBillingAddress)({
          state: data[0].value,
          stateCode: data[0].code,
        });
      }
    });
  };

  const handleSetMainState = (setState: any) => (event: any) => {
    let id = event.target.id;
    if (!id) {
      id = event.target.name;
    }
    setStateHelper(setState)({ [id]: event.target.value });

  };

  const handleSetShippingCountry = (event: any) => {
    setStateHelper(setShippingAddress)({ country: event.target.value });
    handleGetStateList(event.target.value, true)
  }

  const handleSetBillingCountry = (event: any) => {
    setStateHelper(setBillingAddress)({ country: event.target.value });
    handleGetStateList(event.target.value, false)
  }

  const handleUpdate = () => {
    const body: UpdateAddressAPIProps = {
      shippingAddress,
      billingAddress,
      changeContext: _handleChange,
      handleOpenSnackbar,
    }

    handleUpdateAddressAPI(body);
  }

  const setSameAddress = (e: any) => {
    setBillingAddress(shippingAddress);
    setIsSameAddress(e.target.checked);
  }
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
        {t('DEF_SHI_ADDRESS')}
        </Typography>
        <Divider sx={{ mb: 4 }} />
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              id={"address1"}
              sx={{ width: "100%" }}
              label={t('ADDRESS')}
              variant="outlined"
              value={shippingAddress.address1}
              onChange={handleSetMainState(setShippingAddress)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id={"city"}
              sx={{ width: "100%" }}
              label={t('CITY')}
              variant="outlined"
              value={shippingAddress.city}
              onChange={handleSetMainState(setShippingAddress)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{ width: "100%" }}
              select
              name="country"
              label={t('COUNTRY')}
              value={shippingAddress.country}
              onChange={handleSetShippingCountry}
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
              value={shippingAddress.postalCode}
              onChange={handleSetMainState(setShippingAddress)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{ width: "100%" }}
              select
              name={"state"}
              label={t('STATE')}
              value={shippingAddress.state}
              onChange={handleSetMainState(setShippingAddress)}
            >
              {stateList.map((option: any) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <Stack direction="row" alignItems="center">
          <Typography sx={{ color: (t) => t.palette.secondary.light, mt: 5, mb: 2, fontSize: 24 }}>
            {t('DEF_BIL_ADDRESS')}
          </Typography>
            <Stack direction="row" alignItems="center" sx={{ mb: -3, ml: 1 }}>
              <Checkbox
                sx={{ transform: "scale(0.7)", p: 0 }}
                checked={isSameAddress}
                onChange={setSameAddress}
                inputProps={{ "aria-label": "controlled" }}
              />
              <Typography sx={{ color: (t) => t.palette.secondary.main, fontSize: 14, mb: "-4px" }}>
                {t('SAME_ADDRESS')}
              </Typography>
            </Stack>
          </Stack>
        <Divider sx={{ mb: 4 }} />
        {!isSameAddress ? (

        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              id={"address1"}
              sx={{ width: "100%" }}
              label={t('ADDRESS')}
              variant="outlined"
              value={billingAddress.address1}
              onChange={handleSetMainState(setBillingAddress)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id={"city"}
              sx={{ width: "100%" }}
              label={t('CITY')}
              variant="outlined"
              value={billingAddress.city}
              onChange={handleSetMainState(setBillingAddress)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{ width: "100%" }}
              select
              name="country"
              label={t('COUNTRY')}
              value={billingAddress.country}
              onChange={handleSetBillingCountry}
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
              value={billingAddress.postalCode}
              onChange={handleSetMainState(setBillingAddress)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{ width: "100%" }}
              select
              name={"state"}
              label={t('STATE')}
              value={billingAddress.state}
              onChange={handleSetMainState(setBillingAddress)}
            >
              {stateBillingList.map((option: any) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        ) : (
          <Grid item xs={12}>
            <Typography sx={{ fontSize: 18, mt: 2, textAlign: 'center' }}>
              {t('SAME_ADDRESS')}
            </Typography>
          </Grid>
        )} 

        <Button variant='contained' onClick={handleUpdate} sx={{ width: '150px', mt: 5}} >
          {t('UPDATE')}     
        </Button>
      </Box>
    </PanelContainerLayout>
  );
};

export default Address;

export const getServerSideProps = ({ locale, locales }) => {
  return {
    props: {
      messages: {
        ...require(`../../messages/${locale}.json`),
      },
    },
  };
};
