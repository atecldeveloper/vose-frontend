import {Box, Grid, Divider, Typography, Paper, Stack, Button, IconButton} from "@mui/material";
import * as React from "react";
import PanelContainerLayout from "../../../components/PanelContainerLayout";
import { addressCombine, getArrayObjByLabel, getArrayObjByValue, setStateHelper } from "../../../utils";
import { useProps } from "../../../src/context/state";
import { useSnackbarContext } from "../../../src/context/snackbar";
import { CheckOrderDetailsByIdAPIProps, handleCheckOrderDetailsByIdAPI } from "../../../src/controller/order";
import CustomBreadcrumbs from "../../../components/CustomBreadcrumbs";
import { useRouter } from "next/router";
import CartTable from "../../../components/CartTable";
import { STATIC_VARIABLE } from "../../../src/constants/staticData";
import TooltipIcon from "../../../components/TooltipIcon";
import { useTranslations } from "use-intl";



const generateDirectCourier = (link: string, trackingID: string) => {
  let newDirectLink = link

  switch (link) {
    case 'track.logistika.com.my':
      newDirectLink = `https://${link}`
      break;
    case 'www.fmx.asia':
      newDirectLink = `https://www.fmx.asia/result_detail.php?p=1&conno=${trackingID}`
      break;
    case 'www.aramex.com/us/en/track/shipments':
      newDirectLink = `https://www.aramex.com/us/en/track/results?mode=0&ShipmentNumber=${trackingID}`
      break;
  }

  return newDirectLink
}

const OrderDetails = () => {
  const t: any = useTranslations('MYOrderDetails');
  const { _handleChange } = useProps();
  const { handleOpenSnackbar } = useSnackbarContext();
  const router = useRouter();
  const { id }: any = router.query;
  const [stateList, setStateList] = React.useState([]);
  const [mainState, setMainState] = React.useState({
    createDate: "01-12-1995",
    productList: [],
    subTotal: 0,
    shippingFee: 0,
    voucher: {
      title: "",
      code: "",
      discount: 0,
    },
    coinValue: 0,
    orderStatus: 1,
    total: 0,
    receiveCoin: 0,
    receivePVPoint: 0,
    registerFee: false,
    remarks: "",
    courier: '',
    trackingID: '',
    shipping: {
      shippingInfo: {
        firstname: "",
        lastname: "",
        phoneNumber: "",
        email: "",
      },
      shippingAddress: {
        address1: "",
        address2: "",
        postalCode: "",
        city: "",
        state: "",
        country: "",
      },
    },
    billingAddress: {
      address1: "123123",
      address2: "123",
      postalCode: " 123123",
      city: "kuali",
      state: "Johor",
      country: "Malayisa",
    },
  });

  const breadcrumbArr = [
    {
      label: t("ORDER_LIST"),
      path: "/panel/order",
    },
    {
      label: t("ORDER_DETAILS"),
    },
  ];

  React.useEffect(() => {
    if (router.isReady) {
      handleCheckoutDetails();
    }
  }, [router.isReady]);

  const handleCheckoutDetails = () => {
    const body: CheckOrderDetailsByIdAPIProps = {
      orderID: id,
      setMainState: setStateHelper(setMainState),
      changeContext: _handleChange,
      handleOpenSnackbar,
    };

    handleCheckOrderDetailsByIdAPI(body);
  };


  return (
    <PanelContainerLayout>
      <Typography
        variant="h2"
        sx={{ color: (t) => t.palette.secondary.main, mb: 3, fontSize: 32, fontWeight: 500 }}
      >
        {t('TITLE')} <span style={{fontSize: 18, fontWeight: 'bold'}}>[{id}]</span>
      </Typography>
      <Box sx={{ pb: 4 }}>
        <CustomBreadcrumbs breadcrumbsArr={breadcrumbArr} />
      </Box>
      <Typography sx={{ color: (t) => t.palette.secondary.light, fontSize: 24 }}> {t('ORDER_STATUS')}</Typography>
      <Divider sx={{ mb: 4 }} />
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Typography sx={{ color: (t) => t.palette.secondary.main, fontSize: 20, mb: 1 }}>
            {t('C_STATUS')}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: getArrayObjByValue(STATIC_VARIABLE.orderStatusArray, mainState.orderStatus).color,
              fontSize: 16,
              mb: 1,
              fontWeight: "bold",
            }}
          >
            {getArrayObjByValue(STATIC_VARIABLE.orderStatusArray, mainState.orderStatus).label}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ color: (t) => t.palette.secondary.main, fontSize: 20, mb: 1 }}>
            {t('ORDER_TRACK')}
          </Typography>
          <Typography variant="body2" sx={{ color: (t) => t.palette.gary.light, fontSize: 16, mb: 0 }}>
            {t('TRACKING_NO')}:
            {mainState.trackingID ?
              <a href={generateDirectCourier(mainState.courier, mainState.trackingID)} target="_blank" style={{ marginLeft: 5 }}>
                {/*{mainState.courier}*/}
                {mainState.trackingID}
              </a>
                :
                <span> -</span>
            }
          </Typography>
        </Grid>
      </Grid>

      <Typography sx={{ color: (t) => t.palette.secondary.light, mt: 2, mb: 2, fontSize: 24 }}>
        {t('ORDER_INFO')}
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Typography sx={{ color: (t) => t.palette.secondary.main, fontSize: 20, mb: 1 }}>
            {t('RECIPIENT_INFO')}
          </Typography>
          <Typography variant="body2" sx={{ color: (t) => t.palette.gary.light, fontSize: 16, mb: 1 }}>
            {t('NAME')}: {mainState.shipping.shippingInfo.firstname} {mainState.shipping.shippingInfo.lastname}
          </Typography>
          <Typography variant="body2" sx={{ color: (t) => t.palette.gary.light, fontSize: 16, mb: 1 }}>
            {t('PHONE')}: {mainState.shipping.shippingInfo.phoneNumber}
          </Typography>
          <Typography variant="body2" sx={{ color: (t) => t.palette.gary.light, fontSize: 16, mb: 1 }}>
            {t('EMAIL')}: {mainState.shipping.shippingInfo.email}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ color: (t) => t.palette.secondary.main, fontSize: 20, mb: 1 }}>
            {t('SHIPPING_ADDRESS')}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: (t) => t.palette.gary.light, fontSize: 16, mb: 1, whiteSpace: "pre-line" }}
          >
            {addressCombine(mainState.shipping.shippingAddress)}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ color: (t) => t.palette.secondary.main, fontSize: 20, mb: 1 }}>
            {t('BILLING_ADDRESS')}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: (t) => t.palette.gary.light, fontSize: 16, mb: 1, whiteSpace: "pre-line" }}
          >
            {addressCombine(mainState.billingAddress)}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ color: (t) => t.palette.secondary.main, fontSize: 20, mb: 1 }}>
            {t('REMARK')}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: (t) => t.palette.gary.light, fontSize: 16, mb: 1, whiteSpace: "pre-line" }}
          >
            {mainState.remarks}
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ mb: 1, mt: 5 }} />
      <CartTable
        shippingFee={mainState.shippingFee}
        voucher={mainState.voucher}
        coinValue={mainState.coinValue}
        isMemberFee={mainState.registerFee}
        total={mainState.total}
        subTotal={mainState.subTotal}
        isReview
        dataList={mainState.productList}
        handleEditProduct={() => {}}
      />
      <Box sx={{ m: 5 }} />

      <Typography sx={{ color: (t) => t.palette.secondary.light, mt: 2, mb: 2, fontSize: 24 }}>
        {t('REWARD_INFO')}
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Grid container spacing={9}>
        <Grid item xs={6}>
          <Paper elevation={3} sx={{ backgroundColor: (t) => t.palette.background.default, p: 2 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography sx={{ color: (t) => t.palette.secondary.main, fontSize: 20, fontWeight: "bold", pl: 2}}>
                {t('SHOPPING_D')}
              </Typography>
              {/* <TooltipIcon text={
                <div>
                  <Typography sx={{fontSize: 14,fontWeight: 'bold'}}>🌟 10 Shopping Dollar = RM 1</Typography>
                  <Typography sx={{fontSize: 14}}>Use Shopping Dollar in next purchase to get discount</Typography>
                </div>
              }/> */}
            </Stack>
            <Typography sx={{ color: (t) => t.palette.gary.light, fontSize: 20, textAlign: "center", py: 3 }}>
              {mainState.receiveCoin} Coins
            </Typography>
          </Paper>
        </Grid>

        {/* <Grid item xs={6}>
          <Paper elevation={3} sx={{ backgroundColor: (t) => t.palette.background.default, p: 2 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography sx={{ color: (t) => t.palette.secondary.main, fontSize: 20, fontWeight: "bold", pl: 1 }}>
                PV Point
              </Typography>
              <TooltipIcon text={
                <div>
                  <Typography sx={{fontSize: 14,fontWeight: 'bold'}}>🌟 1 PV Point = RM 1</Typography>
                  <Typography sx={{fontSize: 14}}>PV Point will automatically claim every end of the month</Typography>
                </div>
              }/>
            </Stack>
            <Typography sx={{ color: (t) => t.palette.gary.light, fontSize: 20, textAlign: "center", py: 3 }}>
              {mainState.receivePVPoint} Point
            </Typography>
          </Paper>
        </Grid> */}
      </Grid>
    </PanelContainerLayout>
  );
};

export default OrderDetails;

export const getServerSideProps = ({ locale, locales }) => {
  return {
    props: {
      messages: {
        ...require(`../../../messages/${locale}.json`),
      },
    },
  };
};
