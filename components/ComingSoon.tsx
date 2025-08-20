import * as React from "react";
import {Box, Container, Grid, Typography, useTheme} from "@mui/material";

const ComingSoon = () => {
    const theme = useTheme();

    return (
        <Container maxWidth={false}
                   sx={{padding: '20px 0 0 !important', backgroundImage: "url('/assets/homepage/banner-bg.jpg')"}}>
            <Grid container sx={{height: '100%'}} alignItems='center'>
                <Grid item xs={12} md={7} sx={{ pl: 6, my: {xs: 5, sm: 0 } }}>
                    <Typography
                        sx={{
                            fontFamily: 'Roboto',
                            fontSize: '90px',
                            fontWeight: 100,
                            color: theme.palette.primary.main,
                        }}
                    >
                        W E ' R E
                    </Typography>

                    <Typography sx={{fontSize: '100px', letterSpacing: '20px', mt: {xs: 0,sm: -1}}}>
                        COMING
                    </Typography>

                    <Typography sx={{fontSize: '100px', letterSpacing: '20px', mt: {xs: 0,sm: -4}}}>
                        SOON
                    </Typography>

                    <Box sx={{m: 10}}/>

                    <Typography
                        sx={{
                            color: (t) => t.palette.gary.light,
                            mt: 4,
                            maxWidth: '40vw'
                        }}
                    >
                        SORRY OUR WEBSITE IS CURRENTLY GETTING A FACELIFT
                        CHECK BACK SOON FOR THE NEW AND IMPROVED SITE
                    </Typography>
                </Grid>

                <Grid item xs={12} md={5}
                      sx={{
                          height: '90vh',
                          backgroundImage: "url('/assets/coming-soon-2.png')",
                          backgroundSize: 'cover',
                          backgrounPosition: 'center'
                      }}>

                </Grid>
            </Grid>

        </Container>
    )
}

export default ComingSoon;
