import { Box, Grid, Divider, Typography, Stack, Button } from "@mui/material";
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
import { handleUpdateShopStatusAPI, UpdateShopStatusAPIProps } from "../../../src/controller/shop";
import DeleteModal from "../../../components/modal/DeleteModal";

const breadcrumbArr = [
  {
    label: "Shop Order List",
    path: "/shop-panel/order",
  },
  {
    label: "Shop Order Details",
  },
];

const ShopOrderDetails = () => {
  const { _handleChange } = useProps();
  const { handleOpenSnackbar } = useSnackbarContext();
  const router = useRouter();
  const { id }: any = router.query;

  const modalRef = React.useRef<any>();
  const [mainState, setMainState] = React.useState({
    createDate: "01-12-1995",
    productList: [],
    subTotal: 0,
    shippingFee: 0,
    voucher: {},
    orderStatus: 1,
    coinValue: 0,
    total: 0,
    registerFee: false,
    remarks: "",
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
      address1: "",
      address2: "",
      postalCode: " ",
      city: "",
      state: "",
      country: "",
    },
  });
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

  const handleUpdateOrderStatus = (status: number) => {
    const body: UpdateShopStatusAPIProps = {
      orderID: id,
      status: status,
      setMainState: setStateHelper(setMainState),
      changeContext: _handleChange,
      handleOpenSnackbar,
    };

    handleUpdateShopStatusAPI(body).then((isSuccess) => {
      modalRef.current.handleClose();
    });
  };

  return (
    <PanelContainerLayout isShop>
      <Typography
        variant="h2"
        sx={{ color: (t) => t.palette.secondary.main, mb: 3, fontSize: 32, fontWeight: 500 }}
      >
        Shop Order Details
      </Typography>
      <Box sx={{ pb: 4 }}>
        <CustomBreadcrumbs breadcrumbsArr={breadcrumbArr} />
      </Box>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ mt: 2, mb: 2 }}>
        <Typography sx={{ color: (t) => t.palette.secondary.light, fontSize: 24 }}>ORDER STATUS</Typography>
        {mainState.orderStatus < getArrayObjByLabel(STATIC_VARIABLE.orderStatusArray, "Cancel").value && (
          <Stack direction="row">
            <Button
              variant="text"
              onClick={() => {
                modalRef.current.handleOpen();
                //
              }}
              sx={{ width: "150px", mr: 2, color: (t) => t.palette.error.main }}
            >
              Cancel Order
            </Button>
            <Button
              variant="contained"
              disabled={mainState.orderStatus < 2}
              onClick={() => {
                handleUpdateOrderStatus(getArrayObjByLabel(STATIC_VARIABLE.orderStatusArray, "Completed").value);
              }}
              sx={{ width: "150px" }}
            >
              Completed
            </Button>
          </Stack>
        )}
      </Stack>
      <Divider sx={{ mb: 4 }} />
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Typography sx={{ color: (t) => t.palette.secondary.main, fontSize: 20, mb: 1 }}>
            Current Status
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
      </Grid>
      <Typography sx={{ color: (t) => t.palette.secondary.light, mt: 2, mb: 2, fontSize: 24 }}>
        ORDER INFO
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Typography sx={{ color: (t) => t.palette.secondary.main, fontSize: 20, mb: 1 }}>
            Recipient Info
          </Typography>
          <Typography variant="body2" sx={{ color: (t) => t.palette.gary.light, fontSize: 16, mb: 1 }}>
            Name: {mainState.shipping.shippingInfo.firstname} {mainState.shipping.shippingInfo.lastname}
          </Typography>
          <Typography variant="body2" sx={{ color: (t) => t.palette.gary.light, fontSize: 16, mb: 1 }}>
            Phone: {mainState.shipping.shippingInfo.phoneNumber}
          </Typography>
          <Typography variant="body2" sx={{ color: (t) => t.palette.gary.light, fontSize: 16, mb: 1 }}>
            Email: {mainState.shipping.shippingInfo.email}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ color: (t) => t.palette.secondary.main, fontSize: 20, mb: 1 }}>
            Billing Address
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
            Remarks
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
      <DeleteModal ref={modalRef} handleConfirm={() => handleUpdateOrderStatus(getArrayObjByLabel(STATIC_VARIABLE.orderStatusArray, "Cancel").value)}/>
    </PanelContainerLayout>
  );
};

export default ShopOrderDetails;

export const getServerSideProps = ({ locale, locales }) => {
  return {
    props: {
      messages: {
        ...require(`../../../messages/${locale}.json`),
      },
    },
  };
};
