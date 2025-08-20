import * as React from "react";
import ContainerLayout from "../components/ContainerLayout";
import SectionPdContainerLayout from "../components/SectionPdContainerLayout";
import {Stack, Typography} from "@mui/material";
import {useTranslations} from "next-intl";

const TermsConditions = () => {
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
                        {t('TERMS')}
                    </Typography>
                </Stack>
            </SectionPdContainerLayout>

            <SectionPdContainerLayout innerStyle={{ pt: 5, pb: 10, px: {xs: 0, md: '150px !important'} }}>
                <Typography sx={{ color: (t) => t.palette.secondary.light }}>
                Welcome to {<b>VOSE WELLNESS EMPIRE (003384007-W)</b>}, an online retailer offering a variety of products and services to consumers.<br/> These terms and conditions (the "Agreement") govern your use of the VOSE website and any products or services made available through it (collectively, the "Services"). <br/> By accessing or using the Services, you agree to be bound by this Agreement. If you do not agree to all of these terms and conditions, you should not use the Services.
                </Typography>

                <Typography variant="h5" sx={{ mt: 3, mb: 1, color: (t) => t.palette.secondary.light }}>
                 Right to Make Changes to the Agreement
                </Typography>

                <Typography sx={{ color: (t) => t.palette.secondary.light }}>
                VOSE reserves the right to modify, update, or otherwise change the terms and conditions of this Agreement at any time without notice. Your continued use of the Services after such changes will constitute your acceptance of the revised Agreement.

                </Typography>

                <Typography variant="h5" sx={{ mt: 3, mb: 1, color: (t) => t.palette.secondary.light }}>
                User Guidelines
                </Typography>

                <Typography sx={{ color: (t) => t.palette.secondary.light }}>
                  In using the Services, you agree to comply with all applicable laws and regulations, and you agree not to use the Services for any illegal or unauthorized purpose. You agree to use the Services only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the Services.
                  <br/>
                  <br/>
                  You agree not to transmit any viruses, malware, or other harmful code through the Services, and you agree not to engage in any activity that could damage, disable, or otherwise impair the Services or the servers or networks used to provide them.
                </Typography>

                <Typography variant="h5" sx={{ mt: 3, mb: 1, color: (t) => t.palette.secondary.light }}>
                Copyright and Intellectual Property
                </Typography>

                <Typography sx={{ color: (t) => t.palette.secondary.light }}>
                The Services and all content, including but not limited to text, graphics, logos, images, and software, are the property of VOSE or its licensors and are protected by copyright, trademark, and other intellectual property laws. You may not use any content from the Services without the express written permission of VOSE.
                </Typography>

                <Typography variant="h5" sx={{ mt: 3, mb: 1, color: (t) => t.palette.secondary.light }}>
                Warranty Disclaimer
                </Typography>
                <Typography sx={{ color: (t) => t.palette.secondary.light }}>
                The Services are provided on an "as is" and "as available" basis without warranty of any kind, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement. VOSE does not warrant that the Services will meet your requirements, be uninterrupted or error-free, or that defects will be corrected.
                </Typography>
                

                <Typography variant="h5" sx={{ mt: 3, mb: 1, color: (t) => t.palette.secondary.light }}>
                Limitation of Liability
                </Typography>
                <Typography sx={{ color: (t) => t.palette.secondary.light }}>
                In no event shall VOSE be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with your use of the Services or any product or service purchased through the Services. VOSE's liability for any claim arising out of this Agreement shall be limited to the amount paid by you for the product or service at issue.
                </Typography>

            </SectionPdContainerLayout>
        </ContainerLayout>
    )
}

export default TermsConditions;

export const getServerSideProps = ({locale, locales}) => {
    return {
        props: {
            messages: {
                ...require(`../messages/${locale}.json`),
            },
        },
    };
};
