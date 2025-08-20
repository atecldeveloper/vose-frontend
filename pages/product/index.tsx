import { Box, Container, Grid, MenuItem, Pagination, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import * as React from "react";
import ContainerLayout from "../../components/ContainerLayout";
import SectionPdContainerLayout from "../../components/SectionPdContainerLayout";
import CustomAccordion from "../../components/CustomAccordion";
import { TextField } from "@mui/material";
import { getArrayObjByValue, setStateHelper } from "../../utils";
import ProductListCell from "../../components/ProductListCell";
import {
  GetProductCategoriesListAPIProps,
  GetProductListAPIProps,
  handleGetProductCategoriesAPI,
  handleGetProductListAPI,
} from "../../src/controller/product";
import { useProps } from "../../src/context/state";
import { useSnackbarContext } from "../../src/context/snackbar";
import { LocalCartCellProps } from "../../src/types";
import { SnackBarType } from "../../src/constants";
import { AddCartProps, handleAddCart } from "../../src/controller/order";
import {useTranslations} from "next-intl";

const sortArr = [
  {
    label: "New Arrival",
    value: 0,
  },
  {
    label: "Top Sale",
    value: 1,
  },
  {
    label: "Promotion",
    value: 3,
  },
];

const ProductList = () => {
  const { _handleChange, localCart, isLogin } = useProps();
  const theme = useTheme();
  const isSmallSize = useMediaQuery(theme.breakpoints.down('md'));
  const t: any = useTranslations("Products");
  const { handleOpenSnackbar } = useSnackbarContext();
  const counterRef = React.useRef<any>();
  const [categoriesList, setCategoriesList] = React.useState([]);
  const [mainState, setMainState] = React.useState({
    dataArr: [],
    page: 1,
    limit: 20,
    total: 10,
    sortBy: 1,
    order: "desc",
    orderBy: 0,
    minPrice: 0,
    maxPrice: 10000,
    categoryID: 0,
  });

  React.useEffect(() => {
    const paramCategories: GetProductCategoriesListAPIProps = {
      setMainState: setCategoriesList,
      changeContext: _handleChange,
      handleOpenSnackbar,
    };
    handleGetProductCategoriesAPI(paramCategories);
  }, []);

  React.useEffect(() => {
    handleGetProductList();
  }, [mainState.categoryID, mainState.minPrice, mainState.maxPrice, mainState.page, mainState.sortBy]);


  const handleGetProductList = () => {
    let sortBy = 'createdAt';

    console.log(mainState.sortBy)
    if (mainState.sortBy == 1) {
      sortBy = 'topSale';
    }
    if (mainState.sortBy == 2) {
      sortBy = 'promotion';
    }

    const param: GetProductListAPIProps = {
      categoryID: mainState.categoryID,
      minPrice: mainState.minPrice,
      maxPrice: mainState.maxPrice,
      page: mainState.page,
      limit: mainState.limit,
      order: mainState.order,
      orderBy: sortBy,
      setMainState: setStateHelper(setMainState),
      changeContext: _handleChange,
      handleOpenSnackbar,
    };
    handleGetProductListAPI(param);

  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStateHelper(setMainState)({ sortBy: event.target.value});
  };


  const handleChangePage = (event: unknown, newPage: number) => {
    setStateHelper(setMainState)({ page: newPage });
  };

  const handleSearch = (value: number[]) => {
    setStateHelper(setMainState)({ minPrice: value[0], maxPrice: value[1] });
  };

  const handleAddToCart = (id: number, stock: number) => {
    const params: AddCartProps = {
      isLogin,
      localCart,
      id,
      stock,
      changeContext: _handleChange,
      handleOpenSnackbar
    }
    handleAddCart(params)
  }

  return (
    <ContainerLayout>
      <SectionPdContainerLayout
        style={{
          backgroundImage: `url(/assets/product-vosebooster/website.png)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundColor: 'rgb(181,155,124)',
          // backgroundAttachment: "fixed",
          height: isSmallSize ? "30vh": "50vh",
          backgroundPosition: 'center'
          // backgroundPositionY: -130,
          // backgroundPositionX: { lg: "0px", md: "0x", sm: "-170px" },
        }}
      >
        <Stack alignItems="flex-start" justifyContent="center" sx={{ height: "40vh" }}>
          <Typography variant="h2" sx={{ color: (t) => t.palette.secondary.main, mt: 2 }}>
            {/* {t('PRO_TITLE')} */}
          </Typography>
        </Stack>
      </SectionPdContainerLayout>
      <SectionPdContainerLayout innerStyle={{ pt: 5, pb: 10, hight: "100vh" }}>
        <Grid container spacing={3}>
          <Grid item sm={4} lg={3}>
            <Stack spacing={0}>
              <CustomAccordion
                title={t('PRO_CAT')}
                dataArr={categoriesList}
                selectedID={mainState.categoryID}
                handleClick={(id) => {
                  setStateHelper(setMainState)({ categoryID: id });
                }}
              />
              <CustomAccordion
                title={t('PRO_PRI')}
                handleSearch={handleSearch}
                maxRange={mainState.maxPrice}
                minRange={mainState.minPrice}
              />
            </Stack>
          </Grid>
          <Grid item sm={8} lg={9}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                border: "solid",
                borderColor: (t) => t.palette.background.paper,
                borderWidth: 0,
                borderBottomWidth: 1,
                pb: 1,
                mb: 4,
              }}
            >
              <Typography sx={{ color: (t) => t.palette.secondary.main }}>{mainState.total} {t('PRO_I_F')}</Typography>
              <Stack direction="row" alignItems="center">
                <Typography sx={{ color: (t) => t.palette.secondary.main }}>{t('PRO_S_B')}:</Typography>
                <TextField
                  id="standard-select-sort"
                  select
                  label=""
                  value={mainState.sortBy}
                  onChange={handleChange}
                  sx={{
                    ml: 1,
                    ".MuiSelect-select": {
                      px: 2,
                      py: 0.5,
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      padding: "0px !important",
                    },
                  }}
                >
                  {sortArr.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
            </Stack>
            <Grid container spacing={3}>
              {mainState.dataArr.map((e: any) => {
                return (
                  <Grid item xs={12} md={6} lg={4}>
                    <ProductListCell
                      ID={e.ID}
                      path={e.path}
                      productName={e.productName}
                      categoryArr={e.categoryArr}
                      unit={e.unit}
                      price={e.price}
                      discountPrice={e.discountPrice}
                      pvPoint={e.pvPoint}
                      handleAddToCart={() => handleAddToCart(e.ID, e.stock)}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
          <Stack sx={{ width: "100%", my: 4 }} alignItems="flex-end">
            <Pagination
              page={mainState.page}
              count={Math.ceil(mainState.total / mainState.limit)}
              onChange={handleChangePage}
              defaultPage={1}
              // variant='outlined'
              color="primary"
            />
          </Stack>
        </Grid>
      </SectionPdContainerLayout>
    </ContainerLayout>
  );
};

export default ProductList;

export const getServerSideProps = ({ locale, locales }) => {
  return {
    props: {
      messages: {
        ...require(`../../messages/${locale}.json`),
      },
    },
  };
};
