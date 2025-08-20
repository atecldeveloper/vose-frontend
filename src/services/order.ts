import { ProductListCellProps } from "../../components/ProductListCell";
import fetchData from "../../utils/fetchData";
import { AddressProps, LocalCartCellProps, PaginationProps } from "../types";

export type OrderListProps = PaginationProps;

export function getOrderList(params: OrderListProps) {
  return fetchData({
    url: "/order",
    method: "GET",
    params: params,
  });
}

export function getStockList(params: PaginationProps) {
  return fetchData({
    url: "/shop/stock-list",
    method: "GET",
    params: params,
  });
}

export function checkOrderByID(orderID: string) {
  return fetchData({
    url: `/order/${orderID}`,
    method: "GET",
  });
}

export function checkOrderByPaymentID(paymentID: string) {
  return fetchData({
    url: `/order/payment/${paymentID}`,
    method: "GET",
  });
}

export function getCartList() {
  return fetchData({
    url: `/products/cart/`,
    method: "GET",
  });
}

export type UpdateCartProps = {items: any} ;

export function updateCart(body: UpdateCartProps) {
  return fetchData({
    url: `/products/cart/`,
    method: "POST",
    data: body,
  });
}

//abandon
export type AddToCartProps = {quantity: number} ;

export function addToCart(body: AddToCartProps, productID: number) {
  return fetchData({
    url: `/products/cart/${productID}`,
    method: "POST",
    data: body,
  });
}

export function deleteCart(productID: number) {
  return fetchData({
    url: `/products/cart/${productID}`,
    method: "DELETE",
  });
}


export type CheckoutProps = {
  username: string,
  icFirstName: string,
  icLastName: string,
  email: string,
  joinMember: boolean,
  password: string,
  icNumber: string,
  pickInShop: boolean,
  phoneNumber: string,
  birthday: any,
  referralCode: string,
  // firstName: string,
  // lastName: string,
  // company: string,
  shopCode: string,
  adminCode: string,
  productArr: Array<LocalCartCellProps>,
  voucherID: number,
  coin: boolean,
  shipping: {
    shippingInfo: {
      firstName: string,
      lastName: string,
      phoneNumber: string,
      email: string,
    },
    shippingAddress: AddressProps,
  }
  billingAddress: AddressProps,
  remarks: string,
  files: Array<File>
};

export function checkout(body: FormData) {
  return fetchData({
    url: `/products/checkout`,
    method: "POST",
    data: body,
    header: {
      "Content-Type": "multipart/form-data",
    },
  });
}
