import { Box, Typography } from "@mui/material";
import * as React from "react";
import PanelContainerLayout from "../../../components/PanelContainerLayout";
import { getArrayObjByValue, setPriceFormat, setStateHelper } from "../../../utils";
import CustomDataTable from "../../../components/CustomDataTable";
import { useProps } from "../../../src/context/state";
import { useSnackbarContext } from "../../../src/context/snackbar";
import { GetOrderListAPIProps, handleGetOrderListAPI } from "../../../src/controller/order";
import { STATIC_VARIABLE } from "../../../src/constants/staticData";
import OrderDetailsModal from "../../../components/modal/OrderDetailsModal";
import { useTranslations } from "use-intl";

const generateBody = (body: any, page: number, rowsPerPage: number, handleEdit: () => void) => {
  return body.map((e: any, i: number) => ({
    id: <p style={{ fontWeight: "bold" }}>{(page - 1) * rowsPerPage + i + 1}.</p>,
    orderID: <a href={`/panel/order/${e.ID}`}>{e.ID}</a>,
    createDate: e.createdAt,
    status: (
      <Box
        sx={{
          color: getArrayObjByValue(STATIC_VARIABLE.orderStatusArray, e.orderStatus).color,
          fontWeight: "700",
        }}
      >
        {getArrayObjByValue(STATIC_VARIABLE.orderStatusArray, e.orderStatus).label}
      </Box>
    ),
    total: "RM " + setPriceFormat(e.totalAmount),
  }));
};



const Order = () => {
  const t: any = useTranslations('MYOrder');
  const header = [
    { id: "id", label: "", align: "center" },
    { id: "orderID", label: t('ORDER_ID'), align: "left" },
    { id: "createDate", label:t('DATE'), align: "left" },
    { id: "status", label: t('STATUS'), align: "left" },
    { id: "total", label: t('TOTAL'), align: "left" },
  ];

  const { _handleChange } = useProps();
  const { handleOpenSnackbar } = useSnackbarContext();
  const modalRef = React.useRef<any>();
  const [mainState, setMainState] = React.useState({
    list: [],
    page: 1,
    limit: 10,
    total: 10,
    order: "desc",
    orderBy: "createdAt",
  });

  React.useEffect(() => {
    handleGetOrderList();
  }, [mainState.page, mainState.orderBy, mainState.order]);

  const handleGetOrderList = () => {
    const body: GetOrderListAPIProps = {
      page: mainState.page,
      limit: mainState.limit,
      order: mainState.order,
      orderBy: mainState.orderBy,
      setMainState: setStateHelper(setMainState),
      changeContext: _handleChange,
      handleOpenSnackbar,
    };
    handleGetOrderListAPI(body);
  };

  const handleOpenEdit = () => {
    modalRef.current.handleOpen();
  };

  const body = generateBody(mainState.list, mainState.page, mainState.limit, handleOpenEdit);

  return (
    <PanelContainerLayout>
      <Typography
        variant="h2"
        sx={{ color: (t) => t.palette.secondary.main, mb: 3, fontSize: 32, fontWeight: 500 }}
      >
        {t('TITLE')}
      </Typography>
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
      <OrderDetailsModal ref={modalRef} />
    </PanelContainerLayout>
  );
};

export default Order;

export const getServerSideProps = ({ locale, locales }) => {
  return {
    props: {
      messages: {
        ...require(`../../../messages/${locale}.json`),
      },
    },
  };
};
