import { Stack, Typography } from "@mui/material";
import * as React from "react";
import ContainerLayout from "../components/ContainerLayout";
import SectionPdContainerLayout from "../components/SectionPdContainerLayout";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { faqContentArrEN, faqContentArrZH } from "../src/constants/faq";
import {useTranslations} from "next-intl";
import {useRouter} from "next/router";

const Faq = () => {
  const {locale} = useRouter();
  const t = useTranslations("BrandPage");
  const arr = locale === 'cn' ? faqContentArrZH : faqContentArrEN;

  return (
    <ContainerLayout>
      <SectionPdContainerLayout
        style={{
          backgroundImage: `url(/assets/testimonial/testimonial-bg.png)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "40vh",
          // backgroundPositionX: { lg: "0px", md: "0x", sm: "-170px" },
        }}
      >
        <Stack alignItems="center" sx={{ pt: 10 }}>
          <Typography sx={{ color: (t) => t.palette.secondary.light }}>{t('FQ_SC_1_AB')}</Typography>
          <Typography variant="h2" sx={{ color: (t) => t.palette.secondary.main, mt: 2 }}>
            {t('FQ_SC_1_TITLE')}
          </Typography>

          <Typography sx={{ color: (t) => t.palette.gary.light, whiteSpace: 'break-spaces',textAlign: "center", mt: 4 }}>
          {t('FQ_SC_1_DES')}
          </Typography>
        </Stack>
      </SectionPdContainerLayout>
      <SectionPdContainerLayout innerStyle={{ pt: 5, pb: 10, px: {xs: 0, md: '150px !important'} }}>
        {
          arr.map((e: any) => {
            return (
              <Accordion
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '0px !important',
                  boxShadow: 'none !important',
                  '.MuiPaper-root.MuiAccordion-root': {
                    backgroundColor: 'white',
                  },
                  border: 'solid',
                  borderColor: (t) => t.palette.gary.light,
                  borderWidth: 0,
                  borderBottomWidth: 1,
                  py: 3,
                  margin: '0px !important'
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{
                    px: 0
                  }}
                >
                  <Typography sx={{ color: (t) => t.palette.secondary.light, fontWeight: 'bold' }}>{e.que}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ color: (t) => t.palette.gary.light }}>
                   {e.ans}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            )
          })
        }
      </SectionPdContainerLayout>
    </ContainerLayout>
  );
};

export default Faq;

export const getServerSideProps = ({ locale, locales }) => {
    return {
        props: {
            messages: {
                ...require(`../messages/${locale}.json`),
            },
        },
    };
};
