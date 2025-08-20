import { Stack, Grid, Typography, Box, Button, useTheme, useMediaQuery } from "@mui/material";
import * as React from "react";
import ContainerLayout from "../../components/ContainerLayout";
import SectionPdContainerLayout from "../../components/SectionPdContainerLayout";
import {useTranslations} from "next-intl";

const OurStory = () => {
  const t = useTranslations("BrandPage");
  const tb = useTranslations("Button");
  const theme = useTheme();
  const isSmallSize = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <ContainerLayout>
      <SectionPdContainerLayout innerStyle={{ pt: 10 }}>
        <Grid container alignItems={"flex-start"} spacing={6}>
          <Grid item md={12} lg={6.5}>
            <Stack alignItems="flex-end" sx={{ position: "relative", mr: {md: 0, lg:-15}, mb: 4, py: 4 }}>
              <Typography sx={{ color: (t) => t.palette.secondary.light, fontSize: 24 }}>
                {t('BS_SC_1_AB')}
              </Typography>
              <Box sx={{ position: "relative" }}>
                <Box
                  sx={{
                    position: "absolute",
                    height: 30,
                    width: "48%",
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
                  {t('BS_SC_1_TITLE')}
                </Typography>
              </Box>
            </Stack>
              <Typography
                  sx={{
                      color: (t) => t.palette.gary.light,
                      fontSize: 20,
                      whiteSpace: 'break-spaces',
                      mb: 2,
                  }}
              >
                  {t('BS_SC_1_NAME_1')}
              </Typography>
            <Typography
              sx={{
                color: (t) => t.palette.gary.light,
                fontSize: 20,
                whiteSpace: 'break-spaces'
              }}
            >
             {t('BS_SC_1_DES_1')}
            </Typography>
          </Grid>
          <Grid item md={12} lg={5}>
            <img width={'100%'} src={"/assets/brand/shilla-photo.jpg"} />
          </Grid>
        </Grid>
        <Typography
          sx={{
            color: (t) => t.palette.gary.light,
            fontSize: 20,
            mt: 6,
            whiteSpace: 'break-spaces'
          }}
        >
          {t('BS_SC_1_DES_2')}
        </Typography>
        <Grid container alignItems={"flex-start"} spacing={6} sx={{mt: 5}}>
          <Grid item md={12} lg={5} sx={{position: 'relative'}}>
            <img width={'100%'} src={"/assets/brand/chris-photo.png"} />
            {/*<Stack alignItems="flex-start" sx={{ position: "absolute", bottom: 0, right: 0 }}>*/}
            {/*  <img width={'240px'} src="/assets/brand/4-logo.png"/>*/}
            {/*</Stack>*/}
          </Grid>
          <Grid item md={12} lg={6.5}>
          < Stack alignItems="flex-start" sx={{ position: "relative", ml: {md: 0, lg:-15} }}>
              <Box sx={{ position: "relative" }}>
                <Box
                  sx={{
                    position: "absolute",
                    height: 30,
                    width: "48%",
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
                  {t('BS_SC_2_TITLE')}
                </Typography>
              </Box>
            </Stack>
              <Typography
                  sx={{
                      mt: 2,
                      color: (t) => t.palette.gary.light,
                      fontSize: 20,
                      whiteSpace: 'break-spaces'
                  }}
              >
                  {t('BS_SC_1_NAME_2')}
              </Typography>
          <Typography
              sx={{
                mt: 2,
                color: (t) => t.palette.gary.light,
                fontSize: 20,
                whiteSpace: 'break-spaces'
              }}
            >
             {t('BS_SC_2_DES_1')}
            </Typography>

          </Grid>
        </Grid>
        <Typography
            sx={{
              mt: 2,
              color: (t) => t.palette.gary.light,
              fontSize: 20,
              whiteSpace: 'break-spaces'
            }}
          >
            {t('BS_SC_2_DES_2')}
          </Typography>


          <Grid container spacing={5} sx={{ mt: 4, mb: 8 }}>
          <Grid item xs={6} md={6} lg={3}>
            <Stack alignItems="flex-end" >
              <img width={isSmallSize ? 150 : 300} height={isSmallSize ? 100 : 200} style={{objectFit: 'contain'}} src={"/assets/brand/flow-1.png"} />
              <img width={100} style={{ margin: "20px  0px" }} src={"/assets/about/arror.png"} />
            </Stack>
          </Grid>
          <Grid item xs={6} md={6} lg={3}>
            <Stack alignItems="flex-end" >
              <img width={100} style={{ margin: "20px  0px" }} src={"/assets/about/arror.png"} />
              <img  width={isSmallSize ? 125 : 250} height={isSmallSize ? 100 : 200} style={{objectFit: 'contain'}} src={"/assets/brand/flow-2.png"} />
            </Stack>
          </Grid>
          <Grid item xs={6} md={6} lg={3}>
            <Stack alignItems="flex-end" >
              <img width={ isSmallSize ? 150 : 300} height={isSmallSize ? 100 : 200} style={{objectFit: 'contain'}} src={"/assets/brand/3.png"} />
              <img width={100} style={{ margin: "20px  0px" }} src={"/assets/about/arror.png"} />
            </Stack>
          </Grid>
          <Grid item xs={6} md={6} lg={3}>
            <Stack alignItems="flex-end" >
              <Box sx={{ margin: "-10px 0px" }} />
              <img  width={isSmallSize ? 150 : 250} height={isSmallSize ? 150 : 250} style={{objectFit: 'contain'}} src={"/assets/brand/8.png"} />
            </Stack>
          </Grid>
        </Grid>
        <Grid container alignItems="center" spacing={6} sx={{ mt: 6 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h2" sx={{ color: (t) => t.palette.secondary.main }}>
              {t('BS_SC_3_TITLE')}
            </Typography>
            <Typography
              sx={{
                color: (t) => t.palette.gary.light,
                fontSize: 20,
                mt: 6,
              }}
            >
              {t('BS_SC_3_DES')}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{position: 'relative'}}>
            <img width={"100%"} src={"/assets/brand/Slice.png"} />
            <Box
              sx={{
                position: "absolute",
                height: 50,
                width: "48%",
                backgroundColor: (t) => t.palette.primary.light,
                bottom: -10,
                left:{xs: -30, md: -50},
                zIndex: 0,
              }}
            />
            </Box>
          </Grid>
        </Grid>
        <Grid container alignItems="center"  spacing={6} sx={{ mt: 6 }}>
          <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
            <Box sx={{position: 'relative'}}>
            <img width={"100%"} src={"/assets/about/about-vision2.jpg"}/>
            <Box
              sx={{
                position: "absolute",
                height: 50,
                width: "48%",
                backgroundColor: (t) => t.palette.primary.light,
                bottom: -10,
                right: {xs: -20, md: -50},
                zIndex: 0,
              }}
            />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}  order={{ xs: 1, md: 2 }}>
            <Typography variant="h2" sx={{ color: (t) => t.palette.secondary.main }}>
            {t('BS_SC_4_TITLE')}
            </Typography>
            <Typography
              sx={{
                color: (t) => t.palette.gary.light,
                fontSize: 20,
                mt: 6,
              }}
            >
              {t('BS_SC_4_DES')}
            </Typography>
          </Grid>
        </Grid>
      </SectionPdContainerLayout>
      <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            height: {xs: '40vh', md: "60vh"},
            backgroundColor: 'white',
            backgroundImage: `url(/assets/contact/contact-section-bg.png)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPositionY: 'bottom',
            zIndex: 10,
            minHeight: '20vh'
          }}
        >
          <Typography variant="h2" sx={{ color: (t) => t.palette.secondary.main }}>
            {t('BS_QUE_TITLE')}
          </Typography>
          <Box sx={{ m: 2 }} />

          <Button variant="contained" sx={{ width: "200px" }}>
            {tb('CONTACT_US')}
          </Button>
        </Stack>
    </ContainerLayout>
  );
};

export default OurStory;

export const getServerSideProps = ({ locale, locales }) => {
    return {
        props: {
            messages: {
                ...require(`../../messages/${locale}.json`),
            },
        },
    };
};
