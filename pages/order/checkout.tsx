import * as React from "react";
import { useRouter } from "next/router";
import {useTranslations} from "next-intl";
import { getArrayObjByValue, setStateHelper } from "../../utils";
import { useProps } from "../../src/context/state";
import { CountryList, SnackBarType } from "../../src/constants";
import { useSnackbarContext } from "../../src/context/snackbar";
// @mui
import { Box, Grid, Typography, Checkbox, Stack, TextField, MenuItem, IconButton, Tooltip, Button } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
// components
import ContainerLayout from "../../components/ContainerLayout";
import SectionPdContainerLayout from "../../components/SectionPdContainerLayout";
import OrderSummery from "../../components/OrderSummary";
import CustomBreadcrumbs from "../../components/CustomBreadcrumbs";
import AlertReferralModal from "../../components/modal/AlertReferralModel";
// controller
import { GetOrderCheckoutDetailsProps, handleGetOrderCheckoutDetails } from "../../src/controller/product";
import { CheckoutAPIProps, handleCheckoutAPI } from "../../src/controller/order";
import {GetStateListAPIProps, handleGetReferralCodeName, handleGetShopCodeName, handleGetStateListAPI, manualTransactionAPI} from "../../src/controller/general.ts";
import { GetAddressAPIProps, handleCheckLoginAPI, handleGetAddressAPI, handleGetDetailsReturnAPI } from "../../src/controller/account";
import UploadModal from "../../components/modal/UploadModel";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import moment from "moment";
import CheckCurrentMemberModal from "../../components/modal/CheckPaymentModel";



const Checkout = () => {
  const router = useRouter();
  const { localCart, isLogin, isUseCoin, referralCode, _handleChange, _handleCleanCartContext } = useProps();
  const t:any = useTranslations("Cart");
  const { handleOpenSnackbar } = useSnackbarContext();
  const { code }: any = router.query;
  const { locale } = useRouter();
  const isZh = locale == 'cn';
  const alertRef = React.useRef<any>();
  const uploadRef = React.useRef<any>();
  const checkMemberRef = React.useRef<any>();

  const [stateBillingList, setBillingStateList] = React.useState([]);
  const [stateList, setStateList] = React.useState([]);
  const [mainState, setMainState] = React.useState({
    username: "",
    email: "",
    icNumber: "",
    phoneNumber: "",
    icFirstName: "",
    icLastName: "",
    birthday: null,
    confirmPassword: "",
    password: "",
    referralCode: "",
    referralName: "",
    referralAlert: true,
    validJoinMember: false,
    memberMinPoint: 0,
    registerFee: 0,
    isUseCoin: false,
    shipping: {
      shippingInfo: {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
      },
      shippingAddress: {
        address1: "",
        address2: "",
        postalCode: "",
        city: "",
        state: 0,
        stateCode: "",
        country: 0,
      },
    },
    billingAddress: {
      address1: "",
      address2: "",
      postalCode: "",
      city: "",
      state: 0,
      stateCode: "",
      country: 0,
    },
    shopCode: "",
    shopName: "",
    adminCode: "",
    isPickUpAtShop: true,
    isAdminCode: false,
    isSameAddress: false,
    remarks: "",
    unit: "RM",
    subTotal: 0,
    shippingFee: 0,
    total: 0,
    coins: 0,
    voucher: {
      ID:0
    },
    pvPoint: 0,
    isMember: false,
    countryID: 1,
    firstLoad: true,
    loginMember: ''
  });

  React.useEffect(() => {

    if (referralCode) {
      setStateHelper(setMainState)({referralCode})
    }
  }, []);


  React.useEffect(() => {
    if (router.isReady) {
      handleGetSummeryDetails();
    }
  }, [
    router.isReady,
    mainState.shipping.shippingAddress.country,
    mainState.isMember,
    mainState.shipping.shippingAddress.state,
    mainState.isPickUpAtShop,
  ]);

  React.useEffect(() => {
    if (isLogin) {
      handleGetMemberInfo();
    }
  }, [mainState.isPickUpAtShop]);

  const handleGetMemberInfo = async () => {
    const {data, success} = await handleGetDetailsReturnAPI({
        changeContext: _handleChange,
        handleOpenSnackbar
    })

    if (success) {
      let shippingInfo =  {
        firstName: data.firstName,
        lastName:  data.lastName,
        phoneNumber: data.phoneNumber,
        email: data.email
      };

      let shipping = {
        shippingInfo: shippingInfo,
        shippingAddress: mainState.shipping.shippingAddress,
      }
      setStateHelper(setMainState)({shipping})
      handleGetAddress(data)
    }
  };

  const handleGetAddress = async(data: any) => {
    const body: GetAddressAPIProps = {
      setBillingAddress: () => {},
      setShippingAddress: () => {},
      changeContext: _handleChange,
      handleOpenSnackbar,
    }
    await handleGetAddressAPI(body).then(({shippingAddress, billingAddress}: any) => {
      if(shippingAddress && billingAddress) {
        let shippingInfo =  {
          firstName: data.firstName,
          lastName:  data.lastName,
          phoneNumber: data.phoneNumber,
          email: data.email
        };

        let shipping = {
          shippingInfo: shippingInfo,
          shippingAddress: shippingAddress
        }
        let billing = billingAddress;

        console.log('handleGetAddress', shipping, billing)

        setStateHelper(setMainState)({shipping, billingAddress: billing})
      }
    });
  }

  const handleGetSummeryDetails = async () => {
    const body: GetOrderCheckoutDetailsProps = {
      localProductList: localCart,
      voucherCode: code,
      isRegisterMember: mainState.isMember,
      pickInShop: mainState.isPickUpAtShop,
      countryID: 1,
      useCoin: isUseCoin,
      shipping: mainState.shipping,
      setMainState: setStateHelper(setMainState),
      changeContext: _handleChange,
      handleOpenSnackbar,
    };
    const country = await handleGetOrderCheckoutDetails(body);
    if (mainState.firstLoad) {
      handleGetBillingStateList(false, country);
      handleGetStateList(false, country);
      setStateHelper(setMainState)({ firstLoad: false })
    }
  };

  const handleGetBillingStateList = (isClean: boolean, index?: any) => {
    const body: GetStateListAPIProps = {
      country: index ? index : mainState.billingAddress.country,
      setMainState: setBillingStateList,
      changeContext: _handleChange,
      handleOpenSnackbar,
    };

    handleGetStateListAPI(body).then((data) => {
      if (isClean) {
        let addressObj = { ...mainState.billingAddress };
        addressObj.state = data[0].value;
        addressObj.stateCode = data[0].code;
        setStateHelper(setMainState)({ billingAddress: addressObj });
      }
    });
  };

  const handleGetStateList = (isClean: boolean, index?: any) => {
    const body: GetStateListAPIProps = {
      country: index ? index :mainState.shipping.shippingAddress.country,
      setMainState: setStateList,
      changeContext: _handleChange,
      handleOpenSnackbar,
    };

    handleGetStateListAPI(body).then((data) => {
      if (isClean) {
        let shippingObj = { ...mainState.shipping };
        shippingObj.shippingAddress.state = data[0].value;
        shippingObj.shippingAddress.stateCode = data[0].code;
        setStateHelper(setMainState)({ shipping: shippingObj });
      }
    });
  };

  const handleCheckIsAdminCheckout = async() => {
    if (mainState.adminCode || mainState.isAdminCode) {
      if (!mainState.adminCode) {
        return handleOpenSnackbar("Admin Code is required", SnackBarType.Error);
      }
      uploadRef.current.handleOpen();
    } else {
      if (mainState.shopCode == '') {
        return handleOpenSnackbar("Shop Code is required", SnackBarType.Error);
      }
      const {data, success}:any = await handleCheckLoginAPI({
        changeContext: _handleChange,
        handleOpenSnackbar,
      });
      if(success){
        checkMemberRef.current.setName(data.username)
        checkMemberRef.current.setIsGuest(data.isGuest)
        checkMemberRef.current.handleOpen()
      }
      // handleCheckout()
    }
  }

  const handleCheckout = () => {
    let _billingAddress = {
      ...mainState.billingAddress,
      // country: getArrayObjByValue(CountryList, mainState.billingAddress.country).label,
      // state: getArrayObjByValue(stateBillingList, mainState.billingAddress.state).label,
    };
    const _shippingAddress = {
      ...mainState.shipping,
      shippingAddress: {
        ...mainState.shipping.shippingAddress,
        // country: getArrayObjByValue(CountryList, mainState.shipping.shippingAddress.country).label,
        // state: getArrayObjByValue(stateBillingList, mainState.shipping.shippingAddress.state).label,
      },
    };

    if (mainState.isSameAddress) {
      _billingAddress = mainState.shipping.shippingAddress
    }

    if (mainState.isMember && !mainState.referralCode && !alertRef.current.open) {
      alertRef.current.handleOpen();
      return;
    }

    alertRef.current.handleClose();
    checkMemberRef.current.handleClose()

    if(mainState.isMember && (!moment(mainState.birthday).isValid() || moment(mainState.birthday).year() < 1800)){
      return handleOpenSnackbar("Date Of Birth format not valid", SnackBarType.Error);
    }

    const body: CheckoutAPIProps = {
      username: mainState.username,
      icFirstName: mainState.icFirstName,
      icLastName: mainState.icLastName,
      birthday: mainState.birthday ? moment(mainState.birthday).format('MM-DD-YYYY') : null,
      email: mainState.email,
      joinMember: mainState.isMember,
      phoneNumber: mainState.phoneNumber,
      confirmPassword: mainState.confirmPassword,
      password: mainState.password,
      referralCode: mainState.referralCode,
      icNumber: mainState.icNumber,
      shipping: _shippingAddress,
      billingAddress: _billingAddress,
      shopCode: mainState.shopCode,
      adminCode: mainState.adminCode,
      pickInShop: mainState.isPickUpAtShop,
      productArr: localCart,
      voucherID: mainState.voucher && mainState.voucher.ID ? mainState.voucher.ID : 0,
      coin: isUseCoin,
      remarks: mainState.remarks,
      isPickUpAtShop: mainState.isPickUpAtShop,
      files: uploadRef.current.file ? uploadRef.current.file.fileArr : '',
      setMainState: setStateHelper(setMainState),
      changeContext: _handleChange,
      handleOpenSnackbar,
    };

    // handleCheckoutAPI(body).then(({success, data}: any) => {
    //   if (success) {

    //     if (mainState.adminCode) {
    //       manualTransactionAPI({
    //         orderID: data.orderID,
    //         changeContext: _handleChange,
    //         handleOpenSnackbar,
    //       })

    //       setTimeout(() => {
    //         router.push(data.url);
    //       }, 1000)
    //     } else {
    //       router.push(data.url);
    //     }
    //   }
    // });
  };

  const handleSetMainState = (event: any) => {
    setStateHelper(setMainState)({ [event.target.id]: event.target.value });
  };

  const handleSetShippingInfoDetails = (event: any) => {
    let obj: any = mainState.shipping;
    obj["shippingInfo"][event.target.id] = event.target.value;
    setStateHelper(setMainState)({ shipping: obj });
  };

  const handleSetShippingAddressDetails = (event: any) => {
    let obj: any = mainState.shipping;
    let id = event.target.id;

    if (!id) {
      id = event.target.name;
    }

    if (id == "state") {
      const code = getArrayObjByValue(stateList, event.target.value)?.code;

      obj["shippingAddress"]["stateCode"] = code;
    }

    obj["shippingAddress"][id] = event.target.value;

    if (mainState.isSameAddress) {
      setStateHelper(setMainState)({ shippingInfo: obj });
      setStateHelper(setMainState)({ billingAddress: obj.shippingAddress });
    } else {
      setStateHelper(setMainState)({ shippingInfo: obj });
    }
  };

  const setSameAddress = (event: any) => {
    const check = event.target.checked;
    setStateHelper(setMainState)({ isSameAddress: check });

    if (check) {
      setStateHelper(setMainState)({ billingAddress: { ...mainState.shipping.shippingAddress } });
    } else {
      setStateHelper(setMainState)({ billingAddress: { ...mainState.billingAddress } });
    }
  };

  const handleSetBillingAddressDetails = (event: any) => {
    let obj: any = mainState.billingAddress;
    let id = event.target.id;
    if (!id) {
      id = event.target.name;
    }

    if (id == "state") {
      const code = getArrayObjByValue(stateList, event.target.value)?.code;
      obj["stateCode"] = code;
    }

    obj[id] = event.target.value;
    setStateHelper(setMainState)({ billingAddress: obj });
  };

  const handleSetMember = (event: any) => {
    setStateHelper(setMainState)({ isMember: event.target.checked });
  };

  const handleSetIsPickUp = (event: any) => {
    setStateHelper(setMainState)({ isPickUpAtShop: event.target.checked, shopCode: ''});
  };

  const handleSetIsAdminCode = (event: any) => {
    let isPickupShop = mainState.isPickUpAtShop
    if(!event.target.checked) isPickupShop = true
    setStateHelper(setMainState)({ isAdminCode: event.target.checked, adminCode: '', isPickUpAtShop: isPickupShop});
  };

  const handleSetCountry = (event: any) => {
    let obj: any = mainState.shipping;
    obj.shippingAddress.country = event.target.value;
    setStateHelper(setMainState)({ shipping: obj });
  };

  const handleSetBillingCountry = (event: any) => {
    let obj: any = mainState.billingAddress;
    obj.country = event.target.value;
    setStateHelper(setMainState)({ billingAddress: obj });
  };

  const handleChangeDate = (e: any) => {
    const date = moment(e).format('MM-DD-YYYY');
    setStateHelper(setMainState)({birthday: e});
  }

  const handleCheckReferralName = async (code: string) => {
    const {data, success}:any = await handleGetReferralCodeName({
      referralCode: code,
      setMainState: setStateHelper(setMainState),
      changeContext: _handleChange,
      handleOpenSnackbar,
    });
    if (success) {
      setStateHelper(setMainState)({ referralName: data.name })
    }
  };

  const handleCheckShopName = async (code: string) => {
    const {data, success}:any = await handleGetShopCodeName({
      shopCode: code,
      setMainState: setStateHelper(setMainState),
      changeContext: _handleChange,
      handleOpenSnackbar,
    });
    if (success) {
      setStateHelper(setMainState)({ shopName: data.name })
    }
  };

  const breadcrumbArr = [
    {
      label: t('CART_TITLE'),
      path: isZh ? "/cn/order/cart" : "/order/cart",
    },
    {
      label:  t('CHECK_TITLE'),
    }
  ];

  return (
    <ContainerLayout>
      <SectionPdContainerLayout innerStyle={{ p: {xs: 2, md:8} }}>
        <Typography variant="h2" sx={{ color: (t) => t.palette.secondary.main, pb: 3, fontWeight: 500 }}>
          {t('CHECK_TITLE')}
        </Typography>
        <Box sx={{ pb: 4 }}>
          <CustomBreadcrumbs breadcrumbsArr={breadcrumbArr} />
        </Box>
        <Grid container spacing={5}>
          <Grid item xs={12} md={8} alignContent="flex-start">
            {!isLogin && (
              <Stack
                direction="row"
                alignItems="center"
                sx={{
                  backgroundColor: (t) => t.palette.background.default,
                  p: 1,
                  my: 1,
                  border: (t) => `1px solid ${t.palette.background.paper}`,
                }}
              >
                <Checkbox
                  checked={mainState.isMember}
                  disabled={!mainState.validJoinMember}
                  onChange={handleSetMember}
                  inputProps={{ "aria-label": "controlled" }}
                />
                <Typography
                  sx={{
                    color: (t) =>
                      mainState.validJoinMember ? t.palette.secondary.main : t.palette.gary.light,
                    fontSize: 20,
                  }}
                >
                  {t('CHECK_J_B')} -{" "}
                  {!mainState.validJoinMember ? (
                    <span style={{ fontSize: 16, color: "red" }}>
                      {t('CHECK_J_B_D', {memberMinPoint: mainState.memberMinPoint})}
                    </span>
                  ) : (
                    <span style={{ fontSize: 16 }}>
                      {t('CHECK_J_B_D_1')}
                       <b>RM {mainState.registerFee}</b> {t('CHECK_J_B_D_2')}
                      <Tooltip title={t('CHECK_J_B_D_3')}>
                        <IconButton sx={{ ml: '5px' }}>
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
                    </span>
                  )}
                </Typography>
              </Stack>
            )}

            {mainState.isMember && (
              <Stack sx={{ p: 3, pt: 2 }}>
                <Typography sx={{ color: (t) => t.palette.secondary.main, fontSize: 20, mb: 1 }}>
                  Account Details
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={6}>
                    <TextField
                        id={"icFirstName"}
                        sx={{ width: "100%" }}
                        label="First Name as IC"
                        variant="outlined"
                        value={mainState.icFirstName}
                        onChange={handleSetMainState}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                        id={"icLastName"}
                        sx={{ width: "100%" }}
                        label="Last Name as IC"
                        variant="outlined"
                        value={mainState.icLastName}
                        onChange={handleSetMainState}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id={"icNumber"}
                      sx={{ width: "100%" }}
                      label="IC Number"
                      variant="outlined"
                      value={mainState.icNumber}
                      onChange={handleSetMainState}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id={"phoneNumber"}
                      sx={{ width: "100%" }}
                      label="Phone No."
                      variant="outlined"
                      value={mainState.phoneNumber}
                      onChange={handleSetMainState}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id={"email"}
                      sx={{ width: "100%" }}
                      label="Email"
                      variant="outlined"
                      value={mainState.email}
                      onChange={handleSetMainState}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                      label={"Date Of Birth"}
                      maxDate={new Date()}
                      value={mainState.birthday}
                      onChange={handleChangeDate}
                      inputFormat='dd/MM/yyyy'
                      renderInput={(params) => (
                        <TextField
                          sx={{ width: "100%" }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          {...params}
                        />
                      )}
                    />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id={"username"}
                      sx={{ width: "100%" }}
                      label="Username"
                      variant="outlined"
                      value={mainState.username}
                      onChange={handleSetMainState}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id={"password"}
                      sx={{ width: "100%" }}
                      label="Password"
                      variant="outlined"
                      value={mainState.password}
                      onChange={handleSetMainState}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id={"confirmPassword"}
                      sx={{ width: "100%" }}
                      label="Confirm Password"
                      variant="outlined"
                      value={mainState.confirmPassword}
                      onChange={handleSetMainState}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Stack direction='row' spacing={2}>
                      <TextField
                        id={"referralCode"}
                        sx={{ width: "100%" }}
                        label="Referral Code (Optional)"
                        variant="outlined"
                        value={mainState.referralCode}
                        onChange={handleSetMainState}
                      />
                      <Button
                        sx={{
                          width: "200px",
                          // color: (t) => t.palette.secondary.light,
                          color: "white",
                          backgroundColor: (t) => t.palette.secondary.light,
                          px: 1,
                          borderRadius: 0,
                          "&:hover": {
                            backgroundColor: "#817563",
                          },
                        }}
                        onClick={() => handleCheckReferralName(mainState.referralCode)}
                      >
                        Apply
                      </Button>
                    </Stack>
                    {mainState.referralName && <Typography sx={{ fontSize: 16, mt: 1 }}>
                      Referrer Name: {mainState.referralName}
                    </Typography>}
                     <Typography sx={{ color: 'red', fontSize: 16, mt: 1 }}>
                      {"Noted: Please contact shop owner to get the Referral code for get your Welcome Voucher."}
                    </Typography>
                  </Grid>
                </Grid>
              </Stack>
            )}

            <Stack
              direction="row"
              alignItems="center"
              sx={{
                backgroundColor: (t) => t.palette.background.default,
                p: 1,
                my: 1,
                border: (t) => `1px solid ${t.palette.background.paper}`,
              }}
            >
              <Checkbox checked={true} />
              <Typography sx={{ color: (t) => t.palette.secondary.main, fontSize: 20 }}>
                {t('CHECK_S_B')}
              </Typography>
            </Stack>
            <Stack sx={{ p: 3, pt: 2 }}>
              <Typography sx={{ color: (t) => t.palette.secondary.main, fontSize: 20, mb: 1 }}>
              Recipient Info
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <TextField
                    id={"firstName"}
                    sx={{ width: "100%" }}
                    label="First Name"
                    variant="outlined"
                    value={mainState.shipping.shippingInfo.firstName}
                    onChange={handleSetShippingInfoDetails}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id={"lastName"}
                    sx={{ width: "100%" }}
                    label="Last Name"
                    variant="outlined"
                    value={mainState.shipping.shippingInfo.lastName}
                    onChange={handleSetShippingInfoDetails}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id={"email"}
                    sx={{ width: "100%" }}
                    label="Email"
                    variant="outlined"
                    value={mainState.shipping.shippingInfo.email}
                    onChange={handleSetShippingInfoDetails}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id={"phoneNumber"}
                    sx={{ width: "100%" }}
                    label="Phone"
                    variant="outlined"
                    value={mainState.shipping.shippingInfo.phoneNumber}
                    onChange={handleSetShippingInfoDetails}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id={"remarks"}
                    sx={{ width: "100%" }}
                    multiline
                    rows={2}
                    placeholder="Remark"
                    value={mainState.remarks}
                    onChange={handleSetMainState}
                  />
                </Grid>
              </Grid>
              {mainState.isAdminCode && <Stack direction="row" alignItems="center" sx={{ mb: -1, ml: -2, mt: 2 }}>
                <Checkbox
                  checked={mainState.isPickUpAtShop}
                  onChange={handleSetIsPickUp}
                  inputProps={{ "aria-label": "controlled" }}
                />
                <Stack sx={{mb: "-10px"}}>
                <Typography sx={{ color: (t) => t.palette.secondary.main, fontSize: 20, mb: "-4px", width: 170 }}>
                  Pickup in Shop
                </Typography>
                <Typography sx={{ color: 'red', fontSize: 16 }}>
                  {"Noted: Please contact shop owner to get Shopcode for free shipping within Malaysia."}
                </Typography>
                </Stack>

              </Stack>}

              <Stack>
                <Typography sx={{ color: (t) => t.palette.secondary.main, fontSize: 20, mb: 1, mt: 2 }}>
                  {mainState.isPickUpAtShop ? "Enter the Shop Code" : "Shipping Address"}
                </Typography>

              </Stack>

              {mainState.isPickUpAtShop ? (
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Stack direction='row' spacing={2}>
                      <TextField
                        id={"shopCode"}
                        sx={{ width: "100%" }}
                        label="Shop Code"
                        variant="outlined"
                        value={mainState.shopCode}
                        onChange={handleSetMainState}
                      />
                      <Button
                        sx={{
                          width: "200px",
                          // color: (t) => t.palette.secondary.light,
                          color: "white",
                          backgroundColor: (t) => t.palette.secondary.light,
                          px: 1,
                          borderRadius: 0,
                          "&:hover": {
                            backgroundColor: "#817563",
                          },
                        }}
                        onClick={() => handleCheckShopName(mainState.shopCode)}
                      >
                        Apply
                      </Button>
                    </Stack>
                    <Typography sx={{ color:'red', fontSize: 16 }}>
                      {"*If you do not have a shop code, please contact us via WhatsApp at +6019-223 1463."}
                    </Typography>
                    {mainState.shopName && <Typography sx={{ fontSize: 16, mt: 1 }}>
                      Shop Name: {mainState.shopName}
                    </Typography>}
                  </Grid>
                </Grid>
              ) : (
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      id={"address1"}
                      sx={{ width: "100%" }}
                      label="Address"
                      variant="outlined"
                      value={mainState.shipping.shippingAddress.address1}
                      onChange={handleSetShippingAddressDetails}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id={"city"}
                      sx={{ width: "100%" }}
                      label="City"
                      variant="outlined"
                      value={mainState.shipping.shippingAddress.city}
                      onChange={handleSetShippingAddressDetails}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      sx={{ width: "100%" }}
                      select
                      label="Country"
                      value={
                        getArrayObjByValue(CountryList, mainState.shipping.shippingAddress.country).value
                      }
                      onChange={(e) => {
                        handleGetStateList(true, e.target.value);
                        handleSetCountry(e)
                      }}
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
                      value={mainState.shipping.shippingAddress.postalCode}
                      onChange={handleSetShippingAddressDetails}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      sx={{ width: "100%" }}
                      select
                      name={"state"}
                      label="State"
                      value={getArrayObjByValue(stateList, mainState.shipping.shippingAddress.state).value}
                      onChange={handleSetShippingAddressDetails}
                    >
                      {stateList.map((option: any) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
              )}

              <Stack direction="row" alignItems="center">
                <Stack direction="row" alignItems="center">
                  <Typography sx={{ color: (t) => t.palette.secondary.main, fontSize: 20, mb: 1, mt: 2 }}>
                    Billing Address (
                  </Typography>
                  <Typography sx={{ color: "red", fontSize: 20, mb: 1, mt: 2 }}>
                  Optional
                  </Typography>
                  <Typography sx={{ color: (t) => t.palette.secondary.main, fontSize: 20, mb: 1, mt: 2 }}>
                  )
                  </Typography>
                </Stack>
                {!mainState.isPickUpAtShop && (
                  <Stack direction="row" alignItems="center" sx={{ mb: -1, ml: 1 }}>
                    <Checkbox
                      sx={{ transform: "scale(0.7)", p: 0 }}
                      checked={mainState.isSameAddress}
                      onChange={setSameAddress}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                    <Typography sx={{ color: (t) => t.palette.secondary.main, fontSize: 14, mb: "-4px" }}>
                      Same as Shipping Address
                    </Typography>
                  </Stack>
                )}
              </Stack>
              {
                !mainState.isSameAddress ?

              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    id={"address1"}
                    disabled={mainState.isSameAddress}
                    sx={{ width: "100%" }}
                    label="Address"
                    variant="outlined"
                    value={mainState.billingAddress.address1}
                    onChange={handleSetBillingAddressDetails}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id={"city"}
                    disabled={mainState.isSameAddress}
                    sx={{ width: "100%" }}
                    label="City"
                    variant="outlined"
                    value={mainState.billingAddress.city}
                    onChange={handleSetBillingAddressDetails}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    sx={{ width: "100%" }}
                    disabled={mainState.isSameAddress}
                    select
                    label="Country"
                    value={getArrayObjByValue(CountryList, mainState.billingAddress.country).value}
                    onChange={(e) => {
                      handleGetBillingStateList(true, e.target.value);
                      handleSetBillingCountry(e);
                    }}
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
                    disabled={mainState.isSameAddress}
                    sx={{ width: "100%" }}
                    label="Postcode"
                    variant="outlined"
                    value={mainState.billingAddress.postalCode}
                    onChange={handleSetBillingAddressDetails}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    sx={{ width: "100%" }}
                    disabled={mainState.isSameAddress}
                    select
                    name={"state"}
                    label="State"
                    value={getArrayObjByValue(stateBillingList, mainState.billingAddress.state).value}
                    onChange={handleSetBillingAddressDetails}
                  >
                    {stateBillingList.map((option: any) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
              : (
                <Grid item xs={12}>
                  <Typography sx={{ fontSize: 18, mt: 2, textAlign: 'center' }}>
                    {"Same As Shipping Address"}
                  </Typography>
                </Grid>
              )}

              <Stack direction="row" alignItems="center" sx={{ mb: -1, ml: -2, mt: 2 }}>
                <Checkbox
                    checked={mainState.isAdminCode}
                    onChange={handleSetIsAdminCode}
                    inputProps={{ "aria-label": "controlled" }}
                />
                <Typography sx={{ color: (t) => t.palette.secondary.main, fontSize: 20, mb: "-4px" }}>
                  Office Use
                </Typography>
              </Stack>

              {mainState.isAdminCode && (
                  <Grid container spacing={1} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                      <TextField
                          id={"adminCode"}
                          sx={{ width: "100%" }}
                          label="Admin Code"
                          variant="outlined"
                          value={mainState.adminCode}
                          onChange={handleSetMainState}
                      />
                    </Grid>
                  </Grid>
              )}

            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <OrderSummery
              step={"2"}
              isUseCoin={mainState.isUseCoin}
              coins={mainState.coins}
              registerFee={mainState.registerFee}
              voucher={mainState.voucher}
              unit={mainState.unit}
              subTotal={mainState.subTotal}
              shippingFee={mainState.shippingFee}
              total={mainState.total}
              pvPoint={mainState.pvPoint}
              isMember={mainState.isMember}
              handleClick={handleCheckIsAdminCheckout}
            />
          </Grid>
        </Grid>

        <AlertReferralModal
            ref={alertRef}
            handleConfirm={handleCheckout}
        />

        <CheckCurrentMemberModal
            ref={checkMemberRef}
            handleConfirm={handleCheckout}
        />

        <UploadModal
            ref={uploadRef}
            handleConfirm={handleCheckout}
        />
      </SectionPdContainerLayout>
    </ContainerLayout>
  );
};

export default Checkout;

export const getServerSideProps = ({ locale, locales }) => {
  return {
    props: {
      messages: {
        ...require(`../../messages/${locale}.json`),
      },
    },
  };
};
