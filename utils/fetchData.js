import axios from "axios";
import { variables } from "../src/config/variables";

const baseURL = variables.apiUrl;

const fetchData = async (payload, preventRedirect = false) => {
  let requestResult;
  try {
    requestResult = await axios({
      //mode: 'no-cors',
      crossDomain: true,
      withCredentials: true,
      baseURL,
      ...payload,
    });

    return { ...requestResult, success: true };
  } catch (err) {
    // console.error(err);
    if (err.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      // console.log("errResponse", err.response);
      if (err.response.status === 401 && !preventRedirect) {
        // redirect user to login page
        window.localStorage.removeItem(variables.local_storage_version);
        // localStorage.removeItem("userName");
        // localStorage.removeItem("userId");
        // const redirectURL = window.location.pathname + window.location.search;
        window.location.href = window.location.origin + "/login/?reason=SESSION_EXPIRED";
        await timeout(10000);
        return { ...err.response, success: false };
      }
      return { ...err.response, success: false };
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error", err.message);
      return { success: false, data: err.message };
    }
  }
};

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default fetchData;
