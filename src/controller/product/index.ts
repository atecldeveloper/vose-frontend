import { SnackBarType } from "../../constants";
import { FetchFunctionProps, LocalCartCellProps, PaginationProps } from "../../types";
import { apiMiddleware } from "../../../utils/middleware";
import {
  getAllProduct,
  getCheckoutDetails,
  GetCheckoutDetailsProps,
  getHighlightsProduct,
  getProductCategoriesList,
  getProductDetails,
  getProductList,
  getProductListById,
  GetProductListByIdProps,
  GetProductListProps,
  getRelativeProduct,
} from "../../services/product";
import { setPriceFormat } from "../../../utils";

export type GetProductListCheckoutDetailsAPIProps = {
  localProductList: Array<LocalCartCellProps>;
  voucherCode: any;
  useCoin: boolean;
} & FetchFunctionProps;

export const handleGetProductListCheckoutDetails = async ({
  localProductList,
  voucherCode,
  useCoin,
  setMainState,
  changeContext,
  handleOpenSnackbar,
}: GetProductListCheckoutDetailsAPIProps) => {
  if (!localProductList) return;
  localProductList.map((e: any) => {
    e.productID = parseInt(e.productID);
  });

  const body: GetProductListByIdProps = {
    productArr: localProductList,
    voucherCode: voucherCode,
    useCoin,
  };

  const { data, success } = await apiMiddleware(changeContext, handleOpenSnackbar, getProductListById, body);

  if (success && data.status !== 'error') {

    if (data.invalidVoucher) {
      handleOpenSnackbar('Invalid Voucher Code', SnackBarType.Error);
    }

    setMainState({
      dateList: data.product,
      subTotal: setPriceFormat(data.subTotal),
      total: setPriceFormat(data.total),
      voucher: data.voucher,
      voucherCode: data.voucher.ID ? voucherCode : '',
      coins: data.coins,
    })

    return data.product.length
  }
  else {
    setMainState({
      dateList: [],
      subTotal: '0',
      total: 0
    })
    return 1
  }
};

export type GetOrderCheckoutDetailsProps = {
  localProductList: Array<LocalCartCellProps>;
  voucherCode: string;
  useCoin: boolean;
  pickInShop: boolean;
  isRegisterMember: boolean;
  countryID: number;
  shipping: any;
} & FetchFunctionProps;

export const handleGetOrderCheckoutDetails = async ({
  localProductList,
  voucherCode,
  isRegisterMember,
  useCoin,
  pickInShop,
  countryID,
  shipping,
  setMainState,
  changeContext,
  handleOpenSnackbar,
}: GetOrderCheckoutDetailsProps) => {
  localProductList.map((e: any) => {
    e.productID = parseInt(e.productID);
  });
  const body: GetCheckoutDetailsProps = {
    productArr: localProductList,
    voucherCode,
    useCoin,
    pickInShop,
    joinMember: isRegisterMember,
    country: countryID,
    shipping,
  };
  const { data, success } = await apiMiddleware(changeContext, handleOpenSnackbar, getCheckoutDetails, body);
  if (success) {
    setMainState({
      dateList: data.product,
      subTotal: setPriceFormat(data.subTotal),
      total: setPriceFormat(data.total),
      shippingFee: setPriceFormat(data.totalShippingFee),
      validJoinMember: data.validJoinMember,
      registerFee: data.registerFee,
      memberMinPoint: data.memberMinPoint,
      pvPoint: data.totalPoint,
      coins: data.coins,
      voucher: data.voucher,
      isUseCoin: useCoin
    });
  }

  return data.country
};

export type GetProductCategoriesListAPIProps = FetchFunctionProps;

export const handleGetProductCategoriesAPI = async ({
  setMainState,
  changeContext,
  handleOpenSnackbar,
}: GetProductCategoriesListAPIProps) => {
  const { data, success } = await apiMiddleware(changeContext, handleOpenSnackbar, getProductCategoriesList);
  if (success) {
    let dataArr: any = [
      {
        label: "All",
        ID: 0,
      },
    ];
    data.map((e: any) => {
      const obj = {
        label: e.title,
        ID: e.id,
      };
      dataArr.push(obj);
    });

    setMainState(dataArr);
  }
};

export type GetProductListAPIProps = {
  categoryID: number;
  minPrice: number;
  maxPrice: number;
} & PaginationProps &
  FetchFunctionProps;

export const handleGetProductListAPI = async ({
  categoryID,
  minPrice,
  maxPrice,
  page,
  limit,
  order,
  orderBy,
  setMainState,
  changeContext,
  handleOpenSnackbar,
}: GetProductListAPIProps) => {
  const apiParams: GetProductListProps = {
    page,
    limit,
    order,
    orderBy,
    categoryID,
    minPrice,
    maxPrice,
  };
  const { data, success } = await apiMiddleware(changeContext, handleOpenSnackbar, getProductList, apiParams);

  if (success) {
    let dataArr: any = [];
    data.list.map((e: any) => {
      let image = null;
      if (e.images.length > 0) {
        image = e.images[0];
      }
      console.log(e)
      const obj = {
        ID: e.ID,
        path: image,
        productName: e.title,
        categoryArr: e.category.map((e: any) => e.Name),
        unit: "RM",
        price: e.price,
        discountPrice: e.discountPrice,
        pvPoint: e.pvPoint,
        stock: e.stock
      };

      dataArr.push(obj);
    });
    setMainState({ dataArr, total: data.total });
  }
  return success;
};

export type ProductDetailsProps = {
  id: any;
} & FetchFunctionProps;

export const handleGetProductDetailsAPI = async ({
  id,
  setMainState,
  changeContext,
  handleOpenSnackbar,
}: ProductDetailsProps) => {
  const { data, success } = await apiMiddleware(changeContext, handleOpenSnackbar, getProductDetails, id);

  if (success) {
    let obj = {
      ...data,
      category: data.category.map((e: any) => e.name),
    };
    setMainState(obj);
  }
};

export type RelativeProductProps = {
  id: any;
} & FetchFunctionProps;

export const handleGetRelativeProductAPI = async ({
  id,
  setMainState,
  changeContext,
  handleOpenSnackbar,
}: RelativeProductProps) => {
  const { data, success } = await apiMiddleware(changeContext, handleOpenSnackbar, getRelativeProduct, id);

  if (success) {
    data.map((e: any) => {
      e.category = e.category.map((e: any) => e.name);
    });
    setMainState(data);
  }
};



export type GetHighlightProductProps = FetchFunctionProps;

export const handleGetHighlightProductAPI = async ({
  setMainState,
  changeContext,
  handleOpenSnackbar,
}: GetHighlightProductProps) => {
  const { data, success } = await apiMiddleware(changeContext, handleOpenSnackbar, getHighlightsProduct);

  if (success) {
    let _images: any = [];
    data.map((e: any) => {
      _images.push(...e.images);
    })
    setMainState({ product: {...data[0]}, product2: {...data[1]}, images: _images})
  }
};


export type GetShopHighlightProductProps = FetchFunctionProps;

export const handleGetShopHighlightProductAPI = async ({
  setMainState,
  changeContext,
  handleOpenSnackbar,
}: GetShopHighlightProductProps) => {
  const { data, success } = await apiMiddleware(changeContext, handleOpenSnackbar, getHighlightsProduct);
  let length = 0;
  let total = 0;
  let pvPoint = 0;
  if (success) {
    data.map((e) => {
      e.photo = e.images
      e.quantity = 5
      e.pvPoint = e.pvPoint
      total += e.quantity * e.price
      pvPoint += e.pvPoint * e.quantity
    });
    length = data.length;


    setMainState({ productList: data, total, pvPoint})
  }

  return length
};

export const handleGetShopAllProductAPI = async ({
  setMainState,
  changeContext,
  handleOpenSnackbar,
}: GetShopHighlightProductProps) => {
  const { data, success } = await apiMiddleware(changeContext, handleOpenSnackbar, getAllProduct);
  let length = 0;
  let total = 0;
  let pvPoint = 0;
  if (success) {
    data.map((e) => {
      e.photo = e.images
      e.quantity = 0
      e.pvPoint = e.pvPoint
      total += e.quantity * e.price
      pvPoint += e.pvPoint * e.quantity
    });
    length = data.length;

    setMainState({ productList: data, total, pvPoint})
  }

  return length
};
