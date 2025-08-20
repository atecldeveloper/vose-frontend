import { apiMiddleware } from "../../../utils/middleware";
import { getClaimDetails, getClaimList } from "../../services/claim";
import { FetchFunctionProps, PaginationProps } from "../../types";

export type GetClaimListAPIProps = PaginationProps & FetchFunctionProps;

export const handleGetClaimListAPI = async ({
  page,
  limit,
  order,
  orderBy,
  startDate,
  endDate,
  setMainState,
  changeContext,
  handleOpenSnackbar,
}: GetClaimListAPIProps) => {
  const apiParams = {
    page,
    limit,
    order,
    orderBy,
    startDate,
    endDate,
  };
  console.log(apiParams);
  const { data, success } = await apiMiddleware(changeContext, handleOpenSnackbar, getClaimList, apiParams);
  if (success) {
    setMainState({ list: data.list, total: data.total, upgradeDirect: data.upgradeDirect });
  }

  return success;
};

export type GetClaimDetailsAPIProps = { t: any, ID: number } & FetchFunctionProps;

export const handleGetClaimDetailsAPI = async ({
  t,
  ID,
  setMainState,
  changeContext,
  handleOpenSnackbar,
}: GetClaimDetailsAPIProps) => {
  const { data, success } = await apiMiddleware(changeContext, handleOpenSnackbar, getClaimDetails, ID);
  if (success) {
    console.log(data);
    const { commissionDetails, rateDetails } = data;
    let list: any = [];
    list.push({ id: t('FL'), ...commissionDetails.firstLayer });
    list.push({ id: t('SL'), ...commissionDetails.secondLayer });
    list.push({ id: t('SHOP_CLAIM'), ...commissionDetails.shopLayer });

    let listRate: any = [];
    listRate.push({ id: t('FL'), ...rateDetails.firstLayer });
    listRate.push({ id: t('SL'), ...rateDetails.secondLayer });
    listRate.push({ id: t('SHOP_CLAIM'), ...rateDetails.shopLayer });

    setMainState({
      list: list,
      rateList: listRate,
      totalCommission: commissionDetails.totalCommission,
      downlineTarget: commissionDetails.downlineTarget,
      downlineTargetHit: commissionDetails.downlineTargetHit,
      targetPV: rateDetails.firstLayer.targetPV,
      fTargetPv: commissionDetails.firstLayer.point
    });
  }
  return success;
};
