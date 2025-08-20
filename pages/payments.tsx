import * as React from "react";
import { Box, Button, Grid, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import ContainerLayout from "../components/ContainerLayout"
import {useRouter} from "next/router";
import SectionPdContainerLayout from "../components/SectionPdContainerLayout";
import CircularProgress from '@mui/material/CircularProgress';
import {useTranslations} from "next-intl";

const Payments = () => {
    const t = useTranslations("Payments");
    const tb = useTranslations("Button");
    const router = useRouter();
    const [fail, setFail] = React.useState(false)

    const hanldeBack = () => {
        router.push('/')
    }

    React.useEffect(() => {
        if (router.isReady) {
            const query: any = router.query;

            if (query["billplz[paid]"] === "true" ) {
                router.push({ pathname: "/order/summary", query: { id: query["billplz[id]"] } });
            } else setFail(true)
        }
    }, [router.isReady])

    return (
        <ContainerLayout>
            <SectionPdContainerLayout
                style={{minHeight: "40vh", backgroundColor: (t: any) => t.palette.background.default}}
                innerStyle={{ pt: 5, pb: 15, px: { xs: 0, md: "100px !important" } }}
            >
                {!fail &&
                <Stack alignItems='center' justifyContent='center' sx={{ mt: 15 }}>
                    <CircularProgress />
                </Stack>
                }

                {fail &&
                <Paper sx={{ backgroundColor: "white", mt: 15, p: 5 }} elevation={3}>
                  <Stack direction='row' justifyContent='center'>
                    <img src='/assets/payment-fail.png' width='100px'/>
                  </Stack>

                  <Stack alignItems='center'>
                    <Typography variant="h2" sx={{ color: (t) => t.palette.secondary.main, mt: 2 }}>
                        {t('FAILED')}
                    </Typography>

                    <Typography sx={{ color: (t) => t.palette.gary.light, textAlign: "center" }}>
                        {t('FAILED_DESC')}
                    </Typography>

                    <Button variant='contained' sx={{width: '150px', mt: 7}} onClick={hanldeBack}>{tb('BACK')}</Button>
                  </Stack>
                </Paper>
                }
            </SectionPdContainerLayout>
        </ContainerLayout>
    )
}

export default Payments;

export const getServerSideProps = ({ locale, locales }) => {
    return {
        props: {
            messages: {
                ...require(`../messages/${locale}.json`),
            },
        },
    };
};
