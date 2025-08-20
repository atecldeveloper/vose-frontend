import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, Stack, Box, Typography, useMediaQuery, useTheme, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import classes from "*.module.css";
import { useProps } from "../src/context/state";
import { useRouter } from "next/router";

const useStyles: any = makeStyles(
  (theme: any) => {
    return {
      container: {
        '& .css-1f8sh1y': {
          zIndex: -10}
        }
      }
  },
  {
    name: "CustomCarousel",
  }
);

const CustomCarousel = ({items, languagePackage}: any) => {

  // const classes = useStyles();
  // var items = [
  //   {
  //     title: "VOSÉ",
  //     subTitle: "Concentrated Booster",
  //     description: language.HP_SC_1_DES,
  //     backgroundImage: "/assets/homepage/banner-bg.jpg",
  //   },
  //   // {
  //   //   title: "VOSÉ",
  //   //   subTitle: "Concentrated Booster",
  //   //   description: <>improve skin absorption capacity, <br/> Double the effect of skin care products!  <br/>High-efficiency antioxidant, anti-aging, Firms skin, refines pores, <br/> Get a healthy glow to your skin in 1 month!</>,
  //   //   backgroundImage: "/assets/homepage/banner-bg.jpg",
  //   // },
  // ];

  return (
    // <Carousel
    //   animation='slide'
    //   className={classes.container}
    //   indicatorContainerProps={{
    //     style: {
    //         marginTop: '-30px', // 5
    //         zIndex: 100
    //     }
    //   }}
    // >
    <>
      {items.map((item: any, i: any) => (
        <Item key={i} item={item} languagePackage={languagePackage} />
      ))}
    </>
    // </Carousel>
  );
};

const Item = ({item, languagePackage}: any) =>{
  const router = useRouter();
  const theme = useTheme();

  const isSmallSize = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Box
      style={{
        backgroundImage: `url(${item.backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      sx={{py: {xs: 3, sm: 0}}}
    >
      {/* <Stack sx={{height: '100%'}} direction='row' justifyContent='center' > */}
        <Grid container sx={{height: '100%'}} alignItems={'center'} justifyContent='center'>

            <Grid item xs={12} sm={6}>
            <Stack sx={{width: '100%'}} alignItems='flex-end'>
            {
            isSmallSize ? <img src='/assets/homepage/banner-product-1.png' style={{objectFit: 'contain', width: '100%', padding: '0px 50px'}}/> :
            <img src='/assets/homepage/banner-product-1.png' style={{objectFit: 'contain', width: '100%', maxHeight: '80vh', maxWidth: '700px',padding: '40px 50px'}}/>
            }
            </Stack>
          </Grid>
          <Grid item xs={8} sm={6}>
            <Stack justifyContent='center' >
              <Typography variant='h1' sx={{color: (t) => t.palette.secondary.main, fontSize: 45 }}>
                {item.title}
              </Typography>
              <Typography variant='h1' sx={{color: (t) => t.palette.secondary.main, fontSize: 45 }}>
                {item.subTitle}
              </Typography>
              <Typography sx={{color: (t) => t.palette.secondary.main, maxWidth: 400, padding: {xs: '10px 0px 30px 0px',sm:'10px 0px 60px 0px'}, whiteSpace: 'break-spaces' }}>
                {item.description}
              </Typography>
              <Stack direction='row' >
                {/* <Button variant='contained' sx={{width: { xs:'150px', md:'200px'}}} onClick={() => { router.push('/product/booster') }}>{languagePackage('BUY_NOW')}</Button> */}
                <Button variant='outlined' sx={{width: { xs:'150px', md:'200px'}}} onClick={() => { router.push('/brand/story') }}>{languagePackage('LEARN_MORE')}</Button>
              </Stack>
          </Stack>
          </Grid>
        </Grid>
        {/* <Stack justifyContent='center' sx={{width: '100%', display: {xs: 'none', md: 'flex'}}}>
        </Stack>
        <Stack justifyContent='center' >
          <Typography variant='h1' sx={{color: (t) => t.palette.secondary.main, fontSize: 45 }}>
            {item.title}
          </Typography>
          <Typography variant='h1' sx={{color: (t) => t.palette.secondary.main, fontSize: 45 }}>
            {item.subTitle}
          </Typography>
          <Typography sx={{color: (t) => t.palette.secondary.main, maxWidth: 400, padding: '10px 0px 60px 0px', whiteSpace: 'break-spaces' }}>
            {item.description}
          </Typography>
          <Stack direction='row' >
            <Button variant='contained' sx={{width: { xs:'150px', md:'200px'}}}>{languagePackage.BUY_NOW}</Button>
            <Button variant='outlined' sx={{width: { xs:'150px', md:'200px'}, marginLeft: { xs: 2, md: 5 }}}>{languagePackage.LEARN_MORE}</Button>
          </Stack>
        </Stack>
      */}
      {/* </Stack> */}
    </Box>
  );
}


export default CustomCarousel;
