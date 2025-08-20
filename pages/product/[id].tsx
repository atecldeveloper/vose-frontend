import * as React from "react";
import { useRouter } from "next/router";
import { Box, Button, Grid, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import ContainerLayout from "../../components/ContainerLayout";
import ProductGallery from "../../components/ProductGallery";
import SectionPdContainerLayout from "../../components/SectionPdContainerLayout";
import CounterStep from "../../components/CounterStep";
import CustomAccordion from "../../components/CustomAccordion";
import ProductListCell from "../../components/ProductListCell";
import EmblaCarousel from "../../components/FeedbackCarousel/EmblaCarousel";
import { getArrayObjByValue, plainTextWithoutHTML, setPriceFormat, setStateHelper } from "../../utils";
import { useProps } from "../../src/context/state";
import { useSnackbarContext } from "../../src/context/snackbar";
import { handleGetProductDetailsAPI, handleGetRelativeProductAPI } from "../../src/controller/product";
import {
  AddCartProps,
  AddToCartAPIProps,
  handleAddCart,
  handleAddToCartAPI,
} from "../../src/controller/order";
import { useTranslations } from "next-intl";

const SLIDE_COUNT = 6;
const slides = Array.from(Array(SLIDE_COUNT).keys());

const ProductPage = () => {
  const { _handleChange, localCart, isLogin } = useProps();
  const t: any = useTranslations("ProductDetails");
  const tb: any = useTranslations("Button");
  const { handleOpenSnackbar } = useSnackbarContext();
  const theme = useTheme();
  const router = useRouter();
  const { id }: any = router.query;
  const smInit = useMediaQuery(theme.breakpoints.down("sm"));
  const lgInit = useMediaQuery(theme.breakpoints.down("lg"));
  const init = lgInit ? (smInit ? 1 : 2) : 4;
  const counterRef = React.useRef<any>();
  const [mainState, setMainState] = React.useState({
    title: "",
    description: "",
    details: "",
    price: 0,
    pvPoint: 0,
    discountPrice: 0,
    stock: 0,
    images: [],
    category: [],
  });

  const [relativeProductList, setRelativeProductList] = React.useState([]);
  const [productUnit, setProductUnit] = React.useState(1);
  React.useEffect(() => {
    if (router.isReady) {
      handleGetProductDetails();
      handleGetRelativeProduct();
    }
  }, [router.isReady]);

  const handleGetRelativeProduct = async () => {
    await handleGetRelativeProductAPI({
      id,
      setMainState: setRelativeProductList,
      changeContext: _handleChange,
      handleOpenSnackbar,
    });
  };

  const handleGetProductDetails = async () => {
    await handleGetProductDetailsAPI({
      id,
      setMainState: setMainState,
      changeContext: _handleChange,
      handleOpenSnackbar,
    });
  };

  const handleAddToCart = (ID: number, productUnit?: number) => {
    const params: AddCartProps = {
      isLogin,
      localCart,
      id: ID,
      productUnit,
      stock: mainState.stock,
      changeContext: _handleChange,
      handleOpenSnackbar,
    };
    handleAddCart(params).then((stock: any) => {
      if (stock) {
        counterRef.current.setText(stock);
      }
    });
  };

  const handleAddRelativeToCart = (ID: number, stock: number) => {
    const params: AddCartProps = {
      isLogin,
      localCart,
      id: ID,
      productUnit: 1,
      stock: stock,
      changeContext: _handleChange,
      handleOpenSnackbar,
    };
    handleAddCart(params);
  };

  return (
    <ContainerLayout>
      <SectionPdContainerLayout
        style={{ backgroundColor: "white" }}
        innerStyle={{ pt: { xs: "0vh", md: "10vh" }, pb: { xs: "5vh", md: "10vh" } }}
      >
        <Grid container spacing={5} sx={{ flexDirection: { xs: "column-reverse", sm: "row" } }}>
          <Grid item xs={12} md={5}>
            <ProductGallery tnPosition={"bottom"} images={mainState.images} />
          </Grid>
          <Grid item xs={12} md={7}>
            <Stack justifyContent="space-between" sx={{ height: "100%", pb: 10 }}>
              <Box>
                <Typography
                  sx={{ color: (t) => t.palette.primary.main, fontSize: 16, fontStyle: "italic", mb: 1 }}
                >
                  {mainState.category.toString()}
                </Typography>
                <Typography variant={"h2"} sx={{ color: (t) => t.palette.secondary.main, lineHight: 10 }}>
                  {mainState.title}
                </Typography>

                <Typography sx={{ color: (t) => t.palette.secondary.main, lineHight: 10 }}>
                  {plainTextWithoutHTML(mainState.details)}
                </Typography>

                {!mainState.discountPrice || mainState.discountPrice == 0 ? (
                  <Stack direction="row" alignItems="center" sx={{ mt: 3 }}>
                    <Typography
                      sx={{ color: (t) => t.palette.secondary.light, fontWeight: 700, fontSize: 24 }}
                    >
                      RM {setPriceFormat(mainState.price)}
                    </Typography>
                    <Typography sx={{ ml: 1, fontSize: '16px' }}>
                      {/* [{mainState.pvPoint} Point] */}
                    </Typography>
                  </Stack>
                ) : (
                  <Stack direction="row" alignItems="flex-end">
                    <Typography
                      sx={{
                        color: (t) => t.palette.gary.light,
                        fontWeight: 700,
                        fontSize: 18,
                        mt: 3,
                        mb: '4px',
                        mr: 1,
                        textDecoration: "line-through",
                      }}
                    >
                      RM {setPriceFormat(mainState.price)}
                    </Typography>
                    <Typography
                      sx={{ color: (t) => t.palette.secondary.light, fontWeight: 700, fontSize: 24 }}
                    >
                      RM {setPriceFormat(mainState.discountPrice)}
                    </Typography>
                    <Typography sx={{ mb: '4px', ml: 1, fontSize: '16px' }}>
                      {/* [{mainState.pvPoint} Point] */}
                    </Typography>
                  </Stack>
                )}

                <Typography sx={{ color: (t) => t.palette.gary.light }}>
                  {t("PRO_D_STOCK")}: {mainState.stock}
                </Typography>
              </Box>
              {/* <Stack sx={{ width: 250 }} spacing={5}>
                <CounterStep
                  ref={counterRef}
                  initNumber={productUnit}
                  handleGetCount={(value: number) => {
                    setProductUnit(value);
                  }}
                />
                <Button
                  variant="contained"
                  sx={{ width: "250px" }}
                  onClick={() => handleAddToCart(parseInt(id), productUnit)}
                >
                  {tb("ADD_TO_CART")}
                </Button>
              </Stack> */}
            </Stack>
          </Grid>
        </Grid>
        <CustomAccordion
          isInfo={true}
          isOpen
          title={t("PRO_D_INFO")}
          dataArr={[
            {
              label: plainTextWithoutHTML(mainState.description),
            },
          ]}
        />
        {/* <CustomAccordion
          isInfo={true}
          title={t('PRO_D_PS')}
          dataArr={[
            {
              label:
                "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh",
            },
          ]}
        /> */}
        <Box sx={{ p: 7 }} />
        <Typography
          variant={"h2"}
          sx={{ color: (t) => t.palette.secondary.main, lineHight: 10, fontSize: 24 }}
        >
          {t("PRO_D_LIKE")}
        </Typography>
        <Box sx={{ p: 1 }} />
        <EmblaCarousel initRowItems={init}>
          {relativeProductList.map((e: any) => (
            <ProductListCell
              ID={e.ID}
              path={e.images[0]}
              productName={e.title}
              categoryArr={e.category}
              unit={"RM"}
              price={e.price}
              pvPoint={e.pvPoint}
              discountPrice={e.discountPrice}
              handleAddToCart={() => handleAddRelativeToCart(e.ID, e.stock)}
            />
          ))}
        </EmblaCarousel>
      </SectionPdContainerLayout>
    </ContainerLayout>
  );
};

export default ProductPage;

export const getServerSideProps = ({ locale, locales }) => {
  return {
    props: {
      messages: {
        ...require(`../../messages/${locale}.json`),
      },
    },
  };
};
