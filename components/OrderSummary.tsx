import { Box, Typography, Paper, Stack, Divider, Button, Checkbox } from "@mui/material";
import React from "react";
import { useProps } from "../src/context/state";
import { setPriceFormat, getArrayObjByValue } from "../utils";
import { STATIC_VARIABLE } from "../src/constants/staticData";
import CloseIcon from "@mui/icons-material/Close";
import {useTranslations} from "next-intl";

type OrderSummeryProps = {
  step: "1" | "2" | "3";
  unit: string;
  subTotal: number;
  shippingFee: number;
  total: number;
  registerFee: number;
  pvPoint?: number;
  isMember?: boolean;
  voucher?: any;
  isUseCoin: boolean;
  coins?: any;
  handleClick: (path: string) => void;
  handleApply?: (e: any) => void;
  handleRemoveVoucher?: (e: any) => void;
  disabled?: boolean;
};

const OrderSummery = ({
  step,
  unit,
  subTotal,
  shippingFee,
  total,
  pvPoint,
  registerFee,
  isMember = false,
  voucher,
  isUseCoin,
  coins,
  disabled = false,
  handleApply,
  handleClick,
  handleRemoveVoucher,
}: OrderSummeryProps) => {
  const { isLogin } = useProps();
  const t = useTranslations("Cart");
  const td = useTranslations("Dashboard");

  let button = {
    label: "Next",
    path: "/order/checkout",
  };

  let _total = total;
  switch (step) {
    case "1":
      button = {
        label: "CHECKOUT",
        path: "/order/checkout",
      };
      break;
    case "2":
      button = {
        label: "PAYMENT",
        path: "",
      };
      break;
    default:
      break;
  }

  return (
    <Paper sx={{ backgroundColor: (t) => t.palette.secondary.light, px: 4, py: 4, borderRadius: 0 }}>
      <Stack alignItems="center">
        <Typography sx={{ color: "white", pb: 3, fontWeight: 500, fontSize: 20 }}>{t('CART_S_TITLE')}</Typography>
        <Divider light sx={{ width: "100%", borderColor: "white" }} />
        <Stack direction="row" justifyContent="space-between" sx={{ width: "90%", py: 2 }}>
          <Typography sx={{ color: "white" }}>{t('CART_S_SUB')}</Typography>
          <Typography sx={{ color: "white", minWidth: 80, textAlign: "end" }}>
            {unit} {subTotal}
          </Typography>
        </Stack>
        {step == "2" && (
          <>
          <Stack direction="row" justifyContent="space-between" sx={{ width: "90%", py: 2 }}>
            <Typography sx={{ color: "white" }}>{t('CART_S_SHP')}</Typography>
            <Typography sx={{ color: "white", minWidth: 80, textAlign: "end" }}>
              {shippingFee == 0 ? "-" : `${unit} ${shippingFee}`}
            </Typography>
          </Stack>
         {shippingFee == 0 && <Typography sx={{ color: "white", px: 2, fontSize: 15 }}>{t('SHIPPING_SHOP')}</Typography>}
          </>
        )}

        {isMember && (
          <Stack direction="row" justifyContent="space-between" sx={{ width: "90%", py: 2 }}>
            <Typography sx={{ color: "white" }}>{t('CART_S_REG_F')}</Typography>
            <Typography sx={{ color: "white", minWidth: 80, textAlign: "end" }}>{unit} {registerFee}.00</Typography>
          </Stack>
        )}

        { subTotal != 0 && isLogin && step == "1" && (
          <Stack
            direction="row"
            alignItems="center"
            justifyItems="flex-start"
            sx={{
              width: "100%",
              mt: 1,
              color: "white",
            }}
          >
            <Checkbox
              sx={{
                color: "white",
                "&.Mui-checked": {
                  color: "white",
                },
              }}
              checked={isUseCoin}
              onChange={handleApply}
            />
            <Typography sx={{ fontSize: 18, mt: "4px", fontWeight: "bold" }}>{t('CART_S_USC')}</Typography>
          </Stack>
        )}

        {isUseCoin && isLogin &&(
          <>
            {step == "1" && (
              <Stack direction="row" justifyContent="space-between" sx={{ width: "90%" }}>
                <Typography sx={{ color: "white" }}>{t('CART_S_AC')}</Typography>
                <Typography sx={{ color: "white", minWidth: 80, textAlign: "end" }}>
                  {coins.available} Coin
                </Typography>
              </Stack>
            )}

            <Stack direction="row" justifyContent="space-between" sx={{ width: "90%" }}>
              <Typography sx={{ color: "white" }}>{step == "2" ? "Coin " : ""}{t('CART_S_DIS')} </Typography>
              <Typography sx={{ color: "white", minWidth: 80, textAlign: "end" }}>
                - (RM {setPriceFormat(coins.value)})
              </Typography>
            </Stack>
          </>
        )}
        {voucher && voucher.discount && (
          <Box sx={{ width: "90%", mt: 3 }}>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
              <Typography sx={{ color: "white", fontWeight: "bold" }}>{t('CART_S_VA')}</Typography>
              {step == "1" && (
                <Button
                  variant="text"
                  sx={{ p: "0px !important", color: "#A50203" }}
                  startIcon={<CloseIcon sx={{ color: "#A50203", fontSize: "14px !important" }} />}
                  onClick={handleRemoveVoucher}
                >
                  <Typography sx={{ fontSize: "14px !important", mb: "-2.5px" }}>Remove</Typography>
                </Button>
              )}
            </Stack>
            <Stack direction="row" justifyContent="space-between" sx={{ width: "100%" }}>
              <Typography sx={{ color: "white" }}>Name:</Typography>
              <Typography sx={{ color: "white", maxWidth: 200, textAlign: "end" }}>
                {voucher.title}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" sx={{ width: "100%" }}>
              <Typography sx={{ color: "white" }}>Code:</Typography>
              <Typography sx={{ color: "white", minWidth: 80, textAlign: "end" }}>{voucher.code}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" sx={{ width: "100%" }}>
              <Typography sx={{ color: "white" }}>Discount:</Typography>
              <Typography sx={{ color: "white", minWidth: 80, textAlign: "end" }}>
                {
                  voucher.discountType == 1 ? <>
                    {getArrayObjByValue(STATIC_VARIABLE.voucherDiscountTypeArray, voucher.discountType).label}{" "}
                    {voucher.discount}
                  </>:
                   <>
                   {voucher.discount}{" "}
                   {getArrayObjByValue(STATIC_VARIABLE.voucherDiscountTypeArray, voucher.discountType).label}
                 </>
                }

              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" sx={{ width: "100%" }}>
              <Typography sx={{ color: "white" }}>Point:</Typography>
              <Typography sx={{ color: "white", minWidth: 80, textAlign: "end" }}>- {voucher.point}</Typography>
            </Stack>
          </Box>
        )}

        <Divider light sx={{ width: "100%", borderColor: "white", mt: 20 }} />
        <Stack direction="row" justifyContent="space-between" sx={{ width: "90%", py: 2 }}>
          <Typography sx={{ color: "white", fontWeight: "bold" }}>{t("CART_S_T")}</Typography>
          <Typography sx={{ color: "white", fontWeight: "bold", minWidth: 80, textAlign: "end" }}>
            {unit} {_total}
          </Typography>
        </Stack>
        {step == "2" && (
          <Stack direction="row" justifyContent="space-between" sx={{ width: "90%", py: 2 }}>
            <Typography sx={{ color: "white" }}>{td('POINT')}</Typography>
            <Typography sx={{ color: "white", minWidth: 80, textAlign: "end" }}>{pvPoint}</Typography>
          </Stack>
        )}

        <Button
          sx={{
            mt: 8,
            width: "100%",
            color: (t) => t.palette.secondary.light,
            backgroundColor: "white",
            px: 1,
            borderRadius: 0,
            "&:hover": {
              backgroundColor: "white",
            },
          }}
          disabled={disabled}
          onClick={() => handleClick(button.path)}
        >
          {button.label}
        </Button>
      </Stack>
    </Paper>
  );
};

export default OrderSummery;
