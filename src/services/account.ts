import fetchData from "../../utils/fetchData";
import { AddressProps, PaginationProps } from "../types";

export type LoginProps = {
    username: string
    password: string
}

export type UpdateDetailsProps = {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    birthday: any
}

export const login = (body: LoginProps) => {
    return fetchData({
        url: `/account/login`,
        method: "POST",
        data: body,
    });
}

export const logout = () => {
    return fetchData({
        url: `/account/logout`,
        method: "POST",
    });
}

export type RequestResetPasswordProps = {
    username: string
    email: string
}

export const resetPasswordRequest = (body: RequestResetPasswordProps) => {
    return fetchData({
        url: `/account/forget-password`,
        method: "POST",
        data: body,
    });
}

export const getDetails = () => {
    return fetchData({
        url: `/account/info`,
        method: "GET",
    });
}

export const updateDetails = (body: UpdateDetailsProps) => {
    return fetchData({
        url: `/account/info`,
        method: "PUT",
        data: body,
    });
}

export const getDashboard = () => {
    return fetchData({
        url: `/account/dashboard`,
        method: "GET",
    });
}

export const getAddress = () => {
    return fetchData({
      url: `/account/address`,
      method: "GET",
    });
}

export type UpdateAddressProps = {
  shippingAddress: AddressProps;
  billingAddress: AddressProps;
}

export const updateAddress = (body: UpdateAddressProps) => {
  return fetchData({
    url: `/account/address`,
    method: "PUT",
    data: body
  });
}

export const getBank = () => {
    return fetchData({
        url: `/account/bank`,
        method: "GET",
    });
}

export type UpdateBankProps = {
  name: string;
  bankNo: string;
  bank: string;
}

export const updateBank = (body: UpdateBankProps) => {
  return fetchData({
    url: `/account/bank`,
    method: "PUT",
    data: body
  });
}

export const updateIC = (body: FormData) => {
    return fetchData({
        url: `/account/ic/photo`,
        method: "POST",
        data: body,
        header: {
            "Content-Type": "multipart/form-data",
        },
    });
}

export type UpdatePasswordProps = {
  oldPassword: string;
  newPassword: string;
}

export const updatePassword = (body: UpdatePasswordProps) => {
  return fetchData({
    url: `/account/update-password`,
    method: "PUT",
    data: body
  });
}


export type GetFirstLayerDownlineProps = PaginationProps;

export const getFirstLayerDownline = (params: GetFirstLayerDownlineProps) => {
  return fetchData({
    url: `/account/first-line`,
    method: "GET",
    params: params
  });
}


export type GetSecondLayerDownlineProps = PaginationProps;

export const getSecondLayerDownline = (params: GetSecondLayerDownlineProps) => {
  return fetchData({
    url: `/account/second-line`,
    method: "GET",
    params: params
  });
}

export const checkLogin = () => {
  return fetchData({
    url: `/check-login`,
    method: "GET",
  });
}
