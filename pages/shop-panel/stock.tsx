import * as React from "react";
import PanelContainerLayout from "../../components/PanelContainerLayout";
import { Typography, Box, Stack } from "@mui/material";
import CustomDataTable from "../../components/CustomDataTable";
import { plainTextWithoutHTML, setPriceFormat, setStateHelper } from "../../utils";
import { useProps } from "../../src/context/state";
import { useSnackbarContext } from "../../src/context/snackbar";
import { handleGetStockListAPI } from "../../src/controller/order";
import { useTranslations } from "next-intl";

const generateBody = (body: any, page: number, rowsPerPage: number) => {
  return body.map((e: any, i: number) => ({
    id: <p style={{ fontWeight: "bold" }}>{(page - 1) * rowsPerPage + i + 1}.</p>,
    photos: (
      <Stack direction="row">
        <Stack direction="row">
          <img width="100" height="100" style={{ objectFit: "cover", minWidth: "100px" }} src={e.images[0]} />
          <Stack justifyContent="space-between" sx={{ maxWidth: "250px" }}>
            <Box sx={{ ml: 2, mt: 3 }}>
              <Typography sx={{ color: (t) => t.palette.secondary.main, fontSize: 14 }}>
                {e.productName}
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    ),
    stock: e.stock,
    price: "RM " + setPriceFormat(e.price),
  }));
};

const ShopStock = () => {
  const { _handleChange } = useProps();
  const { handleOpenSnackbar } = useSnackbarContext();
  const t = useTranslations('ShopStockList')
  const [mainState, setMainState] = React.useState({
    list: [],
    page: 1,
    limit: 10,
    total: 10,
    order: "desc",
    orderBy: "createdAt",
    orderStatus: 0,
  });
  
  const header = [
    { id: "id", label: "", align: "center" },
    { id: "photos", label: t("PRODUCT"), align: "left", sortable: false },
    { id: "stock", label: t("STOCK"), align: "left" },
    { id: "price", label: t("UNIT_PRICE"), align: "left" },
  ];

  React.useEffect(() => {
    handleGetStockList();
  }, [mainState.order, mainState.orderBy, mainState.page]);

  const handleGetStockList = () => {
    const params = {
      page: mainState.page,
      limit: mainState.limit,
      order: mainState.order,
      orderBy: mainState.orderBy,
      setMainState: setStateHelper(setMainState),
      changeContext: _handleChange,
      handleOpenSnackbar,
    };
    handleGetStockListAPI(params);
  };

  return (
    <PanelContainerLayout isShop>
      <Typography
        variant="h2"
        sx={{ color: (t) => t.palette.secondary.main, mb: 2, fontSize: 32, fontWeight: 500 }}
      >
        {t('TITLE')}
      </Typography>
      <Typography
        sx={{ fontSize: 16, fontWeight: 500, mb: 2 }}
      >
        {t('STOCK_DESC')}     
        </Typography>
      <Typography
        sx={{ color: (t) => t.palette.error.main, fontSize: 16, fontWeight: 500, mb: 2 }}
      >
        {t('REMARKS')}     
         </Typography>
      <CustomDataTable
        header={header}
        myData={generateBody(mainState.list, mainState.page, mainState.limit)}
        order={mainState.order}
        orderBy={mainState.orderBy}
        setState={setStateHelper(setMainState)}
        rowsPerPage={mainState.limit}
        count={mainState.total}
        page={mainState.page}
        total={mainState.total}
        pagination={true}
        class="-striped -highlight"
      />
    </PanelContainerLayout>
  );
};

export default ShopStock;

export const getServerSideProps = ({ locale, locales }) => {
  return {
    props: {
      messages: {
        ...require(`../../messages/${locale}.json`),
      },
    },
  };
};
