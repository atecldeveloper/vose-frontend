import { AddressProps, FetchFunctionProps, PaginationProps } from "../../types";
import { SnackBarType } from "../../constants";
import { apiMiddleware } from "../../../utils/middleware";
import {
  getShopCertDetails,
  getShopDetails,
  updateShopDetails,
  UpdateShopDetailsProps,
  getShopOrderList,
  updateShopOrderStatus,
  registerShop,
  ShopCheckOutProps,
  shopCheckOut, checkReferral, shopConfigs
} from "../../services/shop";
import {
  checkPhoneStringLength,
  isEmpty,
  isEmptyNumber,
  validEmail,
  validPassword,
  validUsername
} from "../../../utils/validation";
import useCheckIsValidation from "../../hooks/useCheckIsValidation";


export type GetShopDetailsAPIProps = { setAddress: any } & FetchFunctionProps;
export type UpdateDetailsAPIProps = UpdateShopDetailsProps & FetchFunctionProps;

export const handleGetShopDetailsAPI = async ({
  setAddress,
  setMainState,
  changeContext,
  handleOpenSnackbar,
}: GetShopDetailsAPIProps ) => {
  const { data, success } = await apiMiddleware(changeContext, handleOpenSnackbar, getShopDetails);

  if (success) {
    setMainState(data)
    setAddress(data.address)
  }
};

export const handleGetShopCertDetailsAPI = async ({
  setMainState,
  changeContext,
  handleOpenSnackbar,
}: FetchFunctionProps) => {
  const { data, success } = await apiMiddleware(changeContext, handleOpenSnackbar, getShopCertDetails);

  if (success) {
    setMainState({
      ssmID: data.SSM,
      partnerList: data.partners.map((e: any) => ({
        ...e,
        ic: e.icNumber,
      })),
      certs: data.ssmFiles,
      shopPhotos: data.shopPhotos,
    })
  }

}


export type GetShopOrderListAPIProps = {status?: number} & PaginationProps & FetchFunctionProps;

export const handleGetShopOrderListAPI = async ({
  page,
  limit,
  order,
  orderBy,
  status,
  setMainState,
  changeContext,
  handleOpenSnackbar,
}: GetShopOrderListAPIProps) => {
  const apiParams = {
    page,
    limit,
    order,
    orderBy,
    status
  };
  const { data, success } = await apiMiddleware(changeContext, handleOpenSnackbar, getShopOrderList, apiParams);
  if (success) {
    setMainState({ list: data.list, total: data.total });
  }
  return success;
};



export type UpdateShopStatusAPIProps = { status: number, orderID: string } & FetchFunctionProps;

export const handleUpdateShopStatusAPI = async ({
  orderID,
  status,
  setMainState,
  changeContext,
  handleOpenSnackbar,
}: UpdateShopStatusAPIProps ) => {

  const body = {
    status
  }

  const { data, success } = await apiMiddleware(changeContext, handleOpenSnackbar, updateShopOrderStatus, body, orderID);
  if (success) {
    setMainState({orderStatus: status});
    handleOpenSnackbar('Update Success!', SnackBarType.Success)
    return true;
  }
  else {
    handleOpenSnackbar('Update Fail!', SnackBarType.Error)
    return false;
  }
};

export const handleUpdateDetailsAPI = async ({
  shopName,
  email,
  phoneNumber,
  shopAddress,
  changeContext,
  handleOpenSnackbar,
}: UpdateDetailsAPIProps) => {
  const body = {
    shopName,
    email,
    phoneNumber,
    shopAddress
  }

  const verifyArr = [
    isEmpty(shopName, "Shop Name"),
    validEmail(email),
    isEmpty(phoneNumber, "Phone Number"),
  ];

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const isValidate = useCheckIsValidation(verifyArr.reverse(), handleOpenSnackbar);
  if (!isValidate) return false;

  const {success} = await apiMiddleware(changeContext, handleOpenSnackbar, updateShopDetails, body);

  if (success) {
    handleOpenSnackbar('Update Success!', SnackBarType.Success)
  }
}

export const validateStepItem = async ({
  firstName,
  lastName,
  contact,
  contactNumber,
  email,
  username,
  password,
  referralCode,
  companyName,
  ssmID,
  address1,
  postalCode,
  city,
  state,
  country,
  step,
  changeContext,
  handleOpenSnackbar,
}: any) => {
  let validSuccess = true
  let referralSuccess = true
  let verifyArr: any = []

  if (step === 0) {
    verifyArr = [
      isEmpty(firstName, "First Name"),
      isEmpty(lastName, "Last Name"),
      isEmpty(contactNumber, "Contact No."),
      checkPhoneStringLength(contactNumber, "Contact No."),
      validEmail(email),
      validUsername(username),
      validPassword(password),
    ];
  }

  if (step === 1) {
    verifyArr = [
      isEmpty(companyName, "Shop Name"),
      isEmpty(ssmID, "Company SSM"),
      isEmpty(contact, "Shop Contact No."),
      checkPhoneStringLength(contact, "Shop Contact No."),
      isEmpty(address1, "Address"),
      isEmpty(postalCode, "Postal Code"),
      isEmpty(city, "City"),
      isEmptyNumber(state, "State"),
      isEmptyNumber(country, "Country"),
    ];
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const isValidate = useCheckIsValidation(verifyArr.reverse(), handleOpenSnackbar);
  if (!isValidate) validSuccess = false

  if (step === 0 && referralCode !== '') {
    const { success } = await apiMiddleware(changeContext, handleOpenSnackbar, checkReferral, referralCode);
    referralSuccess = success
  }

  return (validSuccess && referralSuccess)
}

export type RegisterShopProps = {
  firstName: string
  lastName: string
  contact: string
  contactNumber: string
  email: string
  username: string
  password: string
  referralCode: string
  companyName: string
  ssmID: string
  address1: string
  postalCode: string
  city: string
  state: number
  country: number
  isBeautician: boolean
  partners: Array<any>
  ssmFiles: Array<File>
  shopPhotoFiles: Array<File>
  shopPhotoSubFiles: Array<File>
  icFiles: Array<File>
  // icBackFiles: Array<File>
} & FetchFunctionProps

export const handleRegisterShopAPI = async ({
  firstName,
  lastName,
  contact,
  contactNumber,
  email,
  username,
  password,
  referralCode,
  companyName,
  ssmID,
  address1,
  postalCode,
  city,
  state,
  country,
  isBeautician,
  partners,
  ssmFiles,
  shopPhotoFiles,
  shopPhotoSubFiles,
  icFiles,
  // icBackFiles,
  changeContext,
  handleOpenSnackbar,
}: RegisterShopProps) => {
  let validation = true
  let validationText = ''

  for (const item of partners) {
    if (!item.name || !item.ic) {
      validationText = 'Partner info cannot be empty'
      validation = false
    }
  }

  // if (icBackFiles.length == 0 ) {
  //   validationText = 'Back IC must be provided'
  //   validation = false
  // }

  if (icFiles.length == 0) {
    validationText = 'Front IC must be provided'
    validation = false
  }

  // for (const item of icBackFiles) {
  //   if (!item) {
  //     validationText = 'Back IC must be provided'
  //     validation = false
  //   }
  // }

  for (const item of icFiles) {
    if (!item) {
      validationText = 'Front IC must be provided'
      validation = false
    }
  }

  if (!ssmFiles.length) {
    validationText = 'SSM files cannot be empty'
    validation = false
  }

  if (!shopPhotoFiles.length && !isBeautician) {
    validationText = 'Shop sign photo cannot be empty'
    validation = false
  }

  if (!shopPhotoSubFiles.length && !isBeautician) {
    validationText = 'Store photo cannot be empty'
    validation = false
  }

  if (!validation) {
    handleOpenSnackbar(validationText, SnackBarType.Error);
    return;
  }

  const address = {
    address1,
    address2: '',
    postalCode,
    city,
    state,
    country,
  }

  const owners = partners.map((e: any) => ({
    Name: e.name,
    IC: e.ic,
  }))

  const formData = new FormData()
  formData.append("referralCode", referralCode);
  formData.append("firstName", firstName);
  formData.append("lastName", lastName);
  formData.append("email", email);
  formData.append("contact", contact);
  formData.append("contactNumber", contactNumber);
  formData.append("username", username);
  formData.append("password", password);
  formData.append("shopName", companyName);
  formData.append("SSMID", ssmID);
  formData.append("isBeautician", isBeautician ? '1' : '2');
  formData.append("shopAddress", JSON.stringify(address));
  formData.append("owners", JSON.stringify(owners));

  // shopPhoto
  // shopPhotoSub
  ssmFiles.forEach((file: any) => {
    formData.append("SSM", file, file.rename);
  });

  icFiles.forEach((file: any) => {
    formData.append("ICFront", file, file.rename);
  });

  // icBackFiles.forEach((file: any) => {
  //   formData.append("ICBack", file, file.rename);
  // });

  shopPhotoFiles.forEach((file: any) => {
    formData.append("ShopPhoto", file, file.rename);
  });

  shopPhotoSubFiles.forEach((file: any) => {
    formData.append("ShopPhotoSub", file, file.rename);
  });
  const { success } = await apiMiddleware(changeContext, handleOpenSnackbar, registerShop, formData);
  return success
}

export type ShopCheckoutAPIProps = {
  productArr: any,
  pvPoint: number,
  shopMinPoint: number,
  adminCode: string,
  files: Array<File>,
  billingAddress: AddressProps,
  shippingAddress: AddressProps
} & FetchFunctionProps;

export const handleShopCheckoutAPI = async ({
  productArr,
  pvPoint,
  shopMinPoint,
  billingAddress,
  shippingAddress,
  adminCode,
  files,
  changeContext,
  handleOpenSnackbar,
}: ShopCheckoutAPIProps ) => {
  let validationText = '';
  let validation = true;
  if (pvPoint < shopMinPoint) {
    validationText = `Points is lower than ${shopMinPoint} Point`
    validation = false
  }

  if (!validation) {
    handleOpenSnackbar(validationText, SnackBarType.Error);
    return false
  }

  let verifyArr: any = []

  verifyArr = [
    isEmpty(shippingAddress.address1, "Shipping Address"),
    isEmpty(JSON.stringify(shippingAddress.country), "Shipping Country"),
    isEmpty(shippingAddress.postalCode, "Shipping Postal Code"),
    isEmpty(JSON.stringify(shippingAddress.state), "Shipping State"),
    isEmpty(billingAddress.address1, "Billing Address"),
    isEmpty(JSON.stringify(billingAddress.country), "Billing Country"),
    isEmpty(billingAddress.postalCode, "Billing Postal Code"),
    isEmpty(JSON.stringify(billingAddress.state), "Billing Address"),
  ];

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const isValidate = useCheckIsValidation(verifyArr.reverse(), handleOpenSnackbar);
  if (!isValidate) return false;


  let _productArr: any = [];

  productArr.map((e: any) => {
    if (e.quantity > 0) {
      _productArr.push({
        productID: e.ID,
        quantity: e.quantity,
      })
    }
  })
  // const body: ShopCheckOutProps = {
  //   productArr: _productArr,
  //   billingAddress,
  //   shippingAddress,
  //   remarks: ''
  // }

  const formData = new FormData()
  formData.append("productArr", JSON.stringify(_productArr));
  formData.append("billingAddress", JSON.stringify(billingAddress));
  formData.append("shippingAddress", JSON.stringify(shippingAddress));
  formData.append("adminCode", adminCode.trim());
  formData.append("remarks", '');

  if (files.length) {
    formData.append('file', files[0])
  }

  const { data, success } = await apiMiddleware(changeContext, handleOpenSnackbar, shopCheckOut, formData);

  return {data, success}
};

export const handleGetShopConfigsAPI = async ({
  setMainState,
  changeContext,
  handleOpenSnackbar,
}: FetchFunctionProps) => {
  const { data, success } = await apiMiddleware(changeContext, handleOpenSnackbar, shopConfigs);

  if (success) {
    setMainState({shopMinPoint: data.shopMinPoint})
  }
}



