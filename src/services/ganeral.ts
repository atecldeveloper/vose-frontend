import fetchData from "../../utils/fetchData";

export type GetStateListProps = {
  country: number
}

export type ResetWithTokenProps = {
  token: any
  password: string
}

export type ContactFormProps = {
  name: string
  email: string
  phoneNumber: string
  message: string
}

export function getStateList(params: GetStateListProps) {
  return fetchData({
    url: "/state",
    method: "GET",
    params: params
  });
}

export function verifyToken(token: string) {
  return fetchData({
    url: "/account/forget-password-verify",
    method: "POST",
    data: {token}
  });
}

export function resetWithToken(body: ResetWithTokenProps) {
  return fetchData({
    url: "/account/forget-password-reset",
    method: "POST",
    data: body
  });
}

export function sendContactForm(body: ContactFormProps) {
  return fetchData({
    url: "/contact-us",
    method: "POST",
    data: body
  });
}

export function getAllShop() {
  return fetchData({
    url: "/shop/all-location",
    method: "GET",
  });
}

export function transactions(body: any) {
  return fetchData({
    url: "/transaction/manual-callback",
    method: "POST",
    data: body
  });
}

export function getDetailsByReferralCode(referralCode: any) {
  return fetchData({
    url: `/decode-referral-code/${referralCode}`,
    method: "GET",
  });
}

export function getDetailsByShopCode(shopCode: any) {
  return fetchData({
    url: `/decode-shop-code/${shopCode}`,
    method: "GET",
  });
}
