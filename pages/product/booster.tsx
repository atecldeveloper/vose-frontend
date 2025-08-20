import * as React from "react";
import { useRouter } from "next/router";
import { Box, Button, Grid, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import ContainerLayout from "../../components/ContainerLayout";
import ProductGallery from "../../components/ProductGallery";
import SectionPdContainerLayout from "../../components/SectionPdContainerLayout";
import { AddCartProps, handleAddCart } from "../../src/controller/order";
import { useTranslations } from "next-intl";
import { useProps } from "../../src/context/state";
import { useSnackbarContext } from "../../src/context/snackbar";
import {GetHighlightProductProps, handleGetHighlightProductAPI} from "../../src/controller/product";
import {setStateHelper} from "../../utils";

const MainProduct = () => {
  const router = useRouter();
  const theme = useTheme();
  const isSmallSize = useMediaQuery(theme.breakpoints.down('md'));
  const { _handleChange, isLogin, localCart } = useProps();
  const t = useTranslations("HighlightPage") as any;
  const tb = useTranslations("Button");
  const { handleOpenSnackbar } = useSnackbarContext();
  const { referralCode } = router.query;
  const [mainState, setMainState] = React.useState({
    product: {
      ID: 0,
      title: "",
      description: "",
      price: 0,
      pvPoint: 0,
      stock: 0,
    },
    product2: {
      ID: 0,
      title: "",
      description: "",
      price: 0,
      pvPoint: 0,
      stock: 0,
    },
    images: [],
  });

  React.useEffect(() => {
    if (router.isReady) {
      if (referralCode) {
        _handleChange({ referralCode });
      }
      handleGetHighlightProduct();
    }
  }, [router.isReady]);

  const handleGetHighlightProduct = () => {
    const params: GetHighlightProductProps = {
      setMainState: setStateHelper(setMainState),
      changeContext: _handleChange,
      handleOpenSnackbar,
    };
    handleGetHighlightProductAPI(params);
  };

  const handleAddToCart = (ID: number, stock: number) => {
    const params: AddCartProps = {
      isLogin,
      localCart,
      id: ID,
      productUnit: 1,
      stock,
      changeContext: _handleChange,
      handleOpenSnackbar,
    };
    handleAddCart(params);
  };

  const ingredientsArr = [
    {
      path: "/assets/product-vosebooster/product-booster-icon1.png",
      label: t("HL_SC_2_E_1"),
    },
    {
      path: "/assets/product-vosebooster/product-booster-icon2.png",
      label: t("HL_SC_2_E_2"),
    },
    {
      path: "/assets/product-vosebooster/product-booster-icon3.png",
      label: t("HL_SC_2_E_3"),
    },
    {
      path: "/assets/product-vosebooster/product-booster-icon4.png",
      label: t("HL_SC_2_E_4"),
    },
    {
      path: "/assets/product-vosebooster/product-booster-icon5.png",
      label: t("HL_SC_2_E_5"),
    },
  ];

  const howToUseStepArr = [
    {
      path: "/assets/product-vosebooster/product-step1.png",
      label: t("HL_SC_4_E_1"),
    },
    {
      path: "/assets/product-vosebooster/product-step2.png",
      label: t("HL_SC_4_E_2"),
    },
    {
      path: "/assets/product-vosebooster/product-step-note.png",
      label: t("HL_SC_4_E_3"),
    },
  ];

  return (
    <ContainerLayout>
      <SectionPdContainerLayout
        innerStyle={{ height: { sx: "80vh", sm: "70vh", md: "80vh" }, paddingTop: { xs: "0vh", md: "10vh" } }}
      >
        <Grid
          container
          alignItems={"center"}
          spacing={2}
          sx={{ flexDirection: { xs: "column-reverse", sm: "row" } }}
        >
          <Grid item xs={12} md={6}>
            <Typography
              variant={"h1"}
              sx={{ color: (t) => t.palette.secondary.light, lineHight: 10, width: "50px" }}
            >
              {t("BOOSTER_TITLE")}
            </Typography>
            <Typography sx={{ color: (t) => t.palette.gary.light, mt: 3, maxWidth: "400px" }}>
              {t("BOOSTER_DES")}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} sx={{ mr: {xs: -5, md: -10} }}>
            <ProductGallery images={mainState.images} />
          </Grid>
        </Grid>
      </SectionPdContainerLayout>
      <SectionPdContainerLayout innerStyle={{ pt: 10, pb: 10 }}>
        <Grid container>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              backgroundColor: (t) => t.palette.background.paper,
              border: (t) => `1px solid ${t.palette.background.paper}`,
            }}
          >
            <Stack alignItems="center" justifyContent="space-around" sx={{ height: "250px", pt: 3, pb: 3 }}>
              <Typography variant={"h4"} sx={{ color: (t) => t.palette.gary.light, textAlign: 'center', fontSize: {xs: 23, md: 32}}}>
                {mainState.product.title}
              </Typography>
              <Stack alignItems="center">
                <Typography sx={{ color: (t) => t.palette.gary.light }}>0.6g x 2</Typography>
                  <Stack direction='row' alignItems="flex-end">
                    <Typography variant={"h2"} sx={{ color: "black" }}>
                      RM {mainState.product.price}
                    </Typography>
                    <Typography sx={{ color: (t) => t.palette.primary.main, fontSize: 14, fontWeight: 600, pb: '12px', ml: 1 }}>
                      {/* [{mainState.product.pvPoint} Point] */}
                    </Typography>
                  </Stack>
              </Stack>
              {/* <Button
                variant="contained"
                sx={{ width: "200px" }}
                onClick={() => {
                  handleAddToCart(mainState.product.ID, mainState.product.stock);
                }}
              >
                {tb('ADD_TO_CART')}
              </Button> */}
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              border: (t) => `1px solid ${t.palette.background.paper}`,
            }}
          >
            <Stack alignItems="center" justifyContent="space-around" sx={{ height: "250px", pt: 3, pb: 3 }}>
              <Typography variant={"h4"} sx={{ color: (t) => t.palette.gary.light, fontSize: {xs: 23, md: 32} }}>
                {mainState.product2.title}
              </Typography>
              <Stack alignItems="center">
                <Typography sx={{ color: (t) => t.palette.gary.light }}>0.6g x 2</Typography>
                <Stack direction='row' alignItems="flex-end">
                  <Typography variant={"h2"} sx={{ color: "black" }}>
                    RM {mainState.product2.price}
                  </Typography>
                  {/* <Typography sx={{ color: (t) => t.palette.primary.main, fontSize: 14, fontWeight: 600, pb: '12px', ml: 1 }}>[{mainState.product2.pvPoint} Point]</Typography> */}
                </Stack>
              </Stack>
              {/* <Button
                variant="outlined"
                sx={{ width: "200px" }}
                onClick={() => {
                  handleAddToCart(mainState.product2.ID, mainState.product2.stock);
                }}
              >
                {tb('ADD_TO_CART')}
              </Button> */}
            </Stack>
          </Grid>
        </Grid>
      </SectionPdContainerLayout>
      <SectionPdContainerLayout
        style={{ backgroundColor: (t: any) => t.palette.primary.light }}
        innerStyle={{
          backgroundColor: (t: any) => t.palette.primary.light,
          display: "flex",
          alignItems: "center",
          pt: 12,
          // pb: 7,
        }}
      >
        <Grid container spacing={10}>
          <Grid item xs={0} md={6}>
            <Stack alignItems="center">
              <img
                src={"/assets/product-vosebooster/product-about-bg.png"}
                height={isSmallSize ? 'auto' : 400}
                width={isSmallSize ? 300 : 'auto'}
                style={{ objectFit: "cover" }}
              />
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ justifyContent: "center", display: "flex", flexDirection: "column", pb: 5 }}
          >
            <Typography sx={{ color: (t) => t.palette.primary.main }}>{t("HL_SC_1_AB")}</Typography>
            <Typography variant="h2" sx={{ color: "white", mt: 1 }}>
              {t("HL_SC_1_TITLE")}
            </Typography>
            <Typography sx={{ color: "white", maxWidth: 500, padding: "30px 0px" }}>
              {t("HL_SC_1_DES")}
            </Typography>
          </Grid>
        </Grid>
      </SectionPdContainerLayout>
      <SectionPdContainerLayout
        style={{ backgroundColor: (t: any) => t.palette.background.default }}
        innerStyle={{
          backgroundColor: (t: any) => t.palette.background.default,
          pt: 10,
          pb: 5,
        }}
      >
        <Stack alignItems={"center"}>
          <Typography sx={{ color: (t) => t.palette.brown.light }}>{t("HL_SC_2_AB")}</Typography>
          <Typography variant={"h2"} sx={{ color: (t) => t.palette.brown.light, mt: 1 }}>
            {t("HL_SC_2_TITLE")}
          </Typography>
          <Box sx={{
            ml: {
              xs: router.locale == "cn" ? '-20px' : '-40px',
              md: router.locale == "cn" ? '-50px' : '-144px'
            },
            my: 10,
            height: { xs: "auto", md: "400px" },
            width: { xs: "100%", md: "auto" },
          }}>
            {router.locale == "cn" ? (
              <img
                src={"/assets/product-vosebooster/efficacy-zh-2.png"}
                height={"100%"}
                style={{ maxWidth: "100%" }}
              />
            ) : (
              <img
                src={"/assets/product-vosebooster/efficacy.png"}
                height={"100%"}
                style={{ maxWidth: "100%" }}
              />
            )}
          </Box>
        </Stack>
      </SectionPdContainerLayout>
      <SectionPdContainerLayout
        style={{ backgroundColor: (t: any) => t.palette.background.default }}
        innerStyle={{
          backgroundColor: "white",
          p: 7,
          mb: 10,
        }}
      >
        <Stack alignItems="center">
          <Typography variant={"h2"} sx={{ color: (t) => t.palette.brown.light }}>
            {t("HL_SC_3_TITLE")}
          </Typography>
          <Grid container spacing={2} sx={{ mt: 6 }}>
            {ingredientsArr.map((e: any) => {
              return (
                <Grid item xs={6} md={2.4}>
                  <Stack alignItems="center">
                    <img src={`${e.path}`} width={60} />
                    <Typography sx={{ color: "#565655", maxWidth: 120, textAlign: "center", mt: 2 }}>
                      {e.label}
                    </Typography>
                  </Stack>
                </Grid>
              );
            })}
          </Grid>
        </Stack>
      </SectionPdContainerLayout>
      <SectionPdContainerLayout>
        <Stack alignItems="center" sx={{ py: 10 }}>
          <Typography sx={{ color: (t) => t.palette.brown.light }}>{t("HL_SC_4_AB")}</Typography>
          <Typography variant={"h2"} sx={{ color: (t) => t.palette.brown.light, mt: 1 }}>
            {t("HL_SC_4_TITLE")}
          </Typography>
          <Grid container spacing={10} sx={{ mt: 1 }}>
            {howToUseStepArr.map((e: any) => {
              return (
                <Grid item xs={6} sm={4}>
                  <Stack alignItems="center">
                    <img src={`${e.path}`} width={"80%"} style={{ maxWidth: 400 }} />
                    <Typography sx={{ color: (t) => t.palette.gary.light, textAlign: "center", mt: 3 }}>
                      {e.label}
                    </Typography>
                  </Stack>
                </Grid>
              );
            })}
          </Grid>
        </Stack>
      </SectionPdContainerLayout>
      <SectionPdContainerLayout innerStyle={{ py: 10 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <img src={"/assets/product-vosebooster/product-quantity-woman.png"} width="90%" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack justifyContent={"space-between"} sx={{ height: "100%" }}>
              <Typography variant={"h2"} sx={{ color: (t) => t.palette.brown.light, mt: 1 }}>
                {t("HL_SC_5_TITLE")}
              </Typography>
              <Stack spacing={3}>
                <Stack alignItems={"center"} direction="row">
                  <img src={"/assets/product-vosebooster/product-quantity-eye.png"} width={50} />
                  <Typography
                    sx={{
                      color: (t) => t.palette.gary.light,
                      fontWeight: "bold",
                      ml: 2,
                      mr: 4,
                      minWidth: "37px",
                    }}
                  >
                    {t("HL_SC_5_F_1")}
                  </Typography>
                  <Typography sx={{ color: (t) => t.palette.gary.light }}>{t("HL_SC_5_F_1_DES")}</Typography>
                </Stack>
                <Stack alignItems={"center"} direction="row">
                  <img src={"/assets/product-vosebooster/product-quantity-face.png"} width={50} />
                  <Typography
                    sx={{
                      color: (t) => t.palette.gary.light,
                      fontWeight: "bold",
                      ml: 2,
                      mr: 4,
                      minWidth: "37px",
                    }}
                  >
                    {t("HL_SC_5_F_2")}
                  </Typography>
                  <Typography sx={{ color: (t) => t.palette.gary.light }}>{t("HL_SC_5_F_2_DES")}</Typography>
                </Stack>
                <Stack alignItems={"center"} direction="row">
                  <img src={"/assets/product-vosebooster/product-quantity-neck.png"} width={50} />
                  <Typography
                    sx={{
                      color: (t) => t.palette.gary.light,
                      fontWeight: "bold",
                      ml: 2,
                      mr: 4,
                      minWidth: "37px",
                    }}
                  >
                    {t("HL_SC_5_F_3")}
                  </Typography>
                  <Typography sx={{ color: (t) => t.palette.gary.light }}>{t("HL_SC_5_F_3_DES")}</Typography>
                </Stack>
              </Stack>
              <Stack spacing={3}>
                <Typography sx={{ color: (t) => t.palette.secondary.main }}>{t("HL_SC_5_NOTE")}</Typography>
                <Typography sx={{ color: (t) => t.palette.secondary.main }}>{t("HL_SC_5_NOTE_2")}</Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </SectionPdContainerLayout>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          height: { xs: "60vh", md: "70vh" },
          marginTop: "-150px",
          backgroundColor: "white",
          backgroundImage: `url(/assets/contact/contact-section-bg.png)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPositionY: "bottom",
          minHeight: "20vh",
        }}
      >
        <Typography variant="h2" sx={{ color: (t) => t.palette.secondary.main, textAlign: 'center' }}>
          {t("HL_QUE_TITLE")}
        </Typography>
        <Box sx={{ m: 2 }} />

        <Button
          variant="contained"
          sx={{ width: "200px" }}
          onClick={() => {
            router.push("/contact_us");
          }}
        >
          {tb("CONTACT_US")}
        </Button>
      </Stack>
    </ContainerLayout>
  );
};

export default MainProduct;

export const getServerSideProps = ({ locale, locales }) => {
  return {
    props: {
      messages: {
        ...require(`../../messages/${locale}.json`),
      },
    },
  };
};
