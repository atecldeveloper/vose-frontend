import fetchData from "../../utils/fetchData";
import { PaginationProps } from "../types";

export type GetVoucherListProps = PaginationProps;

export function getVoucherList(params: GetVoucherListProps) {
  return fetchData({
    url: "/vouchers/list",
    method: "GET",
    params: params
  });
}


export type GetAvailableVoucherListProps = PaginationProps;

export function getAvailableVoucherList(params: GetAvailableVoucherListProps) {
  return fetchData({
    url: "/vouchers/available",
    method: "GET",
    params: params
  });
}


export function claimVoucher(voucherID: number) {
  return fetchData({
    url: `/vouchers/claims/${voucherID}`,
    method: "POST",
  });
}


