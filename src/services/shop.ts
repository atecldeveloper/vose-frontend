import fetchData from "../../utils/fetchData";
import { AddressProps, PaginationProps } from "../types";

export function getShopDetails() {
  return fetchData({
    url: "/shop",
    method: "GET",
  });
}

export type ShopOrderListProps = { orderStatus: number } & PaginationProps;
export function getShopOrderList(params: ShopOrderListProps) {
  return fetchData({
    url: "/shop/order-list",
    method: "GET",
    params: params,
  });
}


export type UpdateShopOrderProps = { status: number };
export function updateShopOrderStatus(body: ShopOrderListProps, orderID: number) {
  return fetchData({
    url: `/shop/order/${orderID}`,
    method: "PUT",
    data: body,
  })
}

export function getShopCertDetails() {
  return fetchData({
    url: "/shop/certs",
    method: "GET",
  });
}

export type UpdateShopDetailsProps = {
  shopName: string,
  email: string,
  phoneNumber: string,
  shopAddress: AddressProps
}
export function updateShopDetails(body: UpdateShopDetailsProps) {
  return fetchData({
    url: `/shop`,
    method: "PUT",
    data: body
  });
}

export function registerShop(body: FormData) {
  return fetchData({
    url: `/shop`,
    method: "POST",
    data: body,
    header: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function checkReferral(referralCode: string) {
  return fetchData({
    url: `/shop/check-referral`,
    method: "POST",
    data: {referralCode}
  });
}

export type ShopCheckOutProps = {
  productArr: any,
  billingAddress: AddressProps,
  shippingAddress: AddressProps,
  remarks: string
}
export function shopCheckOut(body: FormData) {
  return fetchData({
    url: `/shop/checkout`,
    method: "POST",
    data: body,
    header: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function shopConfigs() {
  return fetchData({
    url: "/shop/configs",
    method: "GET",
  });
}
