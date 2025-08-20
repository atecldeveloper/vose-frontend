import { Box, Grid, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import * as React from "react";
import ContainerLayout from "../components/ContainerLayout";
import FeedBox from "../components/FeedbackCarousel/FeedBox";
import SectionPdContainerLayout from "../components/SectionPdContainerLayout";
import { useTranslations } from "next-intl";
import EmblaCarousel from "../components/FeedbackCarousel/EmblaCarousel";
import {ReviewsItem} from "../src/constants";
import {useRouter} from "next/router";

const Testimonial = () => {
  const router = useRouter();
  const t: any = useTranslations("BrandPage");
  const theme = useTheme();

  let image = [
    '/assets/customerpic/1.jpg',
    '/assets/customerpic/2.jpg',
    '/assets/customerpic/3.jpg',
    '/assets/customerpic/4.jpg',
    '/assets/customerpic/5.jpg',
    '/assets/customerpic/6.jpg',
    '/assets/customerpic/7.jpg',
    '/assets/customerpic/8.jpg',
    '/assets/customerpic/9.jpg',
    '/assets/customerpic/10.png',
    '/assets/customerpic/11.png',
    '/assets/customerpic/12.jpg',
  ]
  return (
    <ContainerLayout>
      <SectionPdContainerLayout
        style={{
          backgroundImage: `url(/assets/testimonial/testimonial-bg.png)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "50vh",
          // backgroundPositionX: { lg: "0px", md: "0x", sm: "-170px" },
        }}
      >
        <Stack alignItems="center" sx={{ pt: 10 }}>
          <Typography sx={{ color: (t) => t.palette.secondary.light }}>{t("TP_SC_1_AB")}</Typography>
          <Typography variant="h2" sx={{ color: (t) => t.palette.secondary.main, mt: 2 }}>
            {t("TP_SC_1_TITLE")}
          </Typography>

          <Typography
            sx={{
              color: (t) => t.palette.gary.light,
              whiteSpace: "break-spaces",
              textAlign: "center",
              mt: 4,
            }}
          >
            {t("TP_SC_1_DES")}
          </Typography>
        </Stack>
      </SectionPdContainerLayout>

      <SectionPdContainerLayout innerStyle={{ pt: 10, pb: 10 }}>
        <Grid item xs={12} sm={7} sx={{ marginTop: '-20vh' }}>
          <EmblaCarousel initRowItems={useMediaQuery(theme.breakpoints.down("lg")) ? 1 : 3}>
            {image.map((i: any) => (
              <div
                style={{
                  position: "relative",
                  overflow: "hidden",
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: "300px",
                }}
              >
                <img height="100%" src={i} />
              </div>
            ))}
          </EmblaCarousel>
        </Grid>
        {/* <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <FeedBox isSingle isGary />
          </Grid>
          <Grid item md={6} xs={12}>
            <FeedBox isSingle isGary />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item md={6} xs={12}>
            <FeedBox isSingle isGary />
          </Grid>
          <Grid item md={6} xs={12}>
            <FeedBox isSingle isGary />
          </Grid>
        </Grid> */}
      </SectionPdContainerLayout>

      <SectionPdContainerLayout
        innerStyle={{ display: "flex", justifyContent: "center", flexDirection: { xs: "column", sm: "row"} , pb: 5 }}
      >
        <Box sx={{ width: { xs: "80vw", sm: "35vw" }}}>
            <FeedBox
                isSingle
                img={ReviewsItem[0].img}
                name={ReviewsItem[0].name}
                subject={ReviewsItem[0].yearOld}
                content={router.locale === 'en' ? ReviewsItem[0].content : ReviewsItem[0].cnContent}
            />
        </Box>
        <Box sx={{ width: { xs: "80vw", sm: "35vw" }, marginTop: 5, marginLeft: { xs: 0, sm: -5 } }}>
          <FeedBox
              isSingle
              isGreen
              img={ReviewsItem[1].img}
              name={ReviewsItem[1].name}
              subject={ReviewsItem[1].yearOld}
              content={router.locale === 'en' ? ReviewsItem[1].content : ReviewsItem[1].cnContent}
          />
        </Box>
      </SectionPdContainerLayout>
    </ContainerLayout>
  );
};

export default Testimonial;

export const getServerSideProps = ({ locale, locales }) => {
  return {
    props: {
      messages: {
        ...require(`../messages/${locale}.json`),
      },
    },
  };
};
