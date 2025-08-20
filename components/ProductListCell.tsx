import {Box, Button, Stack, Typography, useTheme} from "@mui/material";
import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {useTranslations} from "next-intl";
import { setPriceFormat } from "../utils";

export type ProductListCellProps = {
  ID: number;
  path: string;
  productName: string;
  categoryArr: Array<string>;
  unit: string;
  price: string;
  discountPrice: number;
  pvPoint: number;
  handleAddToCart: () => void;
};

const ProductListCell = ({ ID, path, productName, categoryArr, unit, price, discountPrice, pvPoint, handleAddToCart }: ProductListCellProps) => {
  const theme = useTheme();
  const tb: any = useTranslations("Button");
  const [hover, setHover] = React.useState(false);
  const router = useRouter();

  return (
    <Box>
      <Box
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        sx={{
          position: "relative",
          width: "100%",
          height: 300,
          maxWidth: 300,
          border: "solid",
          borderColor: (t) => t.palette.background.paper,
          borderWidth: 1,
        }}
      >
        <img style={{ width: "100%", height: "100%", objectFit: "cover", border: `1px solid ${theme.palette.background.paper}` }} src={path} />
        {hover && (
          <Box sx={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
            <Stack direction="row" justifyContent="space-between" spacing={0.2}>
              {/* <Button
                sx={{
                  width: "100%",
                  backgroundColor: "#594f47a3",
                  color: "white",
                  borderRadius: 0,
                  fontSize: '14px !important',
                  ":hover": {
                    color: (t) => t.palette.primary.main,
                    backgroundColor: (t) => t.palette.background.default,
                  },
                }}
                disabled={true}
                onClick={() => handleAddToCart()}
              >
                {tb('ADD_TO_CART')}
              </Button> */}
              <Button
                sx={{
                  width: "100%",
                  backgroundColor: "#594f47a3",
                  color: "white",
                  borderRadius: 0,
                  fontSize: '14px !important',
                  ":hover": {
                    color: (t) => t.palette.secondary.main,
                    backgroundColor: (t) => t.palette.background.default,
                  },
                }}
                onClick={() => {
                  router.push(`/product/${ID}`);
                }}
              >
                {tb('VIEW_DETAILS')}
              </Button>
            </Stack>
          </Box>
        )}
      </Box>
      <Link href={`/product/${ID}`} >
        <Typography sx={{ color: (t) => t.palette.primary.main, fontWeight: 700, pt: 1, cursor: 'pointer' }}>
          {productName}
        </Typography>
      </Link>
      <Stack direction="row">
        <Typography sx={{ color: (t) => t.palette.primary.main, fontSize: 16 }}>Category: </Typography>
        <Typography sx={{ color: (t) => t.palette.primary.main, fontSize: 16, ml: 1, fontStyle: "italic" }}>
          {categoryArr.toString()}
        </Typography>
       
      </Stack>
     
      {
        !discountPrice || discountPrice == 0 ?
        <Stack direction="row" alignItems='center'>
            <Typography sx={{ color: (t) => t.palette.secondary.light, fontWeight: 700, pt: 1 }}>
              {unit} {setPriceFormat(parseFloat(price))}
            </Typography>
            {/* <Typography sx={{ color: (t) => t.palette.primary.main, fontSize: 14, fontWeight: 600, pt: 1, ml: 1 }}>[{pvPoint} Point]</Typography> */}
        </Stack>
      :
      <Stack direction="row" alignItems='center'>
        <Typography sx={{ color: (t) => t.palette.secondary.light, fontWeight: 700, pt: 1 }}>
          {unit} {setPriceFormat(discountPrice)}
        </Typography>
        <Typography sx={{ color: (t) => t.palette.gary.light, fontWeight: 700, pt: 1, fontSize: 16,ml: 1,textDecoration: 'line-through'
          }}>
          [{unit} {setPriceFormat(parseFloat(price))}]
        </Typography>
          {/* <Typography sx={{ color: (t) => t.palette.primary.main, fontSize: 14, fontWeight: 600, pt: 1, ml: 1 }}>[{pvPoint} Point]</Typography> */}
      </Stack>

      }
    <Typography sx={{ color: 'red', fontSize: 14, fontWeight: '600' }}>PRICING FOR MALAYSIA MARKET ONLY</Typography>
    </Box>
  );
};

export default ProductListCell;
