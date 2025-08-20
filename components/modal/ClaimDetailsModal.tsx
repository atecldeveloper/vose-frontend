import React, { useImperativeHandle } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack, Typography, Box, Tab, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { setPriceFormat, setStateHelper } from "../../utils";
import CustomDataTable from "../CustomDataTable";
import { GetClaimDetailsAPIProps, handleGetClaimDetailsAPI } from "../../src/controller/claim";
import { useProps } from "../../src/context/state";
import { useSnackbarContext } from "../../src/context/snackbar";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useTranslations } from "use-intl";
type ClaimDetailsModalProps = {
};



const generateBodyRate = (body) => {
  let arr = body.map((e, i) => ({
    layer: e.id,
    normalRate: e.normalRate + "%",
    targetPV: e.targetPV,
    targetRate: e.targetRate + "%",
  }));

  return arr;
};

const generateBody = (body, totalCommission) => {
  let arr = body.map((e, i) => ({
    layer: e.id,
    point: e.point,
    rate: e.rate + "%",
    commission: "RM " + setPriceFormat(e.commission),
  }));

  arr.push({
    id: "",
    point: "",
    rate: <div style={{fontWeight: 'bold'}}>Total:</div>,
    commission: <div style={{fontWeight: 'bold'}}>RM {totalCommission}</div>,
  });

  return arr;
};


const ClaimDetailsModal = React.forwardRef<any, ClaimDetailsModalProps>(({}, ref) => {
  const t: any = useTranslations('ClaimModal');
  const {_handleChange} = useProps();
  const {handleOpenSnackbar} = useSnackbarContext();
  const [open, setOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState("1");
  const [mainState, setMainState] = React.useState({
    list: [],
    rateList: [],
    id: 0,
    totalCommission: 0,
    downlineTarget: 0,
    downlineTargetHit: 0,
    targetPV: 0,
    fTargetPv: 0
  });

  const header_rate = [
    { id: "layer", label: "", align: "center", sortable: false },
    { id: "normalRate", label: t('COMMISSION_R'), align: "left", sortable: false },
    { id: "targetPV", label: t('PV_TARGET'), align: "left", sortable: false },
    { id: "targetRate", label: t('COMMISSION_T_R'), align: "left", sortable: false },
  ];

  const header = [
    { id: "layer", label: "", align: "center", sortable: false },
    { id: "point", label: t('TOTAL_PV'), align: "left", sortable: false },
    { id: "rate", label: t('COMMISSION_R'), align: "left", sortable: false },
    { id: "commission", label: t('AMOUNT'), align: "left", sortable: false },
  ];


  React.useEffect(() => {
    handleGetDate();
  }, [mainState.id]);

  const handleGetDate = () => {
    if (mainState.id) {
      const params: GetClaimDetailsAPIProps = {
        t,
        ID: mainState.id,
        setMainState: setStateHelper(setMainState),
        changeContext: _handleChange,
        handleOpenSnackbar
      }
      handleGetClaimDetailsAPI(params)
    }
  };

  const handleSetID = (id: number) => setStateHelper(setMainState)({id: id})
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setMainState({
      list: [],
      rateList: [],
      id: 0,
      totalCommission: 0,
      downlineTarget: 0,
      downlineTargetHit: 0,
      targetPV: 0,
      fTargetPv: 0
    })
    setOpen(false)
  };
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useImperativeHandle(ref, () => ({
    handleOpen,
    handleClose,
    handleSetID,
  }));

  const body = generateBody(mainState.list, mainState.totalCommission);

  const bodyRate = generateBodyRate(mainState.rateList);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={"sm"}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        style: {
          padding: '30px 10px',
          backgroundColor: "white",
          minWidth: '50vw',
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <DialogTitle sx={{ padding: 1 }} id="alert-dialog-title">
      <Stack direction="row" justifyContent="space-between">
        <Typography sx={{ fontWeight: "700", fontSize: 24}} >{t('TITLE')}</Typography>
          <IconButton aria-label="delete" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab sx={{ fontSize: 18 }} label={t('COMMISSION')} value="1" />
                <Tab sx={{ fontSize: 18 }} label={t('RNM')} value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <CustomDataTable
                header={header}
                myData={body}
                pagination={false}
                class="-striped -highlight"
              />
            </TabPanel>
            <TabPanel value="2">
              <CustomDataTable
                header={header_rate}
                myData={bodyRate}
                pagination={false}
                class="-striped -highlight"
              />
              <Typography sx={{fontSize: 16, fontWeight: 'bold', mt: 3}}>
                {t('TARGET_D')}
              </Typography>
              <Typography sx={{fontSize: 14, my: '3px',fontWeight: 'bold', color: t => mainState.downlineTargetHit > mainState.downlineTarget ? t.palette.success.main : t.palette.error.main }}>
                <InfoOutlinedIcon fontSize={'small'} sx={{mb: -1}}/> {t('CONDITION_1_0')} {mainState.downlineTarget} {t('CONDITION_1_1')} : {mainState.downlineTargetHit} / {mainState.downlineTarget}
              </Typography>
              <Typography sx={{fontSize: 14, fontWeight: 'bold', color: t => mainState.fTargetPv > mainState.targetPV ? t.palette.success.main : t.palette.error.main  }}>
              <InfoOutlinedIcon fontSize={'small'} sx={{mb: '-6px'}}/> {t('CONDITION_2_0')} {mainState.targetPV} point
              </Typography>
            </TabPanel>
            </TabContext>
      </Box>
    </Dialog>
  );
});

ClaimDetailsModal.displayName = 'ClaimDetailsModal';

export default ClaimDetailsModal;




// const header_rate = [
//   { id: "layer", label: "", align: "center", sortable: false },
//   { id: "normalRate", label: "Commission Rate(%)", align: "left", sortable: false },
//   { id: "targetPV", label: "PV Target", align: "left", sortable: false },
//   { id: "targetRate", label: "Commission Target Rate(%)", align: "left", sortable: false },
// ];

// const header = [
//   { id: "layer", label: "", align: "center", sortable: false },
//   { id: "point", label: "Total PV", align: "left", sortable: false },
//   { id: "rate", label: "Commission Rate", align: "left", sortable: false },
//   { id: "commission", label: "Amount(RM)", align: "left", sortable: false },
// ];

// const generateBodyRate = (body) => {
//   let arr = body.map((e, i) => ({
//     layer: e.id,
//     normalRate: e.normalRate + "%",
//     targetPV: e.targetPV + "PV",
//     targetRate: e.targetRate + "%",
//   }));

//   return arr;
// };

// const generateBody = (body, totalCommission) => {
//   let arr = body.map((e, i) => ({
//     layer: e.id,
//     point: e.point + "PV",
//     rate: e.rate + "%",
//     commission: "RM " + e.commission,
//   }));

//   arr.push({
//     id: "",
//     point: "",
//     rate: <div className="f-w-600">Total:</div>,
//     commission: <div className="f-w-600">RM {totalCommission}</div>,
//   });

//   return arr;
// };

// const DetailsSetCommission = ({ commissionDetails, rateDetails }) => {
//   const [tabIndex, setTabIndex] = useState(0);
//   const [mainState, setMainState] = useState({
//     list: [],
//     rateList: [],
//     id: 0,
//   });

//   useEffect(() => {
//     if (commissionDetails) {
//       let list = [];
//       list.push({ id: "1st Layer", ...commissionDetails.firstLayer });
//       list.push({ id: "2nd Layer", ...commissionDetails.secondLayer });
//       list.push({ id: "Shop", ...commissionDetails.shopLayer });

//       let listRate = [];
//       listRate.push({ id: "1st Layer", ...rateDetails.firstLayer });
//       listRate.push({ id: "2nd Layer", ...rateDetails.secondLayer });
//       listRate.push({ id: "Shop", ...rateDetails.shopLayer });

//       setStateHelper(setMainState)({ list: list, rateList: listRate });
//     }
//   }, [commissionDetails, rateDetails]);

//   const body = generateBody(mainState.list, commissionDetails.totalCommission);

//   const bodyRate = generateBodyRate(mainState.rateList);

//   return (
//     <Fragment>
//       <Tabs
//         defaultIndex={tabIndex}
//         onSelect={(e) => {
//           setTabIndex(e);
//         }}
//       >
//         <TabList className="nav nav-tabs customize-filter-tab-header">
//           <Tab className="nav-link">Commission</Tab>
//           <Tab className="nav-link">{"Rate & Mission"}</Tab>
//         </TabList>
//         <TabPanel>
//           <Form className="needs-validation user-add" noValidate="">
//             <Datatable
//               header={header}
//               myData={body}
//               pageSize={10}
//               pagination={false}
//               class="-striped -highlight"
//             />
//           </Form>
//         </TabPanel>
//         <TabPanel>
//           <Form className="needs-validation user-add" noValidate="">
//             <CustomDataTable
//               header={header_rate}
//               myData={bodyRate}
//               pageSize={10}
//               pagination={false}
//               class="-striped -highlight"
//             />

//             <div style={{ marginTop: 20 }}>
//               <span className="customize-commission-target-text">
//               <div
//                   style={{ marginTop: -2, fontSize: 14, color: 'black !important' }}
//                 >
//                     Hit all target below to get Commission Target Rate(%) .
//                 </div>
//                 </span>
//                 </div>
//             <div style={{ marginTop: 10, marginLeft: 5 }}>
//               <span className="customize-commission-target-text">
//                 <i
//                   className={
//                     rateDetails.isHitTarget
//                       ? "fa fa-check-circle-o customize-commission-green"
//                       : "fa fa-times-circle-o customize-commission-red"
//                   }
//                   style={{
//                     paddingRight: 10,
//                     fontSize: 17,
//                   }}
//                 >
//                   {" "}
//                 </i>
//                 <div
//                   className={
//                     commissionDetails.downlineTargetHit >= commissionDetails.downlineTarget ? "customize-commission-green" : "customize-commission-red"
//                   }
//                   style={{ marginTop: -2 }}
//                 >
//                     personal sales more then {commissionDetails.downlineTarget} order: {commissionDetails.downlineTargetHit} / {commissionDetails.downlineTarget}
//                 </div>

//               </span>
//             </div>
//             <div style={{ marginTop: 10, marginLeft: 5 }}>
//               <span className="customize-commission-target-text">
//                 <i
//                   className={
//                     commissionDetails.firstLayer.point >= rateDetails.firstLayer.targetPV
//                       ? "fa fa-check-circle-o customize-commission-green"
//                       : "fa fa-times-circle-o customize-commission-red"
//                   }
//                   style={{
//                     paddingRight: 10,
//                     fontSize: 17,
//                   }}
//                 >
//                   {" "}
//                 </i>
//                 <div
//                   className={
//                     commissionDetails.firstLayer.point >= rateDetails.firstLayer.targetPV ? "customize-commission-green" : "customize-commission-red"
//                   }
//                   style={{ marginTop: -2 }}
//                 >
//                   1st Layer PV point hit {rateDetails.firstLayer.targetPV} PV the target
//                 </div>

//               </span>
//             </div>

//           </Form>
//         </TabPanel>
//       </Tabs>
//     </Fragment>
//   );
// };

// export default DetailsSetCommission;
