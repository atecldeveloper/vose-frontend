import { SnackBarType } from "../../constants";
import { FetchFunctionProps, LocalCartCellProps, PaginationProps } from "../../types";
import { apiMiddleware } from "../../../utils/middleware";
import {
  addToCart,
  AddToCartProps,
  checkOrderByID, checkOrderByPaymentID,
  checkout,
  CheckoutProps,
  deleteCart,
  getCartList,
  getOrderList,
  getStockList,
  updateCart,
  UpdateCartProps,
} from "../../services/order";
import {
  checkPhoneStringLength,
  comparePassword,
  isEmpty,
  isEmptySelected,
  validEmail,
  validPassword,
  validUsername
} from "../../../utils/validation";
import useCheckIsValidation from "../../hooks/useCheckIsValidation";
import { getArrayObjByValue } from "../../../utils";
import moment from "moment";

export type AddToCartAPIProps = { productID: number; quantity: number } & FetchFunctionProps;

export const handleAddToCartAPI = async ({
  productID,
  quantity,
  setMainState,
  changeContext,
  handleOpenSnackbar,
}: AddToCartAPIProps) => {
  const body: AddToCartProps = {
    quantity,
  };

  const { data, success } = await apiMiddleware(
    changeContext,
    handleOpenSnackbar,
    addToCart,
    body,
    productID
  );
  if (success) {
    handleOpenSnackbar("Add Success", SnackBarType.Success);
  }
};

export type CheckoutAPIProps = { confirmPassword: string; isPickUpAtShop: boolean } & CheckoutProps &
  FetchFunctionProps;

export const handleCheckoutAPI = async ({
  username,
  icFirstName,
  icLastName,
  email,
  joinMember,
  confirmPassword,
  password,
  icNumber,
  pickInShop,
  phoneNumber,
  birthday,
  referralCode,
  // firstName,
  // lastName,
  // company,
  shopCode,
  adminCode,
  productArr,
  voucherID,
  coin,
  shipping,
  billingAddress,
  remarks,
  isPickUpAtShop,
  files,
  setMainState,
  changeContext,
  handleOpenSnackbar,
}: CheckoutAPIProps) => {
  const body: CheckoutProps = {
    username,
    icFirstName,
    icLastName,
    email,
    joinMember,
    password,
    icNumber,
    pickInShop,
    phoneNumber,
    birthday,
    referralCode: referralCode.trim(),
    // firstName,
    // lastName,
    // company,
    shopCode: shopCode.trim(),
    adminCode: adminCode.trim(),
    productArr,
    voucherID,
    coin,
    shipping,
    billingAddress,
    remarks,
    files,
  };
  const verifyMemberArr = [
    validUsername(username),
    validPassword(password),
    isEmpty(icFirstName, "IC First Number"),
    isEmpty(icLastName, "IC Last Number"),
    isEmpty(icNumber, "IC Number"),
    isEmpty(birthday, "Date Of Birth"),
    isEmpty(phoneNumber, "Member Phone No."),
    checkPhoneStringLength(phoneNumber, "Member Phone No."),
    comparePassword(password, confirmPassword),
    validEmail(email),
  ];
  const verifyReceiverArr = [
    isEmpty(shipping.shippingInfo.firstName, "Recipient First Name"),
    isEmpty(shipping.shippingInfo.lastName, "Recipient Last Name"),
    isEmpty(shipping.shippingInfo.email, "Recipient Email"),
    isEmpty(shipping.shippingInfo.phoneNumber, "Recipient Phone No."),
    checkPhoneStringLength(shipping.shippingInfo.phoneNumber, "Recipient Phone No."),
  ];
  const verifyShopArr = [isEmpty(shopCode, "Shop Code")];
  const verifyShippingArr = [
    isEmpty(shipping.shippingAddress.address1, "Shipping Address"),
    isEmpty(shipping.shippingAddress.city, "Shipping Address City"),
    isEmptySelected(shipping.shippingAddress.country, "Shipping Address Country"),
    isEmptySelected(shipping.shippingAddress.state, "Shipping Address State"),
    isEmpty(shipping.shippingAddress.postalCode, "Shipping Address Postal Code"),
  ];

  let isValidate: any = true;
  if (joinMember) {
    isValidate = useCheckIsValidation(verifyMemberArr.reverse(), handleOpenSnackbar);
    if (!isValidate) return { success: false };
  }


  isValidate = useCheckIsValidation(verifyReceiverArr.reverse(), handleOpenSnackbar);
  if (!isValidate) return { success: false };

  if (!isPickUpAtShop) {
    isValidate = useCheckIsValidation(verifyShippingArr.reverse(), handleOpenSnackbar);
    if (!isValidate) return { success: false };
  } else {
    isValidate = useCheckIsValidation(verifyShopArr.reverse(), handleOpenSnackbar);
    if (!isValidate) return { success: false };
  }


  // const body: CheckoutProps = {
  //   username,
  //   icFirstName,
  //   icLastName,
  //   email,
  //   joinMember,
  //   password,
  //   icNumber,
  //   pickInShop,
  //   phoneNumber,
  //   // birthday,
  //   referralCode: referralCode.trim(),
  //   // firstName,
  //   // lastName,
  //   // company,
  //   shopCode: shopCode.trim(),
  //   adminCode: adminCode.trim(),
  //   productArr,
  //   voucherID,
  //   coin,
  //   shipping,
  //   billingAddress,
  //   remarks,
  //   files,
  // };

  const formData = new FormData()
  formData.append("username", username);
  formData.append("icFirstName", icFirstName);
  formData.append("icLastName", icLastName);
  formData.append("email", email);
  formData.append("phoneNumber", phoneNumber);
  formData.append("birthday", moment(birthday, 'MM-DD-YYYY').format('YYYY-MM-DD'));
  // @ts-ignore
  formData.append("joinMember", joinMember ? 'true' : '');
  formData.append("password", password);
  formData.append("icNumber", icNumber);
  // @ts-ignore
  formData.append("pickInShop", pickInShop);
  formData.append("referralCode", referralCode.trim());
  formData.append("shopCode", shopCode.trim());
  formData.append("adminCode", adminCode.trim());
  formData.append("productArr", JSON.stringify(productArr));
  // @ts-ignore
  formData.append("voucherID", voucherID);
  // @ts-ignore
  formData.append("coin", coin);
  formData.append("remarks", remarks);
  formData.append("shipping", JSON.stringify(shipping));
  formData.append("billingAddress", JSON.stringify(billingAddress));

  if (files.length) {
    formData.append('file', files[0])
  }

  const { data, success } = await apiMiddleware(changeContext, handleOpenSnackbar, checkout, formData);
  if (success) {
    handleOpenSnackbar("Add Success", SnackBarType.Success);
    return { success, data };
  }
  else {
    return { success: false };
  }
};

export type CheckOrderDetailsByIdAPIProps = { orderID: string } & FetchFunctionProps;
export type CheckOrderDetailsByPaymentIdAPIProps = { paymentID: string, orderID: string } & FetchFunctionProps;

export const handleCheckOrderDetailsByIdAPI = async ({
  orderID,
  setMainState,
  changeContext,
  handleOpenSnackbar,
}: CheckOrderDetailsByIdAPIProps) => {
  const { data, success } = await apiMiddleware(changeContext, handleOpenSnackbar, checkOrderByID, orderID);
  if (success) {
    if (data) {
      setMainState({
        productList: data.product,
        subTotal: data.subTotal,
        shippingFee: data.shippingFee,
        total: data.totalAmount,
        orderStatus: data.orderStatus,
        createDate: data.createdAt,
        voucher: data.voucher,
        coinValue: data.coinValue,
        receiveCoin: data.coinReceive,
        receivePVPoint: data.totalPoint,
        registerFee: data.registerFee,
        remarks: data.remarks,
        shipping: data.address.shipping,
        courier: data.courier,
        trackingID: data.trackingID,
        billingAddress: data.address.billingAddress
      });
    }
  }
};

export const handleCheckOrderDetailsByPaymentIdAPI = async ({
  paymentID,
  orderID,
  setMainState,
  changeContext,
  handleOpenSnackbar,
}: CheckOrderDetailsByPaymentIdAPIProps) => {
  const API = orderID ? checkOrderByID : checkOrderByPaymentID;
  const params = orderID ? orderID : paymentID;
  const { data, success } = await apiMiddleware(changeContext, handleOpenSnackbar, API, params);


  if (success) {
    if (data) {
      setMainState({
        id: data.ID,
        productList: data.product,
        subTotal: data.subTotal,
        shippingFee: data.shippingFee,
        total: data.totalAmount,
        orderStatus: data.orderStatus,
        createDate: data.createdAt,
        voucher: data.voucher,
        coinValue: data.coinValue,
        isMemberFee: data.isMemberFee,
        registerFee: data.registerFee,
        remarks: data.remarks,
        shipping: data.address.shipping,
        billingAddress: data.address.billingAddress
      });
    }
  }
};

export type GetOrderListAPIProps = PaginationProps & FetchFunctionProps;

export const handleGetOrderListAPI = async ({
  page,
  limit,
  order,
  orderBy,
  setMainState,
  changeContext,
  handleOpenSnackbar,
}: GetOrderListAPIProps) => {
  const apiParams = {
    page,
    limit,
    order,
    orderBy,
  };
  const { data, success } = await apiMiddleware(changeContext, handleOpenSnackbar, getOrderList, apiParams);
  if (success) {
    setMainState({ list: data.list, total: data.total });
  }
  return success;
};

export type GetStockListAPIProps = PaginationProps & FetchFunctionProps;
export const handleGetStockListAPI = async ({
  page,
  limit,
  order,
  orderBy,
  setMainState,
  changeContext,
  handleOpenSnackbar,
}: GetStockListAPIProps) => {
  const apiParams = {
    page,
    limit,
    order,
    orderBy,
  };
  const { data, success } = await apiMiddleware(changeContext, handleOpenSnackbar, getStockList, apiParams);

  if (success) {
    setMainState({ list: data.list, total: data.total });
  }
}


export type GetCartListAPIProps = FetchFunctionProps;
export const handleGetCartListAPI = async ({
  changeContext,
  handleOpenSnackbar,
}: GetCartListAPIProps) => {

  const { data, success } = await apiMiddleware(changeContext, handleOpenSnackbar, getCartList);
  if (success) {
    let localArr: Array<LocalCartCellProps> = [];
    data.map((e: any) => {
      const localCartObj: LocalCartCellProps = {
        productID: JSON.stringify(e.ID),
        quantity: e.quantity
      }
      localArr.push(localCartObj);
    })

    changeContext({ localCart: localArr });
  }
}


export type AddCartProps = {
  isLogin: boolean,
  localCart: Array<LocalCartCellProps>,
  id: number,
  productUnit?: number,
  onCartPage?: boolean,
  stock: number,
} & FetchFunctionProps;

export const handleAddCart = async ({
  isLogin,
  localCart,
  id,
  productUnit = 1,
  onCartPage = false,
  stock,
  changeContext,
  handleOpenSnackbar,
}: AddCartProps) => {
  const _localCart = [...localCart]
  const obj = getArrayObjByValue(_localCart, id, 'productID');
  let quantity = productUnit;
  console.log('in', obj)

  if (onCartPage) {
    if (quantity > stock) {
      handleOpenSnackbar('No enough stock', SnackBarType.Error);
      return obj.quantity
    }

    obj.quantity = productUnit;
    changeContext({ localCart: _localCart })
  }
  else {
    if (!obj || obj.value == '') {
      const localCartObj: LocalCartCellProps = {
        productID: JSON.stringify(id),
        quantity: productUnit ? productUnit : 1
      }
      if (quantity > stock) {
        handleOpenSnackbar('No enough stock', SnackBarType.Error);
        return stock
      }
      _localCart.push(localCartObj);
      changeContext({ localCart: _localCart })
    }
    else {
      quantity = obj.quantity + productUnit;
      if (quantity > stock) {
        handleOpenSnackbar('No enough stock', SnackBarType.Error);
        return stock - obj.quantity
      }
      obj.quantity = obj.quantity + productUnit;
      changeContext({ localCart: _localCart })
    }
  }


  if (isLogin) {

    const _arr = _localCart.map((e: any) => {
      return {
        ID: e.productID,
        quantity: e.quantity
      }
    })
    const body: UpdateCartProps = {
      items: _arr,
    };

    const { data, success } = await apiMiddleware(
      changeContext,
      handleOpenSnackbar,
      updateCart,
      body,
    );
    if (success) {
      handleOpenSnackbar("Add Success", SnackBarType.Success);
    }
  }
  else {
    handleOpenSnackbar('Add Success', SnackBarType.Success);
  }
}



export type DeleteCartProps = { isLogin: boolean, localCart: Array<LocalCartCellProps>, id: string } & FetchFunctionProps;
export const handleDeleteCart = async ({
  isLogin,
  localCart,
  id,
  changeContext,
  handleOpenSnackbar,
}: DeleteCartProps) => {
  const _localCart = [...localCart]
  const indexToRemove = _localCart.findIndex(e => e.productID == id);
  const numberToRemove = 1;
  _localCart.splice(indexToRemove, numberToRemove);
  console.log(_localCart);
  changeContext({ localCart: _localCart });

  if (isLogin) {
    const { data, success } = await apiMiddleware(
      changeContext,
      handleOpenSnackbar,
      deleteCart,
      id
    );
    if (success) {
      handleOpenSnackbar("Delete Success", SnackBarType.Success);
    }
  }
  else {
    handleOpenSnackbar('Delete Success', SnackBarType.Success);
  }
}
