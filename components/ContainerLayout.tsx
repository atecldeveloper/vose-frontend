import {Box, Container} from "@mui/material";
import {useRouter} from "next/router";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import ComingSoon from "./ComingSoon";
import {ComingSoonPage} from "../src/constants";

// -------------------------------------------- //

const isComingSoon = process.env.NEXT_PUBLIC_MANTAINANCE === 'true';

type ContainerLayoutProps = {
  children: React.ReactNode;
}

// -------------------------------------------- //


const ContainerLayout = ({ children }: ContainerLayoutProps ) => {
  const history = useRouter();
  const currentPath = history.asPath;
  let preScreen = isComingSoon;

  // @ts-ignore
    if (ComingSoonPage.indexOf(currentPath) !== -1) preScreen = true;

  return (
    <Container style={{ padding: 0 }} maxWidth={false}>
      <Header />
      <Box sx={{ marginTop: '110px'}}/>

      {preScreen && <ComingSoon />}

      {!preScreen && children}
      <Footer/>
    </Container>
  )

}


export default ContainerLayout;
