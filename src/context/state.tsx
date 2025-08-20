import * as React from "react";
import { createContext, useContext, useState } from "react";
import { ReactNode } from "react";
import { variables } from "../config/variables";
import { LocalCartCellProps } from "../types";
import { GetCartListAPIProps, handleGetCartListAPI } from "../controller/order";
import Loading from '../../components/Loading';


type Props = {
  children: ReactNode;
};

const localCart: Array<LocalCartCellProps> = [];

let defaultStatus = {
  openBackdrop: false,
  localCart: localCart,
  voucherCode: '',
  isUseCoin: true,
  isLogin: false,
  referralCode: '',
  account: {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    shopStatus: 0,
    isShop: false
  },
  _handleChange: (newState: any) => {},
  _handleCleanContext: () => {},
  _handleCleanCartContext: () => {}
};

if (typeof window !== "undefined") {
  // Client-side-only code
  try {
    const json = window.localStorage.getItem(variables.local_storage_version);
    if (json) {
      defaultStatus = JSON.parse(json);
    }
  } catch (error) {
    console.log("error get local storage");
  }
}


const AppContext = createContext(defaultStatus);
const useProps = () => useContext(AppContext);

function AppWrapper({ children }: Props) {
  const [utilsContextState, setUtilsContext] = useState(defaultStatus);

  const handleCleanCartContext = () => {
    handleUtilsContextChange({
      localCart: localCart,
      voucherID: 0,
      isUseCoin: false,
    });
  }

  const handleCleanContext = () => {
    handleUtilsContextChange({
      account: {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        shopStatus: 0,
        isShop: false
      },
      isLogin: false,
      _handleChange: (newState: any) => {},
      _handleCleanContext: () => {}
    });
  }

  const handleUtilsContextChange = (newState: any) => {
    setUtilsContext((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  if (typeof window !== "undefined") {
    // Client-side-only code
    window.localStorage.setItem(variables.local_storage_version, JSON.stringify(utilsContextState));
    //delete more than 1 local storage
    if (window.localStorage.length > 1) {
      const currentKey = variables.local_storage_version;
      for (var i = 0; i < window.localStorage.length; i++) {
        let key = window.localStorage.key(i);
        if (key !== currentKey && key !== null) {
          window.localStorage.removeItem(key);
        }
      }
    }
  }

  React.useEffect(() => {
    handleGetCartList();
  }, [utilsContextState.isLogin])

  const handleGetCartList = () => {
    if (utilsContextState.isLogin) {
      const params: GetCartListAPIProps = {
        changeContext: handleUtilsContextChange,
        handleOpenSnackbar: () => {},
      }
      handleGetCartListAPI(params);
    }
  }

  return (
    <AppContext.Provider
      value={{
        ...utilsContextState,
        _handleChange: handleUtilsContextChange,
        _handleCleanContext: handleCleanContext,
        _handleCleanCartContext: handleCleanCartContext
      }}
    >
      <Loading open={utilsContextState.openBackdrop} />
      {children}
    </AppContext.Provider>
  );
}

function useAppContext() {
  return useContext(AppContext);
}

export { AppWrapper, useAppContext, useProps };
