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
                        {t('RETURN')}
                    </Typography>
                </Stack>
            </SectionPdContainerLayout>

            <SectionPdContainerLayout innerStyle={{ pt: 5, pb: 10, px: {xs: 0, md: '150px !important'} }}>

                <Typography variant="h5" sx={{ mt: 3, mb: 1, color: (t) => t.palette.secondary.light }}>
                    CANCELLATION PRIOR TO SHIPMENT
                </Typography>

                <Typography sx={{ color: (t) => t.palette.secondary.light }}>
                    If you cancel your order(s) before it ships from our warehouse, you will not be charged any additional fees. We require a cancellation request to be submitted by emailing us at vosemalaysia@hotmail.com
                    <br/><br/>
                    Once the cancellation request is received, a full refund will be initiated. We would advise a cancellation request within 12 hours upon your order submission in order for a cancellation prior to goods shipment
                </Typography>

                <Typography variant="h6" sx={{mb: 1, mt: 3,  color: (t) => t.palette.secondary.light}}>
                    RETURN POLICY
                </Typography>

                <Typography sx={{ color: (t) => t.palette.secondary.light }}>
                    The following are the policies to be eligible for return requests after shipment/ receipt of goods:
                    <br/><br/>
                    Orders are returnable within 7 working days starting from the day the goods are delivered to you if they are incorrect, damaged or defective.
                    <br/><br/>
                    Only items that have been purchased directly from SWEETPOTATO can be eligible for a return.
                    <br/><br/>
                    Any SWEETPOTATO product purchased through other retailers is not eligible for this policy and must be in accordance to the respective retailers’ returns and refunds policy.
                    <br/><br/>
                    Goods are eligible for a return if the following are applied:
                </Typography>

                <Typography variant="h6" sx={{mb: 1, mt: 3, fontStyle: 'italic', color: (t) => t.palette.secondary.light}}>
                    Incorrect:
                </Typography>

                <Typography sx={{ color: (t) => t.palette.secondary.light }}>
                    The item is not the item you ordered. Wrong size or the colour is different from what is indicated on the order summary, or there are missing items inside the packaging.
                </Typography>

                <Typography variant="h6" sx={{mb: 1, mt: 3, fontStyle: 'italic', color: (t) => t.palette.secondary.light}}>
                    Damaged:
                </Typography>

                <Typography sx={{ color: (t) => t.palette.secondary.light }}>
                    The items is found to be damaged upon receipt. Items has been tampered/refurbished or modified. Customers will be responsible for all shipping charges to return goods. Returns are applicable only for a complete SWEETPOTATO product.
                    <br/><br/>
                    Returned items must meet the following requirements:
                </Typography>
                <ul>
                    <Typography sx={{color: (t) => t.palette.secondary.light}}>
                        <li>
                            The item must be shipped back to us within 7 working days upon receipt. (as proved by the postal or courier receipt).
                        </li>
                    </Typography>
                    <Typography sx={{color: (t) => t.palette.secondary.light}}>
                        <li>
                            You have proof of purchase (order invoice number and receipt).
                        </li>
                    </Typography>
                    <Typography sx={{color: (t) => t.palette.secondary.light}}>
                        <li>
                            Prevent or investigate possible wrongdoing in connection with the Service
                        </li>
                    </Typography>
                    <Typography sx={{color: (t) => t.palette.secondary.light}}>
                        <li>
                            Item must be in new condition and returned in its original packaging and free gifts received with it. All packaging must be unused, unmarked and not defaced in any manner.
                        </li>
                    </Typography>
                    <Typography sx={{color: (t) => t.palette.secondary.light}}>
                        <li>
                            Item must be returned in the original box (or with, at least, suitable packaging) to protect the Product from damage during return delivery
                        </li>
                    </Typography>
                </ul>

                <Typography sx={{ color: (t) => t.palette.secondary.light }}>
                    Change of order and cancellation of order will not be permitted once payment has been confirmed. Any cancellations due to a change of mind will not be accepted.
                    <br/><br/>
                    We reserve the right to reject any cancellation, refund that deemed unfit or unreasonable.
                </Typography>

                <Typography variant="h6" sx={{mb: 1, mt: 3,  color: (t) => t.palette.secondary.light}}>
                    REFUND POLICY
                </Typography>

                <Typography sx={{ color: (t) => t.palette.secondary.light }}>
                    Your full refund will be issued once we have received and examined the returned goods at our return center. Once the returned goods fulfil our return policy, the full refund will be initiated. The method of refund will be processed depending on your original payment method:
                </Typography>
                <ul>
                    <Typography sx={{color: (t) => t.palette.secondary.light}}>
                        <li>
                            Online Bank Transfer, full refunds will be credited into your bank account via online bank transfer, which should be posted within 3-5 working days.
                        </li>
                    </Typography>
                    <Typography sx={{color: (t) => t.palette.secondary.light}}>
                        <li>
                            Credit card refunds services, refunds will be sent to the card-issuing bank.
                        </li>
                    </Typography>
                </ul>

                <Typography sx={{ color: (t) => t.palette.secondary.light }}>
                    Kindly contact your card-issuing bank with regards to the duration of the credit refunds.
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
