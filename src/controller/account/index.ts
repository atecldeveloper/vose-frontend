import moment from "moment";
import {FetchFunctionProps, PaginationProps} from "../../types";
import useCheckIsValidation from "../../hooks/useCheckIsValidation";
import {comparePassword, isEmpty, validEmail} from "../../../utils/validation";
import { apiMiddleware } from "../../../utils/middleware";
import { CountryList, SnackBarType } from "../../constants"
import {
    LoginProps, login, logout, getDetails,
    UpdateDetailsProps,
    updateDetails,
    getDashboard,
    getAddress,
    UpdateAddressProps,
    updateAddress,
    UpdateBankProps,
    getBank,
    updateBank,
    UpdatePasswordProps,
    updatePassword,
    GetFirstLayerDownlineProps,
    getFirstLayerDownline,
    GetSecondLayerDownlineProps,
    getSecondLayerDownline, RequestResetPasswordProps, resetPasswordRequest, updateIC, checkLogin
} from "../../services/account";

export type LoginAPIProps = LoginProps & FetchFunctionProps

export type UpdateDetailsAPIProps = UpdateDetailsProps & FetchFunctionProps

export type RequestResetPasswordAPIProps = RequestResetPasswordProps & FetchFunctionProps

export const handleLoginAPI = async ({
    username,
    password,
    changeContext,
    handleOpenSnackbar,
}: LoginAPIProps) => {
    const body = {username, password}

    const verifyArr = [
        isEmpty(username, "Username"),
        isEmpty(password, "Password"),
    ];

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const isValidate = useCheckIsValidation(verifyArr.reverse(), handleOpenSnackbar);
    if (!isValidate) return false;

    const { data, success } = await apiMiddleware(changeContext, handleOpenSnackbar, login, body);
    if (success) {
        const obj = {
            username: data.username,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            shopStatus: data.shopStatus,
            isShop: data.isShop
        }
        changeContext({ isLogin: true, account: obj });
        handleOpenSnackbar(`Welcome ${username}!`, SnackBarType.Success);
    }

    return {data, success}
}

export const handleLogoutAPI = async ({
    changeContext,
    handleOpenSnackbar,
}: FetchFunctionProps) => {
    return apiMiddleware(changeContext, handleOpenSnackbar, logout);
}

export const handleRequestResetPasswordAPI = async ({
    username,
    email,
    changeContext,
    handleOpenSnackbar
}: RequestResetPasswordAPIProps) => {
    const body = {username, email}

    const verifyArr = [
        isEmpty(username, "Username"),
        validEmail(email),
    ];

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const isValidate = useCheckIsValidation(verifyArr.reverse(), handleOpenSnackbar);
    if (!isValidate) return false;

    return apiMiddleware(changeContext, handleOpenSnackbar, resetPasswordRequest, body);
}

export const handleGetDetailsAPI = async ({
    setMainState,
    changeContext,
    handleOpenSnackbar,
}: FetchFunctionProps) => {
    const {data, success} = await apiMiddleware(changeContext, handleOpenSnackbar, getDetails);
    if (success) {
        setMainState({
            username: data.username,
            firstName: data.firstName,
            lastName: data.lastName,
            icNumber: data.icNumber,
            email: data.email,
            phoneNumber: data.phoneNumber,
            birthday: data.birthday ? moment(data.birthday, 'YYYY-MM-DD'): null,
            refererBy: data.refererBy ? data.refererBy : {firstName: "-",lastName: ""},
            referralCode: data.referralCode,
            tier: data.tier,
        })
    }
}

export const handleGetDetailsReturnAPI = async ({
  changeContext,
  handleOpenSnackbar,
}: FetchFunctionProps) => {
    return await apiMiddleware(changeContext, handleOpenSnackbar, getDetails);
}

export const handleUpdateAPI = async ({
    firstName,
    lastName,
    phoneNumber,
    email,
    birthday,
    changeContext,
    handleOpenSnackbar,
}: UpdateDetailsAPIProps) => {
    const body = {
        firstName,
        lastName,
        email,
        phoneNumber,
        birthday: moment(birthday, 'MM-DD-YYYY').format('YYYY-MM-DD'),
    }


    const verifyArr = [
        isEmpty(firstName, "First Name"),
        isEmpty(lastName, "Last Name"),
        isEmpty(phoneNumber, "Phone Number"),
        validEmail(email),
        isEmpty(birthday, "Birthday"),
    ];

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const isValidate = useCheckIsValidation(verifyArr.reverse(), handleOpenSnackbar);
    if (!isValidate) return false;

    const { success } = await apiMiddleware(changeContext, handleOpenSnackbar, updateDetails, body);

    if (success) {
        handleOpenSnackbar(`Successfully update`, SnackBarType.Success);
    }
}

export const handleGetDashboardAPI = async ({
    setMainState,
    changeContext,
    handleOpenSnackbar,
}:FetchFunctionProps) => {
    const {data, success} = await apiMiddleware(changeContext, handleOpenSnackbar, getDashboard);

    if (success) {
        const completeMission: any = []
        const unCompleteMission: any = []

        for (const item of data.missionList) {
            if (item.done) completeMission.push(item)
            else unCompleteMission.push(item)
        }

        setMainState({
            ...data,  
            completeMission,
            unCompleteMission
        })
    }

}

export type GetAddressAPIProps = {
  setShippingAddress: any,
  setBillingAddress: any,
} & FetchFunctionProps;

export const handleGetAddressAPI = async ({
  setShippingAddress,
  setBillingAddress,
  changeContext,
  handleOpenSnackbar,
}: GetAddressAPIProps) => {

  const {data, success} = await apiMiddleware(changeContext, handleOpenSnackbar, getAddress);
  if (success) {
      const shippingObj = {
        ...data.shippingAddress,
        state: data.shippingAddress.state.ID,
        // country: getArrayObjByLabel(CountryList, data.shippingAddress.country).value,
        country: data.shippingAddress.country,
      }

      const billingObj = {
        ...data.billingAddress,
        state: data.billingAddress.state.ID,
        // country: getArrayObjByLabel(CountryList, data.billingAddress.country).value,
        country: data.billingAddress.country
      }
      setShippingAddress(shippingObj)
      setBillingAddress(billingObj)

      return { shippingAddress: shippingObj, billingAddress: billingObj}
  }
}


export type UpdateAddressAPIProps = UpdateAddressProps & FetchFunctionProps;

export const handleUpdateAddressAPI = async ({
  shippingAddress,
  billingAddress,
  changeContext,
  handleOpenSnackbar,
}: UpdateAddressAPIProps) => {

  const body: UpdateAddressProps = {
    shippingAddress: {
      ...shippingAddress,
      country: shippingAddress.country
    },
    billingAddress: {
      ...billingAddress,
      country: billingAddress.country
    }
  }

  const {success} = await apiMiddleware(changeContext, handleOpenSnackbar, updateAddress, body);
  if (success) {
    handleOpenSnackbar('Update Success!', SnackBarType.Success)
  }
}

export const handleGetBankAPI = async ({
   setMainState,
   changeContext,
   handleOpenSnackbar,
}: FetchFunctionProps) => {
    const {data, success} = await apiMiddleware(changeContext, handleOpenSnackbar, getBank);
    if (success) {
        setMainState(data)
    }
}

export type UpdateBankAPIProps = UpdateBankProps & FetchFunctionProps;

export const handleUpdateBankAPI = async ({
  name,
  bankNo,
  bank,
  changeContext,
  handleOpenSnackbar,
}: UpdateBankAPIProps) => {

  const body: UpdateBankProps = {
    name,
    bankNo,
    bank,
  }
  const {data, success} = await apiMiddleware(changeContext, handleOpenSnackbar, updateBank, body);
  if (success) {
    handleOpenSnackbar('Update Success!', SnackBarType.Success)
  }
}

export type UpdateImageAPIProps = {
    files: Array<File>
} & FetchFunctionProps;

export const handleUpdateImageAPI = async ({
    files,
    changeContext,
    handleOpenSnackbar
}: UpdateImageAPIProps) => {
    const formData = new FormData()

    files.forEach((file: any) => {
        formData.append("file", file);
    });

    const { success } = await apiMiddleware(changeContext, handleOpenSnackbar, updateIC, formData);

    if (success) {
        handleOpenSnackbar('Update Success!', SnackBarType.Success)
    }
}


export type UpdatePasswordAPIProps = {
  currentPassword: string,
  newPassword: string,
  confirmPassword: string,
} & FetchFunctionProps;

export const handleUpdatePasswordAPI = async ({
  currentPassword,
  newPassword,
  confirmPassword,
  changeContext,
  handleOpenSnackbar,
}: UpdatePasswordAPIProps) => {
  const verifyArr = [
    isEmpty(currentPassword, "Current Password"),
    isEmpty(newPassword, "New Password"),
    isEmpty(confirmPassword, "Confirm Password"),
    comparePassword(newPassword,confirmPassword),
];

 const isValidate = useCheckIsValidation(verifyArr.reverse(), handleOpenSnackbar);
 if (!isValidate) return false;

  const body: UpdatePasswordProps = {
    oldPassword: currentPassword,
    newPassword: newPassword,
  }
  const {data, success} = await apiMiddleware(changeContext, handleOpenSnackbar, updatePassword, body);

  if (success) {
    handleOpenSnackbar('Update Success!', SnackBarType.Success)
  }
  return success
}


export type GetFistLayerDownlineListAPIProps = PaginationProps & FetchFunctionProps;

export const handleGetFirstLayerDownlineListAPI = async ({
  page,
  limit,
  order,
  orderBy,
  setMainState,
  changeContext,
  handleOpenSnackbar,
}: GetFistLayerDownlineListAPIProps) => {
  const apiParams: GetFirstLayerDownlineProps = {
    page,
    limit,
    order,
    orderBy,
  };
  const { data, success } = await apiMiddleware(changeContext, handleOpenSnackbar, getFirstLayerDownline, apiParams);
  if (success) {
    setMainState({ list: data.list, total: data.total });
  }
  return success;
};

export type GetSecondLayerDownlineListAPIProps = PaginationProps & FetchFunctionProps;

export const handleGetSecondLayerDownlineListAPI = async ({
  page,
  limit,
  order,
  orderBy,
  setMainState,
  changeContext,
  handleOpenSnackbar,
}: GetSecondLayerDownlineListAPIProps) => {
  const apiParams: GetSecondLayerDownlineProps = {
    page,
    limit,
    order,
    orderBy,
  };
  const { data, success } = await apiMiddleware(changeContext, handleOpenSnackbar, getSecondLayerDownline, apiParams);

  if (success) {
    setMainState({ list: data.list, total: data.total });
  }
  return success;
};

export const handleCheckLoginAPI = async ({
  setMainState,
  changeContext,
  handleOpenSnackbar,
}: FetchFunctionProps) => {
  const { data, success } = await apiMiddleware(changeContext, handleOpenSnackbar, checkLogin);
  
  return {data, success};
};
