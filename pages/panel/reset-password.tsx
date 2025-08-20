import { Grid, Typography, TextField, Button, Box } from "@mui/material";
import * as React from "react";
import PanelContainerLayout from "../../components/PanelContainerLayout";
import { useProps } from "../../src/context/state";
import { useSnackbarContext } from "../../src/context/snackbar";
import { handleUpdatePasswordAPI, UpdatePasswordAPIProps } from "../../src/controller/account";
import { setStateHelper } from "../../utils";
import { useTranslations } from "use-intl";


const ResetPassword = () => {
  const t:any = useTranslations('ResetPassword');
  const { _handleChange } = useProps();
  const { handleOpenSnackbar } = useSnackbarContext();
  const [mainState, setMainState] = React.useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',

  });


  const handleSetMainState = (event: any) => {
    setStateHelper(setMainState)({ [event.target.id]: event.target.value });
  };

  const handleUpdate = () => {
    const body: UpdatePasswordAPIProps = {
      currentPassword: mainState.currentPassword,
      newPassword: mainState.newPassword,
      confirmPassword: mainState.confirmPassword,
      changeContext: _handleChange,
      handleOpenSnackbar,
    };
    handleUpdatePasswordAPI(body).then((isSuccess: boolean) => {
      if (isSuccess) {
        setMainState({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        })
      }
    });
  };


  return (
    <PanelContainerLayout>
      <Typography
        variant="h2"
        sx={{ color: (t) => t.palette.secondary.main, mb: 3, fontSize: 32, fontWeight: 500 }}
      >
        {t('TITLE')}
      </Typography>
      <Grid container>
        <Grid item xs={12} md={6}>
          <TextField
            id={"currentPassword"}
            sx={{ width: "100%" }}
            label={t('C_PASSWORD')}
            variant="outlined"
            value={mainState.currentPassword}
            onChange={handleSetMainState}
          />
        </Grid>
      </Grid>
      <Grid container sx={{mt: 2}}>
          <Grid item xs={12} md={6}>
          <TextField
            id={"newPassword"}
            sx={{ width: "100%" }}
            label={t('N_PASSWORD')}
            variant="outlined"
            value={mainState.newPassword}
            onChange={handleSetMainState}
          />
        </Grid>
      </Grid>
      <Grid container sx={{mt: 2}}>
          <Grid item xs={12} md={6}>
          <TextField
            id={"confirmPassword"}
            sx={{ width: "100%" }}
            label={t('CON_PASSWORD')}
            variant="outlined"
            value={mainState.confirmPassword}
            onChange={handleSetMainState}
          />
        </Grid>
      </Grid>
      <Button variant="contained" onClick={handleUpdate} sx={{ width: "150px", mt: 3 }}>
        {t('RESET')}
      </Button>
      <Box sx={{ m: 2 }}/>
    </PanelContainerLayout>
  );
};

export default ResetPassword;

export const getServerSideProps = ({ locale, locales }) => {
    return {
        props: {
            messages: {
                ...require(`../../messages/${locale}.json`),
            },
        },
    };
};
