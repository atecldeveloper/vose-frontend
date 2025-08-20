import { Divider, Paper, Box, Typography, Grid, Button, Stack } from "@mui/material";
import * as React from "react";
import ContainerLayout from "../../components/ContainerLayout";
import SectionPdContainerLayout from "../../components/SectionPdContainerLayout";
import moment from "moment";
import {
  CheckOrderDetailsByPaymentIdAPIProps,
  handleCheckOrderDetailsByPaymentIdAPI
} from "../../src/controller/order";
import { useRouter } from "next/router";
import { useProps } from "../../src/context/state";
import { setPriceFormat, getArrayObjByLabel, setStateHelper } from "../../utils";
import { useSnackbarContext } from "../../src/context/snackbar";
import {useTranslations} from "next-intl";
import { shopStatusArray } from "../../src/constants";

const Summary = () => {
  const router = useRouter()
  const { id, adminOrderID }: any = router.query
  const { _handleChange, _handleCleanCartContext, account, isLogin } = useProps();
  const { handleOpenSnackbar } = useSnackbarContext();
  const t: any = useTranslations("Order");
  const to: any = useTranslations("Cart");
  const tb: any = useTranslations("Button");

  const [mainState, setMainState] = React.useState({
    id: '',
    adminOrderID: '',
    createDate: "01-12-1995",
    productList: [],
    subTotal: 0,
    shippingFee: 0,
    coinValue: 0,
    voucher: {
      discount: 0
    },
    total: 0,
    method: "BillPlz",
    isMemberFee: false,
    registerFee: 0,
  });

  React.useEffect(() => {
    if (router.isReady) {
      _handleCleanCartContext();
      handleCheckoutDetails();
      setShopToCompleted();
    }


  },[router.isReady]);


  const setShopToCompleted = () => {
    if (account.isShop) {
      let _account = {
        ...account,
        shopStatus: getArrayObjByLabel(shopStatusArray, 'Processing').value
      }
      _handleChange({account: _account})
    }
  }

  const handleCheckoutDetails = () => {
    const body: CheckOrderDetailsByPaymentIdAPIProps = {
      paymentID: id,
      orderID: adminOrderID,
      setMainState: setStateHelper(setMainState),
      changeContext: _handleChange,
      handleOpenSnackbar,
    }
    handleCheckOrderDetailsByPaymentIdAPI(body)
  }


  const handleGoBackHome = () => {
    if (isLogin) {
      if (account.isShop) {
        setShopToCompleted();
        // router.push('/panel/dashboard')
      }
      // else {
        router.push('/panel/dashboard')
      // }
    }
    else {
      router.push('/')
    }
  }

  return (
    <ContainerLayout>
      <SectionPdContainerLayout innerStyle={{ p: {xs: 2, md: 8} }}>
        <Typography variant="h2" sx={{ color: (t) => t.palette.secondary.main, pb: 3 }}>
          {t('ORDER_RECEIVE')}
        </Typography>
        <Typography sx={{ color: (t) => t.palette.secondary.main, pb: 3 }}>
          {t('ORDER_RECEIVE_NOTE')}
        </Typography>
        <Paper sx={{ p: 2 }} elevation={3}>
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ color: (t) => t.palette.gary.light, fontSize: 16, mb: 1 }}>
              {t('ORDER_NUM')}:
            </Typography>
            <Typography sx={{ color: (t) => t.palette.secondary.main, fontWeight: "bold", mb: 2 }}>
              {mainState.id}
            </Typography>
            <Divider />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ color: (t) => t.palette.gary.light, fontSize: 16, mb: 1 }}>{t('ORDER_DATE')}:</Typography>
            <Typography sx={{ color: (t) => t.palette.secondary.main, fontWeight: "bold", mb: 2 }}>
              {moment(mainState.createDate).format("MMM DD, yyyy")}
            </Typography>
            <Divider />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ color: (t) => t.palette.gary.light, fontSize: 16, mb: 1 }}>{t('ORDER_TOTAL')}:</Typography>
            <Typography sx={{ color: (t) => t.palette.secondary.main, fontWeight: "bold", mb: 2 }}>
              RM {setPriceFormat(mainState.total)}
            </Typography>
            <Divider />
          </Box>
          {/* <Box sx={{ mb: 2 }}>
            <Typography sx={{ color: (t) => t.palette.gary.light, fontSize: 16, mb: 1 }}>
              {t('ORDER_PAYMENT')}:
            </Typography>
            <Typography sx={{ color: (t) => t.palette.secondary.main, fontWeight: "bold", mb: 2 }}>
              {mainState.method}
            </Typography>
          </Box> */}
        </Paper>

        <Typography variant="h2" sx={{ color: (t) => t.palette.secondary.main, pt: 4, pb: 3 }}>
          {t('ORDER_SUMMARY')}
        </Typography>
        <Paper sx={{p: 2}} elevation={3}>
          <Grid container >
            <Grid container sx={{my: 3}}>
              <Grid item xs={6}>
                <Typography sx={{ color: (t) => t.palette.secondary.main, fontWeight: "bold", fontSize: 20, mb: 1 }}>
                  {t('ORDER_PRODUCT')}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ color: (t) => t.palette.secondary.main, fontWeight: "bold", textAlign: 'center', fontSize: 20, mb: 1 }}>
                  {t('ORDER_TOTAL')}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider />
              </Grid>

            <Grid container sx={{my: 3}}>
              {
                mainState.productList.map((e: any) => {
                  let price = e.discountPrice ? e.discountPrice : e.price;
                  return <>
                   <Grid item xs={6}>
                      <Typography sx={{ color: (t) => t.palette.gary.light, fontWeight: "bold", mb: 1 }}>
                        {e.title} <Typography variant="normal" sx={{ color: (t) => t.palette.secondary.main}}>x {e.quantity}</Typography>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ color: (t) => t.palette.secondary.main, textAlign: 'center', mb: 1 }}>
                        RM {e.isBundle || e.discountAmount > 0 ? setPriceFormat(e.discountAmount) : setPriceFormat(e.quantity * price)}
                      </Typography>
                    </Grid>
                  </>
                })
              }
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid container sx={{my: 2}}>
              <Grid item xs={6}>
                <Typography sx={{ color: (t) => t.palette.secondary.main, fontWeight: "bold", mb: 1 }}>
                  {to('CART_S_SUB')}:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ color: (t) => t.palette.secondary.main, textAlign: 'center', mb: 1 }}>
                  RM {setPriceFormat(mainState.subTotal)}
                </Typography>
              </Grid>
            </Grid>
            {
              mainState.isMemberFee &&
              <Grid container sx={{my: 2}}>
                <Grid item xs={6}>
                  <Typography sx={{ color: (t) => t.palette.secondary.main, fontWeight: "bold", mb: 1 }}>
                    {to('CART_S_REG_F')}:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ color: (t) => t.palette.secondary.main, textAlign: 'center', mb: 1 }}>
                    RM {mainState.registerFee}
                  </Typography>
                </Grid>
              </Grid>
            }
            <Grid container sx={{my: 2}}>
              <Grid item xs={6}>
                <Typography sx={{ color: (t) => t.palette.secondary.main, fontWeight: "bold", mb: 1 }}>
                  {to('CART_S_SHP_F')}:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ color: (t) => t.palette.secondary.main, textAlign: 'center', mb: 1 }}>
                  RM {setPriceFormat(mainState.shippingFee)}
                </Typography>
              </Grid>
            </Grid>
            <Grid container sx={{my: 2}}>
              <Grid item xs={6}>
                <Typography sx={{ color: (t) => t.palette.secondary.main, fontWeight: "bold", mb: 1 }}>
                  {to('CART_S_C')}:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ color: (t) => t.palette.secondary.main, textAlign: 'center', mb: 1 }}>
                  - ( RM {mainState.coinValue? setPriceFormat(mainState.coinValue) : '0.00'} )
                </Typography>
              </Grid>
            </Grid>
            <Grid container sx={{my: 2}}>
              <Grid item xs={6}>
                <Typography sx={{ color: (t) => t.palette.secondary.main, fontWeight: "bold", mb: 1 }}>
                  {to('CART_S_V_D')}:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ color: (t) => t.palette.secondary.main, textAlign: 'center', mb: 1 }}>
                 - ( RM {setPriceFormat(mainState.voucher.discount)} )
                </Typography>
              </Grid>
            </Grid>
            <Grid container sx={{my: 2}}>
              <Grid item xs={6}>
                <Typography sx={{ color: (t) => t.palette.secondary.main, fontWeight: "bold", mb: 1 }}>
                  {to('CART_S_T')}:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ color: (t) => t.palette.secondary.main, textAlign: 'center', fontWeight: 'bold',mb: 1 }}>
                  RM {setPriceFormat(mainState.total)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <Stack sx={{mt: 5, mb: 5}} alignItems={'center'}>
          <Button variant='contained' sx={{ width: '35%', mt: 2}} onClick={handleGoBackHome}>
            {tb('BACK_HOME')}
          </Button>
        </Stack>

      </SectionPdContainerLayout>
    </ContainerLayout>
  );
};

export default Summary;


export const getServerSideProps = ({ locale, locales }) => {
  return {
    props: {
      messages: {
        ...require(`../../messages/${locale}.json`),
      },
    },
  };
};
