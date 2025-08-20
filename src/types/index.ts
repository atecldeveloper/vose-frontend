export interface ISnackbarMessage {
  message: string;
  key: number;
  type: any;
}

export interface ISnackbar {
  snackbar: boolean;
  snackbarType: number;
  snackbarContent: ISnackbarMessage | undefined;
}

export type LocalCartCellProps = {
  productID: string,
  quantity: number
}

export interface languagePackage {
  [key: string]: string
}


//Utils

export type PaginationProps = {
  page: number,
  limit: number,
  order: string,
  orderBy: string,
  search?: string,
  startDate?: string,
  endDate?: string
}

export type FetchFunctionProps= {
  setMainState?: any,
  changeContext: any,
  handleOpenSnackbar: any,
}

export type AddressProps = {
  address1: string,
  address2?: string,
  postalCode: string,
  city: string,
  state: number,
  stateCode?: string,
  country: number
}
