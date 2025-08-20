import { SnackBarType } from "../src/constants";

export const apiMiddleware = async (
  changeContext: any,
  handleOpenSnackbar: any,
  callbackFunctions: any,
  data: any = undefined,
  data2: any  = undefined,
  data3: any  = undefined
) => {
  const contextParams = {
    snackbar: true,
    snackbarType: 1,
    snackbarContent: "",
  };

  changeContext({ openBackdrop: true });
  try {
    const result = await callbackFunctions(data, data2, data3);
    if (!result) {
      contextParams.snackbarContent = result.data.message;
      handleOpenSnackbar(result.data.message, SnackBarType.Error);
      // changeContext(contextParams);
    }
    if (result && (result.success === false || result.status === (400 || 401 || 403))) {
      contextParams.snackbarContent = result.data.message;
      handleOpenSnackbar(result.data.message, SnackBarType.Error);
      // changeContext(contextParams);
    }

    changeContext({ openBackdrop: false });
    return result;
  } catch (error) {
    handleOpenSnackbar(error, SnackBarType.Error);
    changeContext({ ...contextParams, openBackdrop: false });
  }
};
