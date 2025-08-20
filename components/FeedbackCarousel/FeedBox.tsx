import * as React from "react";
import { Box, Container, Stack, Typography, useTheme } from "@mui/material";
type FeedBoxProps = {
  img: string
  name: string
  subject: string
  content: string
  isSingle: boolean;
  isGreen?: boolean;
  isGary?: boolean;
};

const FeedBox = ({
    img,
    name,
    subject,
    content,
    isSingle,
    isGreen = false,
    isGary = false
}: FeedBoxProps) => {
  const theme = useTheme();
  let backgroundColor = 'white';
  if (isGary) {
    backgroundColor = theme.palette.background.default
  }
  else if (isGreen) {
    backgroundColor = theme.palette.primary.main
  }

  return (
    // <div
    //   style={{
    //     minWidth: isSingle ? "100%" : "33%",
    //     width: "100%",
    //     position: "relative",
    //     paddingLeft: "10px",
    //   }}
    // >
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          height:  isSingle && !isGary ? "400px" : "300px",
          padding: isSingle ? "50px 40px 0px 40px" : "25px 15px",
          borderWidth: isGary ? "0px" : "2px",
          borderStyle: "solid",
          borderColor: "#847361",
          backgroundColor: backgroundColor,
        }}
      >
        <Stack direction="row">
          <img
              width={isSingle ? 70 : 45 }
              height={isSingle ? 70 : 45}
              src={img} alt="profile"
              style={{ borderRadius: '100px', objectFit: 'cover' }}
          />
          <Stack justifyContent={'center'} sx={{ marginLeft: 2 }}>
            <Typography sx={{ fontSize: (isSingle ? "20px" : '16px') + "!important", color: isGreen ?  'white' : (t) => t.palette.gary.light }}>
              {name}
            </Typography>
            <Typography sx={{ fontSize: "14px !important", color: isGreen ?  'white' : (t) => t.palette.gary.light }}>
              {subject}
            </Typography>
          </Stack>
        </Stack>

        <Box sx={{height: '190px', overflow: 'auto'}}>
            <Typography sx={{ fontSize: (isSingle ? "16px" : '14px') + "!important", marginTop: 3, color: isGreen ?  'white' : (t) => t.palette.gary.light }}>
                {content}
            </Typography>
        </Box>
      </div>
    // </div>
  );
};

export default FeedBox;
