import { AddressProps, LocalCartCellProps, PaginationProps } from "../types";
import fetchData from "../../utils/fetchData";


export type GetProductListProps = {categoryID: number, minPrice: number, maxPrice: number} & PaginationProps;

export function getProductList(params: GetProductListProps) {
  return fetchData({
    url: "/products",
    method: "GET",
    params: params,
  });
}


export function getProductCategoriesList() {
  return fetchData({
    url: "/categories",
    method: "GET",
  });
}

export type GetProductListByIdProps = {
  productArr: Array<LocalCartCellProps>,
  voucherCode: string,
  useCoin: boolean
};

export function getProductListById(body: GetProductListByIdProps) {
  return fetchData({
    url: "/products/guest-cart",
    method: "POST",
    data: body
  })
}

export type GetCheckoutDetailsProps = {
  productArr: Array<LocalCartCellProps>,
  voucherCode: string,
  useCoin: boolean,
  joinMember: boolean,
  pickInShop: boolean,
  country: number,
  shipping: {
    shippingInfo: {
      email: string,
      name: string,
      phoneNumber: string
    },
    shippingAddress: AddressProps
  }
};

export function getCheckoutDetails(body: GetCheckoutDetailsProps) {
  return fetchData({
    url: "/products/checkout-summary",
    method: "POST",
    data: body
  })
}

export function getProductDetails(id: any) {
  return fetchData({
    url: `/products/${id}`,
    method: "GET",
  });
}


export function getRelativeProduct(productID: any) {
  return fetchData({
    url: `/products/${productID}/related`,
    method: "GET",
  });
}

export function getHighlightsProduct() {
  return fetchData({
    url: `/products/highlights`,
    method: "GET",
  });
}
export function getAllProduct() {
  return fetchData({
    url: `/products/all`,
    method: "GET",
  });
}
