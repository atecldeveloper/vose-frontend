import { SnackBarType } from "../constants";

export default function useCheckIsValidation(validateArr: any, handleOpenSnackbar: any) {
  let errMassage = "";
  try {
    validateArr.forEach((i: any) => {
      if (i) {
        errMassage = i;
        return;
      }
    });
  } catch (err) {
    return;
  }

  if (errMassage) {
    handleOpenSnackbar(errMassage, SnackBarType.Error);
    return false;
  } else {
    return true;
  }
}
