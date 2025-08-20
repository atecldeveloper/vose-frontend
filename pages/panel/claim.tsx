import { Box, Divider, IconButton, Grid, Typography, TextField, MenuItem, Button } from "@mui/material";
import * as React from "react";
import PanelContainerLayout from "../../components/PanelContainerLayout";
import {formatDateRange, getArrayObjByLabel, getArrayObjByValue, setPriceFormat, setStateHelper} from "../../utils";
import CustomDataTable from "../../components/CustomDataTable";
import { useProps } from "../../src/context/state";
import { useSnackbarContext } from "../../src/context/snackbar";
import { STATIC_VARIABLE } from "../../src/constants/staticData";
import OrderDetailsModal from "../../components/modal/OrderDetailsModal";
import { GetVoucherListAPIProps, handleGetVoucherListAPI } from "../../src/controller/voucher";
import {
  handleGetBankAPI,
  handleUpdateBankAPI,
  handleUpdateImageAPI,
  UpdateBankAPIProps
} from "../../src/controller/account";
import { handleGetClaimListAPI } from "../../src/controller/claim";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import moment from "moment";
import MonthlyDataPicker from "../../components/DateMonthPicker";
import TooltipIcon from "../../components/TooltipIcon";
import ClaimDetailsModal from "../../components/modal/ClaimDetailsModal";
import VisibilityIcon from '@mui/icons-material/Visibility';
import {UploadWithShowLink} from "../../components/UploadWithShowLink";
import { useTranslations } from "use-intl";


const generateBody = (body: any, page: number, rowsPerPage: number, handleReview: (id: number) => void) => {
  return body.map((e: any, i: number) => {
    const claimStatusID = e.claimStatus;
    const claimStatusLabel = getArrayObjByValue(STATIC_VARIABLE.claimStatusArray, e.claimStatus).label;
    const isClaimed = claimStatusID == getArrayObjByLabel(STATIC_VARIABLE.claimStatusArray, "Claimed").value;
    return {
      createdAt: moment(e.createdAt).format("MMM YYYY"),
      firstLayer: e.firstLayer,
      secondLayer: e.secondLayer,
      shopLayer: e.shopLayer,
      targetComplete: e.targetComplete ? (
        <CheckCircleOutlineIcon color="success" />
      ) : (
        <CancelOutlinedIcon color="error" />
      ),
      total: <b style={{whiteSpace: 'break-spaces'}}>RM {setPriceFormat(e.total)}</b>,
      claimStatus: <Typography sx={{color: (t) => isClaimed ? t.palette.success.main : t.palette.warning.main, fontSize: 16, fontWeight: 'bold'}}>{claimStatusLabel}</Typography>,
      view:  <IconButton
      onClick={() => handleReview(e.ID)}
    >
      <VisibilityIcon/>
    </IconButton>
    };
  });
};

const Claim = () => {
  const t:any = useTranslations('MonthlyClaim');
  const { _handleChange } = useProps();
  const { handleOpenSnackbar } = useSnackbarContext();
  const modalRef = React.useRef<any>();
  const icRef = React.useRef<any>();
  const [bankInfo, setBankInfo] = React.useState({
    name: "",
    bankNo: "",
    bank: "",
    icImg: ""
  });

  const [dateRange, setDateRange] = React.useState({
    from: {year: 2020, month: 1},
    to: {year: parseInt(moment().format('YYYY')), month: parseInt(moment().format('MM'))},
  })

  const [mainState, setMainState] = React.useState({
    list: [],
    page: 1,
    limit: 10,
    total: 10,
    order: "desc",
    orderBy: "createdAt",
    upgradeDirect: 10
  });


const header = [
  { id: "createdAt", label: t('DATE'), align: "center", sortable: false },
  { id: "firstLayer", label: t('FL'), align: "left", sortable: false },
  { id: "secondLayer", label: t('SL'), align: "left", sortable: false },
  { id: "shopLayer", label: t('SHOP_CLAIM'), align: "left", sortable: false },
  { id: "targetComplete", label:  <div style={{lineHeight: '1px', display: 'flex', flexDirection: 'row', alignItems:'center'}}>
  <p style={{lineHeight: 1}}>{t('TARGET_COMPLETE')}</p>
  <TooltipIcon isQuestion text={
    <div>
      <div>✅ {t('T_C_S', {upgradeDirect: mainState.upgradeDirect})}</div>
      <div>❌ {t('T_C_F', {upgradeDirect: mainState.upgradeDirect})}</div>
    </div>
  }/>
</div>
, align: "center", sortable: false },
  { id: "total", label: t('TOTAL'), align: "left", sortable: false },
  { id: "claimStatus", label: t('STATUS'), align: "left", sortable: false },
  { id: "view", label: "", align: "left", sortable: false },
];


  React.useEffect(() => {
    handleGetBank();
  }, []);

  React.useEffect(() => {
    handleGetClaimList();
  }, [mainState.page, mainState.order, mainState.orderBy, dateRange])

  const handleGetBank = async () => {
    await handleGetBankAPI({
      setMainState: setStateHelper(setBankInfo),
      changeContext: _handleChange,
      handleOpenSnackbar,
    })
  }

  const handleGetClaimList = () => {
    const body: GetVoucherListAPIProps = {
      page: mainState.page,
      limit: mainState.limit,
      order: mainState.order,
      orderBy: mainState.orderBy,
      startDate: formatDateRange(dateRange.from),
      endDate: formatDateRange(dateRange.to),
      setMainState: setStateHelper(setMainState),
      changeContext: _handleChange,
      handleOpenSnackbar,
    };
    handleGetClaimListAPI(body);
  };

  const handleSetMainState = (event: any) => {
    setStateHelper(setBankInfo)({ [event.target.id]: event.target.value });
  };

  const handleChangeSelect = (event: any) => {
    setStateHelper(setBankInfo)({ [event.target.name]: event.target.value });
  }

  const handleDateChange = (dateObj: any) => {
    setDateRange(dateObj)
  }

  const handleUpdate = () => {
    const body: UpdateBankAPIProps = {
      bank: bankInfo.bank,
      bankNo: bankInfo.bankNo,
      name: bankInfo.name,
      changeContext: _handleChange,
      handleOpenSnackbar,
    };
    handleUpdateBankAPI(body);
  };

  const handleSubmitImage = (files: any) => async () => {
    await handleUpdateImageAPI({
      files: files,
      changeContext: _handleChange,
      handleOpenSnackbar,
    })
  }

  const handleReview = (id) => {
    modalRef.current.handleSetID(id);
    modalRef.current.handleOpen();
  }

  const body = generateBody(mainState.list, mainState.page, mainState.limit, handleReview);

  return (
    <PanelContainerLayout>
      <Typography
        variant="h2"
        sx={{ color: (t) => t.palette.secondary.main, mb: 3, fontSize: 32, fontWeight: 500 }}
      >
        {t('TITLE')}
      </Typography>
      <Typography sx={{ color: (t) => t.palette.secondary.light, fontSize: 24, my: 2 }}>{t('BANK_INFO')}</Typography>
      <Divider sx={{ mb: 4 }} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            id={"name"}
            sx={{ width: "100%" }}
            label={t('BANK_ACC_N')}
            variant="outlined"
            value={bankInfo.name}
            onChange={handleSetMainState}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id={"bankNo"}
            sx={{ width: "100%" }}
            label={t('BANK_ACC_No')}
            variant="outlined"
            value={bankInfo.bankNo}
            onChange={handleSetMainState}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            sx={{ width: "100%" }}
            select
            name="bank"
            label={t('BANK')}
            value={bankInfo.bank}
            onChange={handleChangeSelect}
          >
            {STATIC_VARIABLE.malaysiaBankArray.map((option: any) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <Typography sx={{ color: (t) => t.palette.error.main, fontSize: 18, mt: 3 }}>
        {t('NOTE')}
      </Typography>
      <Button variant="contained" onClick={handleUpdate} sx={{ width: "150px", mt: 3 }}>
        {t('UPDATE')}
      </Button>


      <Typography sx={{ color: (t) => t.palette.secondary.light, mt: 4, mb: 2, fontSize: 24 }}>
        {t('IC_PHOTO')}
      </Typography>
      <Divider sx={{ mb: 4 }} />
      <Grid container sx={{ mb: '70px' }}>
        <Grid item xs={6}>
          <UploadWithShowLink
              ref={icRef}
              initialImg={bankInfo.icImg}
              handleSubmit={handleSubmitImage}
              handleDelete={() => {}}
          />
        </Grid>
      </Grid>


      <Typography sx={{ color: (t) => t.palette.secondary.light, fontSize: 24, mt: 5, mb: 2 }}>
        {t('MONTHLY_CLAIM')}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{width: '230px'}}>
        <MonthlyDataPicker
            range={dateRange}
            onChange={handleDateChange}
        />
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
      <ClaimDetailsModal ref={modalRef}/>
    </PanelContainerLayout>
  );
};

export default Claim;

export const getServerSideProps = ({ locale, locales }) => {
  return {
    props: {
      messages: {
        ...require(`../../messages/${locale}.json`),
      },
    },
  };
};
