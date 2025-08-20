import { apiMiddleware } from "../../../utils/middleware";
import { claimVoucher, getAvailableVoucherList, getVoucherList } from "../../services/voucher";
import { FetchFunctionProps, PaginationProps } from "../../types";

export type GetVoucherListAPIProps = PaginationProps & FetchFunctionProps;

export const handleGetVoucherListAPI = async ({
  page,
  limit,
  order,
  orderBy,
  setMainState,
  changeContext,
  handleOpenSnackbar,
}: GetVoucherListAPIProps) => {
  const apiParams = {
    page,
    limit,
    order,
    orderBy,
  };
  const { data, success } = await apiMiddleware(changeContext, handleOpenSnackbar, getVoucherList, apiParams);
  if (success) {
    setMainState({ list: data.list, total: data.total });
  }
  return success;
};


export type GetAvailableVoucherListAPIProps = PaginationProps & FetchFunctionProps;
export const handleGetAvailableVoucherListAPI = async ({
  page,
  limit,
  order,
  orderBy,
  setMainState,
  changeContext,
  handleOpenSnackbar,
}: GetAvailableVoucherListAPIProps) => {
  const apiParams = {
    page,
    limit,
    order,
    orderBy,
  };
  const { data, success } = await apiMiddleware(changeContext, handleOpenSnackbar, getAvailableVoucherList, apiParams);
  if (success) {
    setMainState({ list: data.list, total: data.total });
  }
  return success;
};

export type ClaimVoucherAPIProps = {voucherID: number} & FetchFunctionProps;
export const handleClaimVoucherListAPI = async ({
  voucherID,
  changeContext,
  handleOpenSnackbar,
}: ClaimVoucherAPIProps) => {

  const { data, success } = await apiMiddleware(changeContext, handleOpenSnackbar, claimVoucher, voucherID);

  return success;
};
