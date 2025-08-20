import * as React from "react";
import {Box, Grid, TextField, Divider, Typography, Stack, InputAdornment, IconButton, Button, MenuItem} from "@mui/material";
import PanelContainerLayout from "../../components/PanelContainerLayout";
import { setStateHelper } from "../../utils";
import {useProps} from "../../src/context/state";
import {useSnackbarContext} from "../../src/context/snackbar";
import { handleGetShopCertDetailsAPI } from "../../src/controller/shop";
import DownloadButton from "../../components/DownloadButton";
import CustomDataTable from "../../components/CustomDataTable";
import { useTranslations } from "next-intl";

const generateBody = (body: any) => {
  return body.map((e: any, i: number) => {
    return {
      id: <p style={{ fontWeight: "bold" }}>{i + 1}.</p>,
      name: e.name,
      ic: e.ic,
      photo:
      <img
       width="100%"
       style={{ objectFit: "cover", minWidth: '100px'  }}
       src={e.photos[0] && e.photos[0]}
     />,
     photo2:
     <img
      width="100%"
      style={{ objectFit: "cover", minWidth: '100px'  }}
      src={e.photos[1] && e.photos[1]}
    />,
    };
  });
};


const CompanyInfo = () => {
  const { _handleChange } = useProps();
  const { handleOpenSnackbar } = useSnackbarContext();
  const t = useTranslations('ShopDocInfo');
  const [mainState, setMainState] = React.useState({
    ssmID: "",
    ssmNumber: '',
    partnerList: [],
    certs: [],
    shopPhotos: [],
  });

  React.useEffect(() => {
    handleGetDetails();
  }, [])

  const header = [
    { id: "id", label: "", align: "center", sortable: false },
    { id: "name", label: t('PARTNER_NAME'), align: "left", sortable: false },
    { id: "ic", label: t('PARTNER_IC'), align: "left", sortable: false },
    { id: "photo", label: "", align: "center", sortable: false },
    { id: "photo2", label: "", align: "center", sortable: false },
  ];

  const handleGetDetails = () => {
      const body = {
        setMainState: setStateHelper(setMainState),
        changeContext: _handleChange,
        handleOpenSnackbar
      }

      handleGetShopCertDetailsAPI(body);
  }

  const body = generateBody(mainState.partnerList);

  return (
    <PanelContainerLayout isShop>
      <Box>
        <Typography
          variant="h2"
          sx={{ color: (t) => t.palette.secondary.main, mb: 3, fontSize: 32, fontWeight: 500 }}
        >
          {t('TITLE')}
        </Typography>
        <Typography sx={{ color: (t) => t.palette.secondary.light, mt: 2, mb: 2, fontSize: 24 }}>
          {t('DOC_INFO')}
        </Typography>
        <Divider sx={{ mb: 4 }} />
        <Grid container spacing={3}>
          <Grid item xs={6}>
          <TextField
              sx={{ width: "100%" }}
              label={t('SSM_NO')}
              variant="outlined"
              value={mainState.ssmID}
              disabled
              InputLabelProps={{
                shrink: true,
              }}
            />
            </Grid>
        </Grid>
        <Typography sx={{ color: (t) => t.palette.secondary.light, mt: 4, mb: 2, fontSize: 24 }}>
        {t('DOCS')}
        </Typography>
        <Divider sx={{ mb: 4 }} />
        <Grid container spacing={3}>
          {mainState.certs.map((e: any, i) => (
              <Grid item xs={4}>
                <DownloadButton name={`Document ${i+1}`} path={e.path}/>
                {/* <DownloadButton name={i === 0 ? 'Borang A' : 'Borang B'} path={e.path}/> */}
              </Grid>
          ))}

          {!mainState.certs.length && <Typography sx={{ px: 3 }}>No Files</Typography>}

        </Grid>

        <Typography sx={{ color: (t) => t.palette.secondary.light, mt: 8, mb: 2, fontSize: 24 }}>
        {t('SHOP_PHOTOS')}
        </Typography>
        <Divider sx={{ mb: 4 }} />
        <Grid container spacing={3}>
          {mainState.shopPhotos.map((e: any) => (
              <Grid item xs={4}>
                <img src={e.path} style={{ maxWidth: '100%' }}/>
              </Grid>
          ))}
        </Grid>

        <Typography sx={{ color: (t) => t.palette.secondary.light, mt: 8, mb: 2, fontSize: 24 }}>
        {t('PARTNER_DETAILS')}
        </Typography>
        <Divider sx={{ mb: 4 }} />

        <CustomDataTable
          header={header}
          myData={body}
          // myData={data}
          pagination={false}
          class="-striped -highlight"
        />
      </Box>

    </PanelContainerLayout>
  );
};

export default CompanyInfo;

export const getServerSideProps = ({ locale, locales }) => {
  return {
    props: {
      messages: {
        ...require(`../../messages/${locale}.json`),
      },
    },
  };
};

