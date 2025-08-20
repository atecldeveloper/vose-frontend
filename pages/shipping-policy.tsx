import * as React from "react";
import ContainerLayout from "../components/ContainerLayout";
import SectionPdContainerLayout from "../components/SectionPdContainerLayout";
import {Stack, Typography} from "@mui/material";
import {useTranslations} from "next-intl";

const ShippingPolicy = () => {
    const t = useTranslations("Terms");

    return (
        <ContainerLayout>
            <SectionPdContainerLayout
                style={{
                    backgroundImage: `url(/assets/testimonial/testimonial-bg.png)`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    height: "30vh",
                    // backgroundPositionX: { lg: "0px", md: "0x", sm: "-170px" },
                }}
            >
                <Stack alignItems="center" sx={{pt: 10}}>
                    <Typography variant="h2" sx={{color: (t) => t.palette.secondary.main, mt: 2}}>
                        {t('SHIPPING')}
                    </Typography>
                </Stack>
            </SectionPdContainerLayout>

            <SectionPdContainerLayout innerStyle={{ pt: 5, pb: 10, px: {xs: 0, md: '150px !important'} }}>

                <Typography variant="h5" sx={{ mt: 3, mb: 1, color: (t) => t.palette.secondary.light }}>
                    Shipping Address
                </Typography>

                <Typography sx={{ color: (t) => t.palette.secondary.light }}>
                    We will only ship to addresses provided in the billing address or shipment address provided during your purchase.
                    <br/><br/>
                    Please ensure correct addresses and reachable phone number are provided when completing your order. We do not ship to P.O Boxes (Post-Office Box) and only to valid legitimate shipping addresses.
                    <br/><br/>
                    We will not be liable in the event of an incorrect shipping address is provided and goods are returned to us.
                    <br/><br/>
                    All re-delivery of goods to you will be charged for a associated shipping charges which will be disclosed upon request for a second delivery attempt.
                </Typography>

                <Typography variant="h6" sx={{mb: 1, mt: 3,  color: (t) => t.palette.secondary.light}}>
                    Change In Shipping Address
                </Typography>

                <Typography sx={{ color: (t) => t.palette.secondary.light }}>
                    If you have any request for change of shipping address, please email us at vosemalaysia@hotmail.com within 12 hours upon your order submission.
                    <br/><br/>
                    If request of change in shipping address is made after 24 hours upon order confirmation, customers will be responsible for any associated shipping charges.
                </Typography>

                <Typography variant="h6" sx={{mb: 1, mt: 3,  color: (t) => t.palette.secondary.light}}>
                    Shipping Time
                </Typography>

                <Typography sx={{ color: (t) => t.palette.secondary.light }}>
                    It typically takes between 2-5 working days (Monday to Friday) for goods to arrive at your destination. The shipment will be delivered during office hours between 9:00 am to 6:00 pm weekdays only.
                </Typography>

                <Typography variant="h6" sx={{mb: 1, mt: 3,  color: (t) => t.palette.secondary.light}}>
                    Tracking Number
                </Typography>

                <Typography sx={{ color: (t) => t.palette.secondary.light }}>
                    Once goods leave our warehouse and picked up by our shipping partner, the tracking ID for the package will be communicated to you via email and updated on your member’s account.
                </Typography>

            </SectionPdContainerLayout>
        </ContainerLayout>
    )
}

export default ShippingPolicy;

export const getServerSideProps = ({locale, locales}) => {
    return {
        props: {
            messages: {
                ...require(`../messages/${locale}.json`),
            },
        },
    };
};
