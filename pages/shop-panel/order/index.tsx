import { Box, Tab, Typography } from "@mui/material";
import * as React from "react";
import PanelContainerLayout from "../../../components/PanelContainerLayout";
import { getArrayObjByValue, setPriceFormat, setStateHelper } from "../../../utils";
import CustomDataTable from "../../../components/CustomDataTable";
import { useProps } from "../../../src/context/state";
import { useSnackbarContext } from "../../../src/context/snackbar";
import { GetOrderListAPIProps, handleGetOrderListAPI } from "../../../src/controller/order";
import { STATIC_VARIABLE } from "../../../src/constants/staticData";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import { GetShopOrderListAPIProps, handleGetShopOrderListAPI } from "../../../src/controller/shop";
import { useTranslations } from "next-intl";

const generateBody = (body: any, page: number, rowsPerPage: number, handleEdit: () => void) => {
  return body.map((e: any, i: number) => ({
    id: <p style={{ fontWeight: "bold" }}>{(page - 1) * rowsPerPage + i + 1}.</p>,
    orderID: <a href={`/shop-panel/order/${e.orderID}`}>{e.orderID}</a>,
    createDate: e.date,
    status: (
      <Box
        sx={{
          color: getArrayObjByValue(STATIC_VARIABLE.orderStatusArray, e.status).color,
          fontWeight: "700",
        }}
      >
        {getArrayObjByValue(STATIC_VARIABLE.orderStatusArray, e.status).label}
      </Box>
    ),
    total: "RM " + setPriceFormat(e.total),
  }));
};

const ShopOrder = () => {
  const { _handleChange } = useProps();
  const { handleOpenSnackbar } = useSnackbarContext();
  const t = useTranslations("ShopOrderList");

  const header = [
    { id: "id", label: "", align: "center" },
    { id: "orderID", label: t("ORDER_ID"), align: "left" },
    { id: "createDate", label: t("DATE"), align: "left" },
    { id: "status", label: t("STATUS"), align: "left" },
    { id: "total", label: t("TOTAL"), align: "left" },
  ];

  const [mainState, setMainState] = React.useState({
    list: [],
    page: 1,
    limit: 10,
    total: 10,
    order: "desc",
    orderBy: "createdAt",
    status: 0,
  });

  React.useEffect(() => {
    handleGetOrderList();
  }, [mainState.status, mainState.order, mainState.orderBy, mainState.page]);

  const handleOpenEdit = () => {};

  const handleGetOrderList = () => {
    const body: GetShopOrderListAPIProps = {
      page: mainState.page,
      limit: mainState.limit,
      order: mainState.order,
      orderBy: mainState.orderBy,
      status: mainState.status,
      setMainState: setStateHelper(setMainState),
      changeContext: _handleChange,
      handleOpenSnackbar,
    };
    handleGetShopOrderListAPI(body);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setStateHelper(setMainState)({ status: newValue });
  };

  const body = generateBody(mainState.list, mainState.page, mainState.limit, handleOpenEdit);

  return (
    <PanelContainerLayout isShop>
      <Typography
        variant="h2"
        sx={{ color: (t) => t.palette.secondary.main, mb: 3, fontSize: 32, fontWeight: 500 }}
      >
       {t('TITLE')}
      </Typography>
      <TabContext value={`${mainState.status}`}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab sx={{ fontSize: 18 }} label={"ALL"} value={"0"} />
            {STATIC_VARIABLE.orderStatusArray.map((e, index) => {
              return <Tab sx={{ fontSize: 18 }} label={e.label} value={JSON.stringify(e.value)} />;
            })}
          </TabList>
        </Box>
        <CustomDataTable
          header={header}
          myData={body}
          // myData={data}
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
      </TabContext>
    </PanelContainerLayout>
  );
};

export default ShopOrder;

export const getServerSideProps = ({ locale, locales }) => {
  return {
    props: {
      messages: {
        ...require(`../../../messages/${locale}.json`),
      },
    },
  };
};

