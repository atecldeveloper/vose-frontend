import { Box, Typography, Tab, IconButton, Button } from "@mui/material";
import * as React from "react";
import PanelContainerLayout from "../../components/PanelContainerLayout";
import { getArrayObjByValue, setPriceFormat, setStateHelper } from "../../utils";
import CustomDataTable from "../../components/CustomDataTable";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useProps } from "../../src/context/state";
import { useSnackbarContext } from "../../src/context/snackbar";
import { STATIC_VARIABLE } from "../../src/constants/staticData";
import OrderDetailsModal from "../../components/modal/OrderDetailsModal";
import { ClaimVoucherAPIProps, GetAvailableVoucherListAPIProps, GetVoucherListAPIProps, handleClaimVoucherListAPI, handleGetAvailableVoucherListAPI, handleGetVoucherListAPI } from "../../src/controller/voucher";
import TabContext from "@mui/lab/TabContext";
import { useTranslations } from "use-intl";

const generateBody = (body: any, page: number, rowsPerPage: number, handleClaimVoucher: any) => {
  return body.map((e: any, i: number) => ({
    id: <p style={{ fontWeight: "bold" }}>{(page - 1) * rowsPerPage + i + 1}.</p>,
    voucherId: <a>{e.code}</a>,
    description: <Box>
      <p style={{fontWeight: 'bold'}}>{e.title}</p>
      <p style={{whiteSpace: 'pre-line'}}>{e.description}</p>
      </Box>,
    discount: getArrayObjByValue(STATIC_VARIABLE.voucherDiscountTypeArray, e.discountType).label === 'RM' ? `RM ${setPriceFormat(e.discount)}` : `${e.discount}%`,
    minSpend: `RM ${e.minSpend}`,
    expiredAt: e.expiredAt ? e.expiredAt : '-',
    action:  <Button variant='contained' onClick={() => {handleClaimVoucher(e.ID)}}>Claim</Button>

  }));
};




const Voucher = () => {
  const t: any = useTranslations('MyVoucher');
  const { _handleChange } = useProps();
  const { handleOpenSnackbar } = useSnackbarContext();
  const [value, setValue] = React.useState("1");
  const [mainState, setMainState] = React.useState({
    list: [],
    page: 1,
    limit: 10,
    total: 10,
    order: "desc",
    orderBy: "createdAt",
  });

  const [availableListState, setAvailableListState] = React.useState({
    list: [],
    page: 1,
    limit: 10,
    total: 10,
    order: "desc",
    orderBy: "createdAt",
  });


  const header = [
    { id: "id", label: "", align: "center" },
    { id: "voucherId", label: t('VOUCHER_CODE'), align: "left"},
    { id: "description", label: t('VOUCHER_D'), align: "left" },
    { id: "discount", label: t('DISCOUNT'), align: "left" },
    { id: "minSpend", label: t('MIN_S'), align: "left" },
    { id: "expiredAt", label: t('EXPIRED_D'), align: "left" },
  ];
  
  const header2 = [
    { id: "id", label: "", align: "center" },
    { id: "voucherId", label: t('VOUCHER_CODE'), align: "left"},
    { id: "description", label: t('VOUCHER_D'), align: "left" },
    { id: "discount", label: t('DISCOUNT'), align: "left" },
    { id: "minSpend", label: t('MIN_S'), align: "left" },
    { id: "expiredAt", label: t('EXPIRED_D'), align: "left" },
    { id: 'action', label: '', sortable: false, align: 'center'}
  ];

  React.useEffect(() => {
    handleGetVoucherList();
  }, [value, mainState.limit, mainState.page, mainState.order, mainState.orderBy]);

  React.useEffect(() => {
    console.log('HII')
    handleGetAvailableVoucherList();
  }, [value, availableListState.limit, availableListState.page, availableListState.order, availableListState.orderBy]);


  const handleGetAvailableVoucherList = () => {
    const body: GetAvailableVoucherListAPIProps = {
      page: availableListState.page,
      limit: availableListState.limit,
      order: availableListState.order,
      orderBy: availableListState.orderBy,
      setMainState: setStateHelper(setAvailableListState),
      changeContext: _handleChange,
      handleOpenSnackbar,
    }

    handleGetAvailableVoucherListAPI(body);
  }

  const handleGetVoucherList = () => {
    const body: GetVoucherListAPIProps = {
      page: mainState.page,
      limit: mainState.limit,
      order: mainState.order,
      orderBy: mainState.orderBy,
      setMainState: setStateHelper(setMainState),
      changeContext: _handleChange,
      handleOpenSnackbar,
    }
    handleGetVoucherListAPI(body);
  }


  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleClaimVoucher = (id: number) => {
    const body: ClaimVoucherAPIProps = {
      voucherID: id,
      changeContext: _handleChange,
      handleOpenSnackbar,
    }

    handleClaimVoucherListAPI(body).then((isSuccess) => {
      if (isSuccess) {
        setValue('1')
      }
    })
  }
  const body = generateBody(
    mainState.list,
    mainState.page,
    mainState.limit,
    null
  );

  const body2 = generateBody(
    availableListState.list,
    availableListState.page,
    availableListState.limit,
    handleClaimVoucher
  );

  return (
    <PanelContainerLayout>
      <Typography
        variant="h2"
        sx={{ color: (t) => t.palette.secondary.main, mb: 3, fontSize: 32, fontWeight: 500 }}
      >
        {t('TITLE')}
      </Typography>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab sx={{ fontSize: 18 }} label={t('AVAILABLE')} value="1" />
            <Tab sx={{ fontSize: 18 }} label={t('UNCLAIM')} value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
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
        </TabPanel>
        <TabPanel value="2">
          <CustomDataTable
            header={header2}
            myData={body2}
            // myData={data}
            order={availableListState.order}
            orderBy={availableListState.orderBy}
            setState={setStateHelper(setAvailableListState)}
            rowsPerPage={availableListState.limit}
            count={availableListState.total}
            page={availableListState.page}
            total={availableListState.total}
            pagination={true}
            class="-striped -highlight"
          />
        </TabPanel>
      </TabContext>
    </PanelContainerLayout>
  );
};

export default Voucher;

export const getServerSideProps = ({ locale, locales }) => {
  return {
    props: {
      messages: {
        ...require(`../../messages/${locale}.json`),
      },
    },
  };
};
