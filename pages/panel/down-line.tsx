import { Box, Divider, Stack, Grid, Typography, TextField, Button, Tab, Paper } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import * as React from "react";
import PanelContainerLayout from "../../components/PanelContainerLayout";
import { getArrayObjByValue, setStateHelper } from "../../utils";
import CustomDataTable from "../../components/CustomDataTable";
import { useProps } from "../../src/context/state";
import { useSnackbarContext } from "../../src/context/snackbar";
import { STATIC_VARIABLE } from "../../src/constants/staticData";
import {
  GetFistLayerDownlineListAPIProps,
  GetSecondLayerDownlineListAPIProps,
  handleGetFirstLayerDownlineListAPI,
  handleGetSecondLayerDownlineListAPI,
} from "../../src/controller/account";
import { useTranslations } from "use-intl";

const generateBody = (body: any, page: number, rowsPerPage: number) => {
  return body.map((e: any, i: number) => {
    return {
      id: <p style={{ fontWeight: "bold" }}>{(page - 1) * rowsPerPage + i + 1}.</p>,
      username: <p style={{ fontWeight: "600" }}>{e.username}</p>,
      name: e.firstName + " " + e.lastName,
      email: e.email,
      pv: e.points,
      tier: (
        <Typography
          sx={{
            color: getArrayObjByValue(STATIC_VARIABLE.levelStatusArray, e.tier).color,
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          {getArrayObjByValue(STATIC_VARIABLE.levelStatusArray, e.tier).label}
        </Typography>
      ),
    };
  });
};

const generateBody2 = (body: any, page: number, rowsPerPage: number) => {
  return body.map((e: any, i: number) => {
    return {
      id: <p style={{ fontWeight: "bold" }}>{(page - 1) * rowsPerPage + i + 1}.</p>,
      username: <p style={{ fontWeight: "600" }}>{e.username}</p>,
      name: e.firstName + " " + e.lastName,
      email: e.email,
      pv: e.points,
      tier: (
        <Typography
          sx={{
            color: getArrayObjByValue(STATIC_VARIABLE.levelStatusArray, e.tier).color,
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          {getArrayObjByValue(STATIC_VARIABLE.levelStatusArray, e.tier).label}
        </Typography>
      ),
      upline: e.upLine.firstName + ' ' + e.upLine.lastName,
      uplineUsername: <p style={{ fontWeight: "600" }}>{e.upLine.username}</p>
    };
  });
};

const DownLine = () => {
  const t: any = useTranslations('MyDownline');
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

  const [mainStateSecond, setMainStateSecond] = React.useState({
    list: [],
    page: 1,
    limit: 10,
    total: 10,
    order: "desc",
    orderBy: "createdAt",
  });


const header = [
  { id: "id", label: "", align: "center", sortable: false },
  { id: "username", label: t('U_NAME'), align: "left", sortable: true },
  { id: "name", label: t('NAME'), align: "left", sortable: true },
  { id: "email", label: t('EMAIL'), align: "left", sortable: true},
  { id: "pv", label: t("PV_POINT"), align: "left", sortable: true},
  { id: "tier", label: t("TIER"), align: "left", sortable: true },
];

const header2 = [
  { id: "id", label: "", align: "center", sortable: false },
  { id: "username", label: t('U_NAME'), align: "left", sortable: true },
  { id: "name", label: t('NAME'), align: "left", sortable: true },
  { id: "email", label: t('EMAIL'), align: "left", sortable: true },
  { id: "pv", label: t("PV_POINT"), align: "left", sortable: true},
  { id: "tier", label: t("TIER"), align: "left", sortable: true },
  { id: "upline", label: t("UPLINE_N"), align: "left", sortable: true },
  { id: "uplineUsername", label: t("UPLINE_UN"), align: "left", sortable: true },
];


  React.useEffect(() => {
    handleGetFirstLayerList();
  }, [mainState.page, mainState.order, mainState.orderBy]);

  React.useEffect(() => {
    handleGetSecondLayerList();
  }, [mainStateSecond.page, mainStateSecond.order, mainStateSecond.orderBy]);


  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleGetFirstLayerList = () => {
    const body: GetFistLayerDownlineListAPIProps = {
      page: mainState.page,
      limit: mainState.limit,
      order: mainState.order,
      orderBy: mainState.orderBy,
      setMainState: setStateHelper(setMainState),
      changeContext: _handleChange,
      handleOpenSnackbar,
    };
    handleGetFirstLayerDownlineListAPI(body);
  };

  const handleGetSecondLayerList = () => {
    const body: GetSecondLayerDownlineListAPIProps = {
      page: mainStateSecond.page,
      limit: mainStateSecond.limit,
      order: mainStateSecond.order,
      orderBy: mainStateSecond.orderBy,
      setMainState: setStateHelper(setMainStateSecond),
      changeContext: _handleChange,
      handleOpenSnackbar,
    };
    handleGetSecondLayerDownlineListAPI(body);
  };

  const body = generateBody(mainState.list, mainState.page, mainState.limit);
  const body2 = generateBody2(mainStateSecond.list, mainStateSecond.page, mainStateSecond.limit);

  return (
    <PanelContainerLayout>
      <Typography
        variant="h2"
        sx={{ color: (t) => t.palette.secondary.main, mb: 3, fontSize: 32, fontWeight: 500 }}
      >
        {t('TITLE')}
      </Typography>
      <Box sx={{ width: "100%", mt: 3 }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab sx={{ fontSize: 18 }} label={t('FIRST_L')} value="1" />
              <Tab sx={{ fontSize: 18 }} label={t('SECOND_L')} value="2" />
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
              order={mainStateSecond.order}
              orderBy={mainStateSecond.orderBy}
              setState={setStateHelper(setMainStateSecond)}
              rowsPerPage={mainStateSecond.limit}
              count={mainStateSecond.total}
              page={mainStateSecond.page}
              total={mainStateSecond.total}
              pagination={true}
              class="-striped -highlight"
            />
          </TabPanel>
        </TabContext>
      </Box>
    </PanelContainerLayout>
  );
};

export default DownLine;

export const getServerSideProps = ({ locale, locales }) => {
  return {
    props: {
      messages: {
        ...require(`../../messages/${locale}.json`),
      },
    },
  };
};
