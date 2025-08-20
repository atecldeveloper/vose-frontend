import { Stack, Grid, Typography, Box, Button } from "@mui/material";
import * as React from "react";
import ContainerLayout from "../../components/ContainerLayout";
import SectionPdContainerLayout from "../../components/SectionPdContainerLayout";
import {useTranslations} from "next-intl";


const Formula = () => {
  const t = useTranslations("BrandPage");
  const tb = useTranslations("Button");

  return (
    <ContainerLayout>
      <SectionPdContainerLayout innerStyle={{ pt: 10 }}>
        <Stack alignItems="flex-end" sx={{ position: "relative" }}>
          <Box sx={{ position: { xs: "relative", md: "absolute" }, left: 0, width: "70%" }}>
            <img width={"100%"} src={"/assets/about/formula-woman.png"} />
          </Box>
          <Stack
            alignItems="flex-end"
            sx={{ position: "relative", mb: 4, py: 4, width: { xs: "100%", md: "50%" } }}
          >
            <Box sx={{ position: "relative" }}>
              <Box
                sx={{
                  position: "absolute",
                  height: 30,
                  width: "40%",
                  backgroundColor: (t) => t.palette.primary.light,
                  bottom: 1,
                  left: -14,
                  zIndex: 0,
                }}
              />
              <Typography
                variant="h1"
                sx={{
                  color: (t) => t.palette.secondary.main,
                  mt: 2,
                  position: "relative",
                  fontWeight: 400,
                  zIndex: 10,
                }}
              >
                {t('BF_SC_1_TITLE')}
              </Typography>
            </Box>
            <Typography
              variant="h1"
              sx={{
                color: (t) => t.palette.secondary.main,
                position: "relative",
                fontWeight: 400,
              }}
            >
              {t('BF_SC_1_TITLE_2')}
            </Typography>
            <Typography
              sx={{
                color: (t) => t.palette.gary.light,
                fontSize: 20,
                mt: { xs: 0, md: 4 },
              }}
            >
              {t('BF_SC_1_DES')}
            </Typography>
          </Stack>
        </Stack>
        <Grid container spacing={6} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={5} order={{ xs: 2, md: 1 }}>
            <Typography
              sx={{
                color: (t) => t.palette.gary.light,
                fontSize: 20,
              }}
            >
              {t('BF_SC_2_DES')}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={7} order={{ xs: 1, sm: 2 }}>
            <Box sx={{ position: "relative" }}>
              <img width={"100%"} src={"/assets/brand/flow-1.png"} />
            </Box>
          </Grid>
        </Grid>
        <Typography
          sx={{
            color: (t) => t.palette.gary.light,
            fontSize: 20,
            pt: 7,
            pb: 7
          }}
        >
          {t('BF_SC_3_DES')}
        </Typography>
      </SectionPdContainerLayout>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          height: { xs: "40vh", md: "60vh" },
          backgroundColor: "white",
          backgroundImage: `url(/assets/contact/contact-section-bg.png)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPositionY: "bottom",
          zIndex: 10,
          minHeight: "20vh",
        }}
      >
        <Typography variant="h2" sx={{ color: (t) => t.palette.secondary.main }}>
          {t('BF_QUE_TITLE')}
        </Typography>
        <Box sx={{ m: 2 }} />

        <Button variant="contained" sx={{ width: "200px" }}>
          {tb('CONTACT_US')}
        </Button>
      </Stack>
    </ContainerLayout>
  );
};

export default Formula;

export const getServerSideProps = ({ locale, locales }) => {
    return {
        props: {
            messages: {
                ...require(`../../messages/${locale}.json`),
            },
        },
    };
};
