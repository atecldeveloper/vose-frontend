import {
  Box,
  Grid,
  Typography,
  TextField,
  Paper,
  Stack,
  Divider,
  Button,
} from "@mui/material";
import * as React from "react";
import ApplyInputButton from "../../components/ApplyInputButton";
import CartTable from "../../components/CartTable";
import ContainerLayout from "../../components/ContainerLayout";
import SectionPdContainerLayout from "../../components/SectionPdContainerLayout";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useRouter } from "next/router";
import OrderSummery from "../../components/OrderSummary";
import { useProps } from "../../src/context/state";
import {
  GetProductListCheckoutDetailsAPIProps,
  handleGetProductListCheckoutDetails,
} from "../../src/controller/product";
import { useSnackbarContext } from "../../src/context/snackbar";
import { setStateHelper } from "../../utils";
import {
  AddCartProps,
  DeleteCartProps,
  handleAddCart,
  handleDeleteCart,
} from "../../src/controller/order";
import { useTranslations } from "next-intl";

const ShoppingCart = ({ isBackFromCheckout }: any) => {
  const { localCart, isLogin, isUseCoin, _handleChange } = useProps();
  const t = useTranslations("Cart");
  const tb = useTranslations("Button");
  const history = useRouter();
  const { handleOpenSnackbar } = useSnackbarContext();
  const counterRef = React.useRef<any>();
  const [mainState, setMainState] = React.useState({
    dateList: [],
    unit: "RM",
    subTotal: 0,
    shippingFee: 0,
    isUseCoin: true,
    coins: {
      available: 0,
      value: 0,
    },
    total: 0,
    voucherCode: "",
    voucher: {},
  });

  React.useEffect(() => {
    if (history.isReady) {
      handleGetProductList();
    }
  }, [JSON.stringify(localCart), history.isReady, mainState.isUseCoin]);

  React.useEffect(() => {
    if (history.isReady) {
      if (isBackFromCheckout) {
        setStateHelper(setMainState)({ isUseCoin });
      } else {
        _handleChange({ isUseCoin: true });
      }
    }
  }, [history.isReady]);

  const handleGetProductList = () => {
    const body: GetProductListCheckoutDetailsAPIProps = {
      localProductList: localCart,
      voucherCode: mainState.voucherCode,
      useCoin: mainState.isUseCoin,
      setMainState: setStateHelper(setMainState),
      changeContext: _handleChange,
      handleOpenSnackbar,
    };
    handleGetProductListCheckoutDetails(body).then((dataLength) => {
      if (dataLength === 0) setStateHelper(setMainState)({ isUseCoin: false });
      counterRef.current = new Array(dataLength)
        .fill(null)
        .map(() => React.createRef());
    });
  };

  const handleGetProductListwithVoucherCode = (voucherCode) => {
    const body: GetProductListCheckoutDetailsAPIProps = {
      localProductList: localCart,
      voucherCode: voucherCode,
      useCoin: mainState.isUseCoin,
      setMainState: setStateHelper(setMainState),
      changeContext: _handleChange,
      handleOpenSnackbar,
    };
    handleGetProductListCheckoutDetails(body).then((dataLength) => {
      if (dataLength === 0) setStateHelper(setMainState)({ isUseCoin: false });
      counterRef.current = new Array(dataLength)
        .fill(null)
        .map(() => React.createRef());
    });
  };

  const handleEditProduct = (
    productID: string,
    quantity: number,
    id: number,
    stock: number
  ) => {
    if (quantity == 0) {
      const params: DeleteCartProps = {
        isLogin,
        localCart,
        id: productID,
        changeContext: _handleChange,
        handleOpenSnackbar,
      };
      handleDeleteCart(params);
    } else {
      const params: AddCartProps = {
        isLogin,
        localCart,
        id: parseInt(productID),
        productUnit: quantity,
        onCartPage: true,
        stock: stock,
        changeContext: _handleChange,
        handleOpenSnackbar,
      };

      handleAddCart(params).then((stock: any) => {
        if (stock) {
          console.log(counterRef.current[id]);
          counterRef.current[id].setText(stock);
        }
      });
    }
  };

  const handleApplyCoin = (e: any) => {
    setStateHelper(setMainState)({ isUseCoin: e.target.checked });
    _handleChange({ isUseCoin: e.target.checked });
  };

  const handleRemoveVoucher = () => {
    setStateHelper(setMainState)({ voucherCode: "", voucher: {} });
    _handleChange({ voucherCode: "" });
  };

  const handleApplyCode = (voucherCode: string) => {
    setStateHelper(setMainState)({ voucherCode: voucherCode });
    _handleChange({ voucherCode: voucherCode });
    handleGetProductListwithVoucherCode(voucherCode);
  };

  return (
    <ContainerLayout>
      {/* <img
        src="/assets/homepage/promotion-image.png"
        style={{ objectFit: "contain", width: "100%" }}
      /> */}
      <SectionPdContainerLayout innerStyle={{ pb: 8 }}>
        <Typography
          variant="h2"
          sx={{
            color: (t) => t.palette.secondary.main,
            py: 8,
            fontWeight: 500,
          }}
        >
          {t("CART_TITLE")}
        </Typography>
        <Grid container spacing={5}>
          <Grid item xs={12} md={8} alignContent="flex-start">
            <Stack>
              <CartTable
                counterRef={counterRef}
                dataList={mainState.dateList}
                handleEditProduct={handleEditProduct}
              />
              <Stack
                direction="row"
                alignItems="flex-end"
                justifyContent="space-between"
              >
                <Button
                  variant="text"
                  sx={{
                    width: 200,
                    alignItems: "center",
                    color: (t) => t.palette.secondary.main,
                    textTransform: "unset",
                    px: "0px ",
                  }}
                  startIcon={
                    <ArrowBackIosNewIcon
                      sx={{ fontSize: "16px !important", mt: "-3px" }}
                    />
                  }
                  onClick={() => {
                    history.push("/product");
                  }}
                >
                  {tb("CON_SHOP")}
                </Button>
                <Box sx={{ width: "300px", mt: 1 }}>
                  {/*{*/}
                  {/*  isLogin &&*/}
                  <ApplyInputButton handleClick={handleApplyCode} />
                  {/*}*/}
                </Box>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <OrderSummery
              step={"1"}
              unit={mainState.unit}
              subTotal={mainState.subTotal}
              shippingFee={mainState.shippingFee}
              total={mainState.total}
              voucher={mainState.voucher}
              registerFee={0}
              isUseCoin={
                mainState.dateList.length == 0 ? false : mainState.isUseCoin
              }
              coins={mainState.coins}
              handleRemoveVoucher={handleRemoveVoucher}
              handleApply={handleApplyCoin}
              handleClick={(path: string) => {
                history.push({
                  pathname: path,
                  query: { code: mainState.voucherCode },
                });
              }}
              disabled={mainState.dateList.length == 0}
            />

            <Box sx={{ px: 2, py: 4 }}>
              <Typography
                sx={{ color: (t) => t.palette.secondary.main, fontSize: 16 }}
              >
                {t("CART_PAY")}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={2}>
                <img width={50} src="/assets/payment/visa.png" />
                <img width={30} src="/assets/payment/master.png" />
                <img width={50} src="/assets/payment/fbx.png" />
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </SectionPdContainerLayout>
    </ContainerLayout>
  );
};

export default ShoppingCart;

export const getServerSideProps = ({ locale, locales, req }) => {
  const isBackFromCheckout = req.headers.referer?.includes("/order/checkout");
  return {
    props: {
      messages: {
        ...require(`../../messages/${locale}.json`),
      },
      isBackFromCheckout,
    },
  };
};
