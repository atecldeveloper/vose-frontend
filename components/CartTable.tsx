import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Button, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CounterStep from "./CounterStep";
import {useTranslations} from "next-intl";
import { setPriceFormat } from "../utils";

type CartTableProps = {
  dataList: any;
  isShop?: boolean;
  pvPoint?: number;
  isReview?: boolean;
  shippingFee?: number;
  voucher?: any;
  coinValue?: number;
  isMemberFee?: boolean | number;
  total?: number;
  subTotal?: number;
  counterRef?: any;
  handleEditProduct: (productID: string, quantity: number, id: number, stock: number) => void;
};

const CartTable = ({
  dataList,
  isReview = false,
  shippingFee = 0,
  total = 0,
  isMemberFee = false,
  coinValue = 0,
  subTotal = 0,
  pvPoint = 0,
  counterRef,
  voucher,
  isShop=false,
  handleEditProduct,
}: CartTableProps) => {
  const t: any = useTranslations("Cart");

  return (
    <TableContainer>
      <Table
        sx={{
          minWidth: 650,
          backgroundColor: "white",
          borderWidth: 0,
          borderBottomWidth: "1px",
          borderStyle: "solid",
          borderColor: "rgba(224, 224, 224, 1)",
        }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell style={{ width: "17vw", minWidth: 300 }} align="right">
              <Stack direction="row" justifyContent="space-between">
                <Typography sx={{ color: (t) => t.palette.gary.light }}>{dataList.length} {t('CART_ITEMS')}</Typography>
                <Typography sx={{ color: (t) => t.palette.gary.light }}>{t('CART_PRO')}</Typography>
              </Stack>{" "}
            </TableCell>
            <TableCell align="center">
              <Typography sx={{ color: (t) => t.palette.gary.light }}>{t('CART_PRICE')}</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography sx={{ color: (t) => t.palette.gary.light }}>{t('CART_QTY')}</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography sx={{ color: (t) => t.palette.gary.light }}>{t('CART_SUB')}</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataList.map((row: any, index: number) => {
            let price = row.discountPrice == 0 ? row.price : row.discountPrice;
            const subTotal = row.isBundle || row.discountAmount > 0 ? setPriceFormat(row.discountAmount) : setPriceFormat(((parseInt(row.quantity) * price)))
            return (
              <TableRow key={row.name} sx={{ "td, th": { border: 0 } }}>
                <TableCell style={{ width: "17vw", minWidth: 270 }}>
                  <Stack direction="row">
                    <img
                    width="100"
                    height="100"
                    style={{ objectFit: "cover", minWidth: '100px'  }}
                    src={row.photo[0]}
                  />
                    <Stack justifyContent="space-between" sx={{ maxWidth: "250px" }}>
                      <Box sx={{ ml: 2 }}>
                        <Typography sx={{ color: (t) => t.palette.secondary.main, fontSize: 16 }}>{row.title}</Typography>
                        <Typography sx={{ color: (t) => t.palette.primary.main, fontSize: 14, fontWeight: 600, mt: '2px' }}>[{row.pvPoint} Point]
                        </Typography>
                        {/* <Typography sx={{ color: (t) => t.palette.gary.light, fontSize: 12 }}>
                          {plainTextWithoutHTML(row.description)}
                        </Typography> */}
                      </Box>
                      {(!isReview || isShop )&&(
                        <Button
                          variant="text"
                          sx={{ width: "100px", p: "0px !important" }}
                          startIcon={
                            <CloseIcon sx={{ color: "#A50203", fontSize: "13px !important", mt: "-2.5px" }} />
                          }
                          onClick={() => {
                            handleEditProduct(row.ID, 0, 1, row.stock);
                          }}
                        >
                          <Typography sx={{ color: "#A50203", fontSize: "13px !important" }}>
                            Remove
                          </Typography>
                        </Button>
                      )}
                    </Stack>
                  </Stack>
                </TableCell>
                <TableCell align="center">
                  <Typography sx={{ color: (t) => t.palette.secondary.main }}>
                    {" "}
                    RM {row.discountPrice == 0 ? setPriceFormat(row.price) : row.discountPrice ? setPriceFormat(row.discountPrice) : "0.00"}
                  </Typography>
                </TableCell>
                <TableCell align="center" style={{ width: "150px", minWidth: 150 }}>
                  {isReview ? (
                    row.quantity
                  ) : (
                    <CounterStep
                      size="xs"
                      isAbleZero={isShop}
                      ref={el => counterRef.current[index] = el}
                      initNumber={row.quantity}
                      handleGetCount={(value: number) => {
                        handleEditProduct(row.ID, value, index, row.stock);
                      }}
                    />
                  )}
                </TableCell>
                <TableCell align="center">
                  <Typography sx={{ color: (t) => t.palette.secondary.main, fontWeight: "bold" }}>
                    {" "}
                    RM {subTotal}{" "}
                  </Typography>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        {isReview && (
          <TableBody sx={{ borderWidth: "0px", borderTopWidth: "1px", borderStyle: "solid" }}>
            <TableRow>
              <TableCell style={{ width: "20vw", minWidth: 300 }}>
                <Stack direction="row">
                  <Typography sx={{ color: (t) => t.palette.secondary.main, fontWeight: 'bold' }}>{t('CART_SUB')}</Typography>
                </Stack>
              </TableCell>
              <TableCell />
              <TableCell />
              <TableCell align="center">
                <Typography sx={{ color: (t) => t.palette.secondary.main, fontWeight: "bold" }}>
                  RM {setPriceFormat(subTotal)}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow sx={{ "td, th": { border: 0 } }}>
              <TableCell style={{ width: "20vw", minWidth: 300 }}>
                <Stack direction="row">
                  <Typography sx={{ color: (t) => t.palette.secondary.main }}>{t('CART_S_SHP_F')}</Typography>
                </Stack>
              </TableCell>
              <TableCell />
              <TableCell />
              <TableCell align="center">
                <Typography sx={{ color: (t) => t.palette.secondary.main }}>
                  RM {setPriceFormat(shippingFee)}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow sx={{ "td, th": { border: 0 } }}>
              <TableCell style={{ width: "20vw", minWidth: 300 }}>
                <Stack direction="row">
                  <Typography sx={{ color: (t) => t.palette.secondary.main }}>{t('CART_S_REG_F')}</Typography>
                </Stack>
              </TableCell>
              <TableCell />
              <TableCell />
              <TableCell align="center">
                <Typography sx={{ color: (t) => t.palette.secondary.main }}>
                  RM {isMemberFee || "0.00"}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow sx={{ "td, th": { border: 0 } }}>
              <TableCell style={{ width: "20vw", minWidth: 300 }}>
                <Stack direction="row">
                  <Typography sx={{ color: (t) => t.palette.secondary.main }}>{t('CART_S_V')} {voucher && `[${voucher.code}]`} {voucher && voucher.point > 0 ? '(point: - ' + voucher.point + ')' : ''}</Typography>
                </Stack>
              </TableCell>
              <TableCell />
              <TableCell />
              <TableCell align="center">
                <Typography sx={{ color: (t) => t.palette.secondary.main }}>
                  - (RM {voucher.discount ? setPriceFormat(voucher.discount) : '0.00'})
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ width: "20vw", minWidth: 300 }}>
                <Stack direction="row">
                  <Typography sx={{ color: (t) => t.palette.secondary.main }}>{t('CART_S_C')}</Typography>
                </Stack>
              </TableCell>
              <TableCell />
              <TableCell />
              <TableCell align="center">
                <Typography sx={{ color: (t) => t.palette.secondary.main }}>
                  - (RM {coinValue ? setPriceFormat(coinValue) : '0.00'})
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ width: "20vw", minWidth: 300 }}>
                <Stack direction="row">
                  <Typography sx={{ color: (t) => t.palette.secondary.main, fontWeight: 'bold' }}>{t('CART_S_T')}</Typography>
                </Stack>
              </TableCell>
              <TableCell />
              <TableCell />
              <TableCell align="center">
                <Typography sx={{ color: (t) => t.palette.secondary.main, fontWeight: "bold" }}>
                  RM {setPriceFormat(total)}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        )}
        { isShop &&
          <TableBody sx={{ borderWidth: "0px", borderTopWidth: "1px", borderStyle: "solid" }}>
             <TableRow sx={{ "td, th": { border: 0 } }}>
              <TableCell style={{ width: "20vw", minWidth: 300 }}>
                <Stack direction="row">
                  <Typography sx={{ color: (t) => t.palette.secondary.main }}>Total Point</Typography>
                </Stack>
              </TableCell>
              <TableCell />
              <TableCell />
              <TableCell align="center">
                <Typography sx={{ color: (t) => t.palette.secondary.main }}>
                  {pvPoint} Point
                </Typography>
              </TableCell>
            </TableRow>
           <TableRow>
            <TableCell style={{ width: "20vw", minWidth: 300 }}>
              <Stack direction="row">
                <Typography sx={{ color: (t) => t.palette.secondary.main, fontWeight: 'bold' }}>Total </Typography>
              </Stack>
            </TableCell>
            <TableCell />
            <TableCell />
            <TableCell align="center">
              <Typography sx={{ color: (t) => t.palette.secondary.main, fontWeight: "bold" }}>
                RM {setPriceFormat(total)}
              </Typography>
            </TableCell>
          </TableRow>
         </TableBody>
        }
      </Table>
    </TableContainer>
  );
};

export default CartTable;
