import { Stack, Grid, Typography, Box, Button, useTheme, useMediaQuery } from "@mui/material";
import * as React from "react";
import ContainerLayout from "../../components/ContainerLayout";
import SectionPdContainerLayout from "../../components/SectionPdContainerLayout";
import {useTranslations} from "next-intl";
import {useRouter} from "next/router";


const Formula = () => {
  const t = useTranslations("BrandPage");
  const tb = useTranslations("Button");
  const { locale } = useRouter();
  const isZh = locale == 'cn';
  const theme = useTheme();
  const isSmallSize = useMediaQuery(theme.breakpoints.down('md'));
  const formulaArr = [
    {
      path: "/assets/about/care-icon-1.1.png",
      title: t('BC_SC_2_F_1'),
      description: t('BC_SC_2_F_C_1'),
    },
    {
      path: "/assets/about/care-icon2.png",
      title: t('BC_SC_2_F_2'),
      description: t('BC_SC_2_F_C_2'),
    },
    {
      path: "/assets/about/care-icon3.png",
      title: t('BC_SC_2_F_3'),
      description: t('BC_SC_2_F_C_3'),
    },
    {
      path: "/assets/about/care-icon4.png",
      title: t('BC_SC_2_F_4'),
      description: t('BC_SC_2_F_C_4'),
    },
    {
      path: "/assets/about/care-icon5.png",
      title: t('BC_SC_2_F_5'),
      description: t('BC_SC_2_F_C_5'),
    },
    {
      path: "/assets/about/care-icon6.png",
      title: t('BC_SC_2_F_6'),
      description: t('BC_SC_2_F_C_6'),
    },
  ];
  return (
    <ContainerLayout>
      <SectionPdContainerLayout innerStyle={{ py: 10, }}>
        <Stack direction="row" justifyContent="center" alignItems="center" sx={{ mb: 20 }}>
            {isZh ?
                <>
                    <Box sx={{ position: "relative" }}>
                        <Box
                            sx={{
                                position: "absolute",
                                height: 30,
                                width: "110%",
                                backgroundColor: (t) => t.palette.primary.light,
                                bottom: 1,
                                left: -8,
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
                            VOSÉ
                        </Typography>
                    </Box>
                    <Typography
                        variant="h1"
                        sx={{
                            color: (t) => t.palette.secondary.main,
                            position: "relative",
                            fontWeight: 400,
                            mt: "16px",
                            ml: 2,
                        }}
                    >
                        的关爱
                    </Typography>
                </>
                :
                <>
                    <Typography
                        variant="h1"
                        sx={{
                            color: (t) => t.palette.secondary.main,
                            position: "relative",
                            fontWeight: 400,
                            mt: "16px",
                            mr: 2,
                        }}
                    >
                        CARE OF
                    </Typography>
                    <Box sx={{ position: "relative" }}>
                        <Box
                            sx={{
                                position: "absolute",
                                height: 30,
                                width: "110%",
                                backgroundColor: (t) => t.palette.primary.light,
                                bottom: 1,
                                left: -8,
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
                            VOSÉ
                        </Typography>
                    </Box>
                </>
            }
        </Stack>
        {formulaArr.map((e, index) => {
          const isEven = (index % 2 == 0);
          return (
            <Grid container spacing={isSmallSize ? 4 : 10} direction={isEven ?  'row' : 'row-reverse' } sx={{mb: 15}}>
              <Grid item xs={5} sm={3}>
                <img width={"100%"} src={e.path} />
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography variant="h2" sx={{ color: (t) => t.palette.secondary.main, mt: 2 }}>
                  {e.title}
                </Typography>
                <Typography
                  sx={{
                    color: (t) => t.palette.gary.light,
                    mt: { xs: 0, md: 4 },
                  }}
                >
                  {e.description}
                </Typography>
              </Grid>
            </Grid>
          );
        })}
      </SectionPdContainerLayout>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          marginTop: -40,
          height: { xs: "40vh", md: "60vh" },
          backgroundColor: "white",
          backgroundImage: `url(/assets/contact/contact-section-bg.png)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPositionY: "bottom",
          zIndex: 10,
          minHeight: "700px",
        }}
      >
        <Typography variant="h2" sx={{ color: (t) => t.palette.secondary.main }}>
          {t('BC_QUE_TITLE')}
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
