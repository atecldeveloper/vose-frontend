import * as React from "react";
import { useTranslations } from "next-intl";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CustomCarousel from "../components/Carousel";
import EmblaCarousel from "../components/FeedbackCarousel/EmblaCarousel";
import ContainerLayout from "../components/ContainerLayout";
import SectionPdContainerLayout from "../components/SectionPdContainerLayout";
import FeedBox from "../components/FeedbackCarousel/FeedBox";
import { useRouter } from "next/router";
import { ReviewsItem } from "../src/constants";

export default function Home() {
  const theme = useTheme();
  const isSmallSize = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const t: any = useTranslations("Homepage");
  const tb: any = useTranslations("Button");
  const items = [
    {
      title: "VOSÉ",
      subTitle: "Concentrated Booster",
      description: t("HP_SC_1_DES"),
      backgroundImage: "/assets/homepage/banner-bg.jpg",
    },
  ];

  const HOME_NATURE_ICON = [
    { path: "/assets/homepage/homepage-care-icon1.png", title: t("HP_ICON_1") },
    { path: "/assets/homepage/homepage-care-icon2.png", title: t("HP_ICON_2") },
    { path: "/assets/homepage/homepage-care-icon3.png", title: t("HP_ICON_3") },
    { path: "/assets/homepage/homepage-care-icon4.png", title: t("HP_ICON_4") },
    { path: "/assets/homepage/homepage-care-icon5.png", title: t("HP_ICON_5") },
    { path: "/assets/homepage/homepage-care-icon6.png", title: t("HP_ICON_6") },
  ];

  return (
    <ContainerLayout>
      {/* <img
        src="/assets/homepage/promotion-image.png"
        style={{ objectFit: "contain", width: "100%" }}
      /> */}
      <CustomCarousel items={items} languagePackage={tb} />
      <Container id={"home-video"}>
        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          sx={{ height: { xs: "80vh", md: "100vh" } }}
        >
          <Typography sx={{ color: (t) => t.palette.secondary.light }}>
            {t("HP_SC_2_TITLE")}
          </Typography>
          <Typography
            variant="h2"
            sx={{ color: (t) => t.palette.secondary.main }}
          >
            {t("HP_SC_2_DES")}
          </Typography>
          <Box sx={{ m: 3 }} />
          <Box
            sx={{
              width: "80%",
              paddingTop: "45%",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <video
              controls
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                width: "100%",
                height: "100%",
              }}
            >
              <source src="/assets/video-2.mp4" type="video/mp4" />
            </video>
          </Box>
        </Stack>
      </Container>
      <SectionPdContainerLayout>
        <Grid
          container
          alignItems="center"
          sx={{
            height: "100vh",
            backgroundColor: "white",
            flexFlow: { xs: "wrap-reverse", md: "wrap" },
            py: { xs: 5 },
          }}
        >
          <Grid item xs={12} sm={6}>
            <Stack justifyContent="center">
              <Typography
                sx={{ color: (t) => t.palette.secondary.light, mb: 1 }}
              >
                {t("HP_SC_3_AB")}
              </Typography>
              <Typography
                variant="h2"
                sx={{ color: (t) => t.palette.secondary.main }}
              >
                {t("HP_SC_3_TITLE")}
              </Typography>
              <Box sx={{ m: 1 }} />
              <Typography
                sx={{
                  color: (t) => t.palette.secondary.main,
                  maxWidth: 500,
                  pt: 1,
                }}
              >
                {t("HP_SC_3_DES")}
              </Typography>
              <Box sx={{ m: { xs: 3, sm: 5 } }} />
              {/* <Button
                variant="contained"
                sx={{ width: "200px" }}
                onClick={() => {
                  router.push("/product/booster");
                }}
              >
                {tb("BUY_NOW")}
              </Button> */}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* <Stack justifyContent="center" sx={{ height: { xs: "80%", sm:"150%"}}}> */}
            <img
              src="/assets/homepage/homepage-product.png"
              style={{ objectFit: "contain", width: "100%" }}
            />
            {/* </Stack> */}
          </Grid>
        </Grid>
      </SectionPdContainerLayout>
      <SectionPdContainerLayout
        style={{
          backgroundColor: (t: any) => t.palette.brown.main,
          backgroundImage: isSmallSize
            ? ""
            : `url(/assets/homepage/homepage-woman.png)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPositionX: { lg: "0px", md: "0x", sm: "-170px" },
        }}
      >
        <Stack
          direction="row"
          justifyContent="center"
          sx={{
            height: { xs: "70vh", sm: "90vh" },
          }}
        >
          <Grid container sx={{ padding: { lg: 10, sm: 8, xs: 3 } }}>
            <Grid item xs={0} sm={6}></Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ color: (t) => t.palette.pink.main }}>
                {" "}
                {t("HP_SC_4_AB")}
              </Typography>
              <Typography variant="h1" sx={{ color: "white" }}>
                {t("HP_SC_4_TITLE")}
                {/* <span style={{ marginLeft: "15px" }}>VOSÉ</span> */}
              </Typography>
              <Grid
                container
                spacing={9}
                sx={{
                  paddingTop: { xs: 5, sm: 5 },
                  paddingLeft: { xs: 0, sm: 5 },
                }}
              >
                {HOME_NATURE_ICON.map((e) => {
                  return (
                    <Grid item xs={4}>
                      <Stack alignItems="center">
                        <img width={70} src={e.path} />
                        <Typography
                          sx={{ color: "white", textAlign: "center", mt: 1 }}
                        >
                          {e.title}
                        </Typography>
                      </Stack>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </Stack>
      </SectionPdContainerLayout>
      <SectionPdContainerLayout
        style={{ backgroundColor: (t: any) => t.palette.background.default }}
      >
        <Grid
          container
          sx={{
            height: { xs: "100vh", sm: "80vh" },
            padding: { xs: 3, sm: 0 },
            paddingTop: { xs: 3, sm: 15 },
            backgroundColor: (t) => t.palette.background.default,
          }}
        >
          <Grid item xs={12} sm={5}>
            <img
              style={{ paddingTop: "30px" }}
              width={100}
              src={"/assets/homepage/testimonial-quotationmark.png"}
            />
            <Typography
              variant="h2"
              sx={{ color: (t) => t.palette.secondary.main }}
            >
              {" "}
              {t("HP_SC_5_TITLE")}
            </Typography>
            <Typography
              sx={{
                color: (t) => t.palette.secondary.main,
                maxWidth: 330,
                pt: 1,
              }}
            >
              {" "}
              {t("HP_SC_5_DES")}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={7}>
            <EmblaCarousel
              initRowItems={useMediaQuery(theme.breakpoints.down("lg")) ? 1 : 3}
            >
              {ReviewsItem.map((item: any) => (
                <FeedBox
                  isSingle={false}
                  img={item.img}
                  name={item.name}
                  subject={item.yearOld}
                  content={
                    router.locale === "en" ? item.content : item.cnContent
                  }
                />
              ))}
            </EmblaCarousel>
          </Grid>
        </Grid>
      </SectionPdContainerLayout>
      <Stack
        alignItems="center"
        sx={{
          height: "70vh",
          backgroundImage: `url(/assets/contact/contact-section-bg.png)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundColor: "white",
          backgroundPositionY: "center",
        }}
      >
        <img
          width={300}
          style={{ marginTop: -100 }}
          src={"/assets/homepage/homepage-product2.png"}
        />
        <Box sx={{ m: 1 }} />
        <Typography
          variant="h2"
          sx={{ color: (t) => t.palette.secondary.main, textAlign: "center" }}
        >
          {" "}
          {t("HP_QUE_TITLE")}
        </Typography>
        <Box sx={{ m: 2 }} />
        <Button
          variant="contained"
          sx={{ width: "200px" }}
          onClick={() => {
            router.push("/contact_us");
          }}
        >
          {tb("CONTACT_US")}
        </Button>
      </Stack>
    </ContainerLayout>
  );
}

export const getServerSideProps = ({ locale, locales }) => {
  return {
    props: {
      messages: {
        ...require(`../messages/${locale}.json`),
      },
    },
  };
};
