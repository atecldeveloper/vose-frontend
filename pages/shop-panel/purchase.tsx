import * as React from "react";
import {
  Box,
  Grid,
  TextField,
  Divider,
  Typography,
  Stack,
  InputAdornment,
  IconButton,
  Button,
  MenuItem,
  Checkbox,
} from "@mui/material";
import { getArrayObjByValue, setStateHelper } from "../../utils";
import { useProps } from "../../src/context/state";
import { useSnackbarContext } from "../../src/context/snackbar";
import ContainerLayout from "../../components/ContainerLayout";
import SectionPdContainerLayout from "../../components/SectionPdContainerLayout";
import {handleGetShopAllProductAPI} from "../../src/controller/product";
import { useTranslations } from "next-intl";
import CartTable from "../../components/CartTable";
import {GetStateListAPIProps, handleGetStateListAPI, manualTransactionAPI} from "../../src/controller/general.ts";
import { CountryList, SnackBarType } from "../../src/constants";
import {handleGetShopConfigsAPI, handleShopCheckoutAPI, ShopCheckoutAPIProps} from "../../src/controller/shop";
import { handleLogoutAPI } from "../../src/controller/account";
import { useRouter } from "next/router";
import UploadModal from "../../components/modal/UploadModel";

const Purchase = () => {
  const t = useTranslations("ShopOrder");
  const { _handleChange, _handleCleanContext } = useProps();
  const { handleOpenSnackbar } = useSnackbarContext();
  const router = useRouter();
  const counterRef = React.useRef<any>();
  const uploadRef = React.useRef<any>();
  const [mainState, setMainState] = React.useState({
    list: [],
    productList: [],
    shopMinPoint: 0,
    total: 0,
    pvPoint: 0,
    isAdminCode: false,
    adminCode: '',
  });
  const [stateList, setStateList] = React.useState([]);
  const [stateBillingList, setStateBillingList] = React.useState([]);
  const [isSameAddress, SetIsSameAddress] = React.useState(false);
  const [shipping, setShipping] = React.useState({
    address1: "",
    address2: "",
    postalCode: "",
    city: "",
    state: 0,
    stateCode: "",
    country: 0,
  });

  const [billing, setBilling] = React.useState({
    address1: "",
    address2: "",
    postalCode: "",
    city: "",
    state: 0,
    stateCode: "",
    country: 0,
  });

  React.useEffect(() => {
    handleGetProduct();
    handleGetShopConfigs();
  }, []);
  React.useEffect(() => {
    handleGetStateList();
  }, [shipping.country]);

  React.useEffect(() => {
    handleGetBillingStateList();
  }, [billing.country]);

  const handleGetStateList = () => {
    const body: GetStateListAPIProps = {
      country: shipping.country,
      setMainState: setStateList,
      changeContext: _handleChange,
      handleOpenSnackbar,
    };

    handleGetStateListAPI(body).then((data) => {
      setStateHelper(setShipping)({ state: data[0].value });
    });
  };

  const handleGetBillingStateList = () => {
    const body: GetStateListAPIProps = {
      country: billing.country,
      setMainState: setStateBillingList,
      changeContext: _handleChange,
      handleOpenSnackbar,
    };
      handleGetStateListAPI(body).then((data) => {
          if (isSameAddress == false) {
            setStateHelper(setBilling)({ state: data[0].value });
          }
      });
  };

  const handleGetProduct = () => {
    const body = {
      setMainState: setStateHelper(setMainState),
      changeContext: _handleChange,
      handleOpenSnackbar,
    };

    handleGetShopAllProductAPI(body).then((dataLength) => {
      counterRef.current = new Array(dataLength).fill(null).map(() => React.createRef());
    });
  };

  const handleGetShopConfigs = async () => {
    await handleGetShopConfigsAPI({
      setMainState: setStateHelper(setMainState),
      changeContext: _handleChange,
      handleOpenSnackbar,
    })
  }

  const handleEditProduct = (productID: string, quantity: number, id: number, stock: number) => {
    let productList = [...mainState.productList];
    let total = 0;
    let pvPoint = 0;
    productList.map((e: any, index: number) => {
      if (index == id) {
        e.quantity = quantity;
      }
      total += e.quantity * e.price;
      pvPoint += e.pvPoint * e.quantity;
    });

    setStateHelper(setMainState)({ productList: productList, total: total, pvPoint: pvPoint });
  };

  const handleSetState = (setState) => (event: any) => {
    let id = event.target.id;

    if (!id) {
      id = event.target.name;
    }
    setStateHelper(setState)({ [id]: event.target.value });
  };

  const handleChangeShipping = (event: any) => {
    let id = event.target.id;

    if (!id) {
      id = event.target.name;
    }

    if (isSameAddress) {
      setStateHelper(setShipping)({ [id]: event.target.value });
      setStateHelper(setBilling)({ [id]: event.target.value });
    } else {
      setStateHelper(setShipping)({ [id]: event.target.value });
    }
  }

  const handleSetIsAdminCode = (event: any) => {
    setStateHelper(setMainState)({ isAdminCode: event.target.checked, adminCode: '' });
  };

  const handleSetSameAddress = (e: any) => {
    if (e.target.checked) {
      setBilling(shipping);

    }
    SetIsSameAddress(e.target.checked);
  };

  const handleCheckIsAdminCheckout = () => {
    if (mainState.adminCode) {
      uploadRef.current.handleOpen();
    } else {
      handleShopCheckout()
    }
  }

  const handleShopCheckout = () => {
    const params: ShopCheckoutAPIProps = {
      pvPoint: mainState.pvPoint,
      productArr: mainState.productList,
      shopMinPoint: mainState.shopMinPoint,
      billingAddress: billing,
      shippingAddress: shipping,
      adminCode: mainState.adminCode,
      files: uploadRef.current.file ? uploadRef.current.file.fileArr : '',
      setMainState: setStateHelper(setMainState),
      changeContext: _handleChange,
      handleOpenSnackbar,
    }

    handleShopCheckoutAPI(params).then(({data, success}: any) => {
      if (success) {

        if (mainState.adminCode) {
          manualTransactionAPI({
            orderID: data.orderID,
            changeContext: _handleChange,
            handleOpenSnackbar,
          })

          setTimeout(() => {
            router.push(data.url);
          }, 1000)
        } else {
          router.push(data.url);
        }
      }
    });
  }

  const handleLogout = () => {
    handleLogoutAPI({
      changeContext: _handleChange,
      handleOpenSnackbar,
    }).then(() => {
      handleOpenSnackbar(`Successfully logged out`, SnackBarType.Success);
      _handleCleanContext();
      router.push("/");
    });
  }

  return (
    <ContainerLayout>
      <SectionPdContainerLayout innerStyle={{ pb: 10 }}>
      <Grid container alignItems={'flex-end'} sx={{ width: '100%' }}>
          <Grid item xs={12} sm={8}>
            <Typography variant="h2" sx={{ color: (t) => t.palette.secondary.main, pt: 10, fontWeight: 500 }}>
              {t('ORDER_TEXT')}
            </Typography>
          </Grid>
          <Grid sx={{display:'flex', justifyContent: 'flex-end'}} item xs={12} sm={4}>
          <Button
            variant="contained"
            sx={{
              width: { sx: "120px", md: "200px"},
            }}
            onClick={() => {handleLogout()}}
          >
            LOGOUT
          </Button>
          </Grid>
        </Grid>

        <Typography sx={{ color: (t) => t.palette.secondary.light, mt: 2, mb: 1, fontSize: 24 }}>
          {/*Please select more then <b>{mainState.shopMinPoint}PV </b> point products for you first purchase.*/}
          {t('ORDER_DESC')} <b>{mainState.shopMinPoint} Point</b> {t('ORDER_DESC_2')}
        </Typography>
        <Typography sx={{ fontSize: 18, mb: 3, color: 'red' }}>
          {t('ORDER_NOTES')}
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            backgroundColor: (t) => t.palette.background.default,
            p: 1,
            mt: 7,
            mb: 1,
            border: (t) => `1px solid ${t.palette.background.paper}`,
          }}
        >
          {/* <Checkbox checked={true} /> */}
          <Typography sx={{ color: (t) => t.palette.secondary.main, fontSize: 24 }}>
            Shop Available Product
          </Typography>
        </Stack>
        <CartTable
          isShop
          counterRef={counterRef}
          dataList={mainState.productList}
          total={mainState.total}
          pvPoint={mainState.pvPoint}
          handleEditProduct={handleEditProduct}
        />

        <Divider />

        <Stack
          direction="row"
          alignItems="center"
          sx={{
            backgroundColor: (t) => t.palette.background.default,
            p: 1,
            mt: 5,
            mb: 4,
            border: (t) => `1px solid ${t.palette.background.paper}`,
          }}
        >
          {/* <Checkbox checked={true} /> */}
          <Typography sx={{ color: (t) => t.palette.secondary.main, fontSize: 24 }}>
            Shipping & Billing details
          </Typography>


        </Stack>
        <Grid container spacing={4} sx={{ px: 1 }}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={1}>
              <Typography sx={{ color: (t) => t.palette.secondary.main, fontSize: 20, ml: 1 }}>
                {"Shipping Address"}
              </Typography>
              <Grid item xs={12}>
                <TextField
                  id={"address1"}
                  sx={{ width: "100%" }}
                  label="Address"
                  variant="outlined"
                  value={shipping.address1}
                  onChange={handleChangeShipping}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id={"city"}
                  sx={{ width: "100%" }}
                  label="City"
                  variant="outlined"
                  value={shipping.city}
                  onChange={handleChangeShipping}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  sx={{ width: "100%" }}
                  select
                  name={"country"}
                  label="Country"
                  value={getArrayObjByValue(CountryList, shipping.country).value}
                  onChange={handleChangeShipping}
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
                  label="Postcode"
                  variant="outlined"
                  value={shipping.postalCode}
                  onChange={handleChangeShipping}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  sx={{ width: "100%" }}
                  select
                  name={"state"}
                  label="State"
                  value={shipping.state}
                  onChange={handleChangeShipping}
                >
                  {stateList.map((option: any) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={1}>
              <Stack direction="row" alignItems="center">
                <Typography sx={{ color: (t) => t.palette.secondary.main, fontSize: 20, ml: 1 }}>
                  {"Billing Address"}
                </Typography>
                <Stack direction="row" alignItems="center" sx={{ mb: 0, ml: 1 }}>
                  <Checkbox
                    sx={{ transform: "scale(0.7)", p: 0 }}
                    checked={isSameAddress}
                    onChange={handleSetSameAddress}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  <Typography sx={{ color: (t) => t.palette.secondary.main, fontSize: 14, mb: "-4px" }}>
                    Same as Shipping Address
                  </Typography>
                </Stack>
              </Stack>
              {!isSameAddress ? (
                <>
                  <Grid item xs={12}>
                    <TextField
                      id={"address1"}
                      sx={{ width: "100%" }}
                      label="Address"
                      variant="outlined"
                      value={billing.address1}
                      onChange={handleSetState(setBilling)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id={"city"}
                      sx={{ width: "100%" }}
                      label="City"
                      variant="outlined"
                      value={billing.city}
                      onChange={handleSetState(setBilling)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      sx={{ width: "100%" }}
                      select
                      name={"country"}
                      label="Country"
                      value={getArrayObjByValue(CountryList, billing.country).value}
                      onChange={handleSetState(setBilling)}
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
                      label="Postcode"
                      variant="outlined"
                      value={billing.postalCode}
                      onChange={handleSetState(setBilling)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      sx={{ width: "100%" }}
                      select
                      name={"state"}
                      label="State"
                      value={billing.state}
                      onChange={handleSetState(setBilling)}
                    >
                      {stateBillingList.map((option: any) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </>
              ) : (
                <Grid item xs={12}>
                  <Typography sx={{ fontSize: 18, mt: 10, textAlign: 'center' }}>
                    {"Same As Shipping Address"}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>

        <Stack direction="row" alignItems="center" sx={{ mb: -3, ml: -2, mt: 2, p: 2 }}>
          <Checkbox
              checked={mainState.isAdminCode}
              onChange={handleSetIsAdminCode}
              inputProps={{ "aria-label": "controlled" }}
          />
          <Typography sx={{ color: (t) => t.palette.secondary.main, fontSize: 20, mb: "-4px" }}>
            Admin Code
          </Typography>
        </Stack>

        {mainState.isAdminCode && (
            <Grid container sx={{ mt: 2 }}>
              <Grid item xs={12} md={6} sx={{ p: 2 }}>
                <TextField
                    id={"adminCode"}
                    sx={{ width: "100%" }}
                    label="Admin Code"
                    variant="outlined"
                    value={mainState.adminCode}
                    onChange={handleSetState(setMainState)}
                />
              </Grid>
            </Grid>
        )}

        <Stack direction='row' justifyContent="space-between" sx={{ width: "100%", mt: 8 }}>
          <Box/>
          <Button
            variant="contained"
            sx={{
              width: { sx: "120px", md: "200px"},
            }}
            onClick={handleCheckIsAdminCheckout}
          >
            CHECKOUT
          </Button>
        </Stack>

        <UploadModal
            ref={uploadRef}
            handleConfirm={handleShopCheckout}
        />

      </SectionPdContainerLayout>
    </ContainerLayout>
  );
};

export default Purchase;

export const getServerSideProps = ({ locale, locales }) => {
  return {
    props: {
      messages: {
        ...require(`../../messages/${locale}.json`),
      },
    },
  };
};
