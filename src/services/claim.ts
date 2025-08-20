import fetchData from "../../utils/fetchData";
import { PaginationProps } from "../types";

export type GetClaimListProps = PaginationProps;

export function getClaimList(params: GetClaimListProps) {
  return fetchData({
    url: "/claim-list",
    method: "GET",
    params: params
  });
}


export function getClaimDetails(ID: number) {
  return fetchData({
    url: `/claim-details/${ID}`,
    method: "GET",
  });
}
