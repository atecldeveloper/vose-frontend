import { Button, Container, Divider, Grid, IconButton, Stack, Typography, Box } from '@mui/material';
import React from 'react';
import FacebookSharpIcon from '@mui/icons-material/FacebookSharp';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import {useTranslations} from "next-intl";
import { Router, useRouter } from 'next/router';
import Link from "next/link";
import {useProps} from "../src/context/state";

const Footer: React.FC = () => {
  const router = useRouter();
  const isZh = router.locale == 'cn';
  const { account } = useProps();
  const t = useTranslations("Footer");
  const tb = useTranslations("Button");
  let isShopUncompleted = false;

  if (account && account.isShop && account.shopStatus == 5) {
    isShopUncompleted = true;
  }

  return(
    <Container id={"footer"} maxWidth={false} sx={{backgroundColor: (t) => t.palette.footerBg.main, padding: '40px 0px 25px 0px' }}>
      <Container>
        <Grid container spacing={10}>
          <Grid item xs={12} md={4}>
            <img src={"/assets/whitelogo-1.png"} style={{ width: "200px", objectFit: "cover" }} />
            <Typography sx={{ color: (t) => t.palette.brownLight.main, maxWidth: 330, mt: 2}} >
              {t('FOOTER_DES')}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant={'h2'} sx={{ color: 'white', fontSize: { lg: '24px !important', xs: '18px !important'}}} >
              {t('FOOTER_CONT')}
            </Typography>
            <Stack spacing={2} sx={{mt: 2}}>
              <Stack direction='row' spacing={3}>
                <Typography
                    sx={{
                      color: 'white',
                      fontWeight: 'bold',
                      minWidth: {
                        xs: isZh ? '70px' : '50px',
                        md: isZh ? '90px' : '60px'
                      }
                    }}
                >
                {t('FOOTER_ADD')}
                </Typography>
                <Typography sx={{ color: (t) => t.palette.brownLight.main, maxWidth: 330 }} >
                90-3, Jalan Jalil 1,
                Bumi Bukit Jalil, 
                Lebuhraya Puchong sg besi,
                57000 KL
                </Typography>
              </Stack>
              <Stack direction='row' spacing={5.5}>
                <Typography sx={{ color: 'white', fontWeight: 'bold' }} >
                {t('FOOTER_EMAIL')}
                </Typography>
                <Typography sx={{ color: (t) => t.palette.brownLight.main, maxWidth: 330 }} >
                  vosemalaysia@hotmail.com
                </Typography>
              </Stack>
              <Stack direction='row' spacing={4.5}>
                <Typography sx={{ color: 'white', fontWeight: 'bold' }} >
                {t('FOOTER_PHONE')}
                </Typography>
                <Typography sx={{ color: (t) => t.palette.brownLight.main, maxWidth: 330 }} >
                  +60 19-223 1463
                </Typography>
              </Stack>
            </Stack>
            <Stack direction='row' justifyContent='flex-start' spacing={1} sx={{mt: 2, ml: -1}}>
              <IconButton>
                <FacebookSharpIcon sx={{color: 'white'}}/>
              </IconButton>
              <IconButton>
                <InstagramIcon sx={{color: 'white'}}/>
              </IconButton>
              <IconButton>
                <WhatsAppIcon sx={{color: 'white'}}/>
              </IconButton>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant={'h2'} sx={{ color: 'white', fontSize: { lg: '24px !important', xs: '18px !important'}}} >
              {t('FOOTER_JOIN')}
            </Typography>
            <Typography sx={{ color: (t) => t.palette.brownLight.main, maxWidth: 400, mt: 2 }} >
              {t('FOOTER_JOIN_DESC')}
            </Typography>
            <Button variant='outlined' color='secondary' sx={{ color: (t) => t.palette.brownLight.main , borderColor: (t) => t.palette.brownLight.main, width: '100%', mt: 2}} onClick={() => {
              const redirectPath = isShopUncompleted ? '/shop-panel/profile' : '/register-shop'
              router.push(redirectPath)
            }}>
              {tb('JOIN_NOW')}
            </Button>
          </Grid>
        </Grid>
        <Divider sx={{backgroundColor: 'white', mt: 6, mb: 3}}/>
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
        >
          <Box sx={{cursor: "pointer"}}>
            <Link href="https://www.atecl.com.my">
              <Typography sx={{ color: 'white', textAlign: 'center', fontSize: '16px !important'}} >
                © Atecl Technology 2022
              </Typography>
            </Link>
          </Box>
          <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem sx={{ borderColor: 'white' }} />}
              spacing={1}
          >
            <Box sx={{cursor: "pointer"}}>
              <Link href="/privacy-policy" color="inherit">
                <Typography sx={{ color: 'white', textAlign: 'center', fontSize: '16px !important'}} >
                  Privacy Policy
                </Typography>
              </Link>
            </Box>

            <Box sx={{cursor: "pointer"}}>
              <Link href="/shipping-policy" color="inherit">
                <Typography sx={{ color: 'white', textAlign: 'center', fontSize: '16px !important'}} >
                  Shipping Policy
                </Typography>
              </Link>
            </Box>

            <Box sx={{cursor: "pointer"}}>
              <Link href="/return-policy" color="inherit">
                <Typography sx={{ color: 'white', textAlign: 'center', fontSize: '16px !important'}} >
                  Return Policy
                </Typography>
              </Link>
            </Box>

            <Box sx={{cursor: "pointer"}}>
              <Link href="/terms-conditions" color="inherit">
                <Typography sx={{ color: 'white', textAlign: 'center', fontSize: '16px !important'}} >
                  Terms & Conditions
                </Typography>
              </Link>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Container>
  )

}


export default Footer;
