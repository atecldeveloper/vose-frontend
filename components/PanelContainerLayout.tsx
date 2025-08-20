import { Box, Grid, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import * as React from "react";
import ContainerLayout from "../components/ContainerLayout";
import SectionPdContainerLayout from "../components/SectionPdContainerLayout";
import PANEL_MENU from "../src/constants/panelMenu";
import { useProps } from "../src/context/state";
import { useSnackbarContext } from "../src/context/snackbar";
import { handleLogoutAPI } from "../src/controller/account";
import { SnackBarType } from "../src/constants";
import SHOP_PANEL_MENU from "../src/constants/shopPanelMenu";
import { useTranslations } from "next-intl";

type PanelContainerLayoutProps = {
  children: React.ReactNode;
  isShop?: boolean;
};

const PanelContainerLayout = ({ children, isShop = false }: PanelContainerLayoutProps) => {
  const { _handleChange, _handleCleanContext } = useProps();
  const { handleOpenSnackbar } = useSnackbarContext();
  const history = useRouter();
  const t: any = useTranslations(isShop ? 'ShopPanelMenu': 'PanelMenu');

  const menuItem = isShop ? SHOP_PANEL_MENU : PANEL_MENU;
  const sameCurrentPath = (path: string) => {
    return history.pathname === path;
  };

  const handleChangePage = (path: string) => async () => {
    if (!path) {
      const { success } = await handleLogoutAPI({
        changeContext: _handleChange,
        handleOpenSnackbar,
      });

      if (success) {
        handleOpenSnackbar(`Successfully logged out`, SnackBarType.Success);
        _handleCleanContext();
        history.push("/");
      }
    } else {
      history.push(path);
    }
  };

  return (
    <ContainerLayout>
      <SectionPdContainerLayout innerStyle={{ p: {xs: 1, md: 5} }}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                borderColor: (t) => t.palette.background.paper,
                borderStyle: "solid",
                borderWidth: 0,
                borderTopWidth: "1px",
              }}
            >
              {menuItem.map((e: any) => {
                return (
                  <Stack
                    alignItems="center"
                    sx={{
                      borderColor: (t) => t.palette.background.paper,
                      borderStyle: "solid",
                      borderWidth: 0,
                      borderBottomWidth: "1px",
                      py: 2,
                      cursor: "pointer",
                      color: sameCurrentPath(e.path) ? "white" : (t) => t.palette.secondary.light,
                      backgroundColor: sameCurrentPath(e.path) ? (t) => t.palette.secondary.light : "white",
                      "&:hover": {
                        color: "white",
                        backgroundColor: (t) => t.palette.secondary.light,
                      },
                    }}
                    onClick={handleChangePage(e.path)}
                  >
                    <Typography sx={{ fontWeight: "500" }}>{t(e.label)}</Typography>
                  </Stack>
                );
              })}
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            {children}
          </Grid>
        </Grid>
      </SectionPdContainerLayout>
    </ContainerLayout>
  );
};

export default PanelContainerLayout;
