import { Box, Container } from "@mui/material";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";

type SectionPdContainerLayoutProps = {
  style?: any;
  innerStyle?: any;
  children: React.ReactNode;
}


const SectionPdContainerLayout = ({ style, innerStyle, children }: SectionPdContainerLayoutProps ) => {
  return (
  <Container sx={{backgroundColor: "white" , ...style}} maxWidth={false}> 
    <Container sx={innerStyle}>
      {children}
    </Container>
  </Container>
  )
  
}


export default SectionPdContainerLayout;