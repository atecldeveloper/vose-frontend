
import { SnackBarType } from "../../constants";
import { FetchFunctionProps } from "../../types";
import { apiMiddleware } from "../../../utils/middleware";
import {
  ContactFormProps, getAllShop,
  getDetailsByReferralCode,
  getDetailsByShopCode,
  getStateList,
  GetStateListProps,
  resetWithToken, sendContactForm, transactions,
  verifyToken
} from "../../services/ganeral";
import {comparePassword, isEmpty, validEmail} from "../../../utils/validation";
import useCheckIsValidation from "../../hooks/useCheckIsValidation";


export type GetStateListAPIProps = { country: number } & FetchFunctionProps;

export type VerifyTokenAPIProps = { token: any } & FetchFunctionProps;

export type GetMemberDetailByReferralCodeProps = { referralCode: any } & FetchFunctionProps;

export type GeShopNameByShopCodeProps = { shopCode: any } & FetchFunctionProps;

export type ContactFormAPIProps = ContactFormProps & FetchFunctionProps;

export type ResetPasswordProps = {
  token: any
  password: string
  confirmPassword: string
} & FetchFunctionProps

export type ManualTransactionProps = {
  orderID: string
} & FetchFunctionProps;

export const handleGetStateListAPI = async ({
  country,
  setMainState,
  changeContext,
  handleOpenSnackbar,
}: GetStateListAPIProps ) => {

  const params: GetStateListProps = {
    country
  }

  const { data, success } = await apiMiddleware(changeContext, handleOpenSnackbar, getStateList, params);
  let _data: any = [
    {
      label: '-',
      name: '-',
      value: 0,
      code: '-'
    }
  ];
  if (success) {
    data.map((e: any) => {
      const obj = {
        label: e.state,
        name: e.state,
        value: e.id,
        code: e.code
      }
      _data.push(obj);
    })

    setMainState(_data)
  }

  return _data
};

export const handleVerifyTokenAPI = async ({
  token,
  changeContext,
  handleOpenSnackbar,
}: VerifyTokenAPIProps) => {
  const { data, success } = await apiMiddleware(changeContext, handleOpenSnackbar, verifyToken, token);

  if (!success) {
    handleOpenSnackbar('Invalid token!', SnackBarType.Error)
  }
}

export const resetPasswordAPI = async ({
  token,
  password,
  confirmPassword,
  changeContext,
  handleOpenSnackbar,
}: ResetPasswordProps) => {
  const body = {token, password}

  const verifyArr = [
    comparePassword(password, confirmPassword),
  ];

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const isValidate = useCheckIsValidation(verifyArr.reverse(), handleOpenSnackbar);
  if (!isValidate) return false;

  const { success } = await apiMiddleware(changeContext, handleOpenSnackbar, resetWithToken, body);

  return success
}

export const submitContactForm = async ({
  name,
  email,
  phoneNumber,
  message,
  changeContext,
  handleOpenSnackbar,
}: ContactFormAPIProps) => {
  const body = {name, email, phoneNumber, message}

  const verifyArr = [
      isEmpty(name, 'Name'),
      validEmail(email),
      isEmpty(phoneNumber, 'Phone Number'),
      isEmpty(message, 'Message>'),
  ];

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const isValidate = useCheckIsValidation(verifyArr.reverse(), handleOpenSnackbar);
  if (!isValidate) return false;

  const {success} = await apiMiddleware(changeContext, handleOpenSnackbar, sendContactForm, body);

  return success;
}

export const getAllShopAPI = async ({
    changeContext,
    handleOpenSnackbar,
}: FetchFunctionProps) => {
  return apiMiddleware(changeContext, handleOpenSnackbar, getAllShop);

}

export const manualTransactionAPI = async ({
  orderID,
  changeContext,
  handleOpenSnackbar,
}: ManualTransactionProps) => {
  const body = {
    "id": orderID,
    "collection_id": "axenuof14",
    "paid": "true",
    "state": "paid",
    "amount": "0",
    "paid_amount": "0",
    "due_at": "2022-7-26",
    "email": "admin@gmail.com",
    "mobile": "",
    "name": "ADMIN",
    "url": "https://www.billplz-sandbox.com/bills/ievu6la9",
    "paid_at": "2022-07-26 15:51:28 +0800",
    "transaction_id": orderID,
    "transaction_status": "completed",
    "x_signature": "b617a905869a1d6f78d3f2085397c485a3ed821de01e0afa6bd24c2ada67dc1f"
  }

  return apiMiddleware(changeContext, handleOpenSnackbar, transactions, body);
}

export const handleGetReferralCodeName = async ({
  referralCode,
  setMainState,
  changeContext,
  handleOpenSnackbar,
}: GetMemberDetailByReferralCodeProps) => {
  const { data, success } = await apiMiddleware(changeContext, handleOpenSnackbar, getDetailsByReferralCode, referralCode);

  if (!success) {
    handleOpenSnackbar('Referral Invalid!', SnackBarType.Error)
    setMainState({referralName: ''})
    return false
  }
  return {data, success}
}

export const handleGetShopCodeName = async ({
  shopCode,
  setMainState,
  changeContext,
  handleOpenSnackbar,
}: GeShopNameByShopCodeProps) => {
  const { data, success } = await apiMiddleware(changeContext, handleOpenSnackbar, getDetailsByShopCode, shopCode);

  if (!success) {
    handleOpenSnackbar('Shop Code Invalid!', SnackBarType.Error)
    setMainState({shopName: ''})
    return false
  }
  return {data, success}
}