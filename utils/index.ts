import ReactHtmlParser from "react-html-parser";

export const setStateHelper = (callback: any) => (newState: any) => {
  callback((prevState: any) => ({
    ...prevState,
    ...newState,
  }));
};

export const getArrayObjByValue = (array: any, value: any, valueKey = 'value') => {
  if (!array || array.length == 0) return {label: '', value: '', color: ''};

  let result = array.filter((obj: { [x: string]: number; }) => {
    return obj[valueKey] == parseInt(value);
  })

  if (!result || result.length == 0) return {label: '', value: '', color: ''};

  return result[0];
};

export const getArrayObjByLabel = (array: any, label: any) => {
  if (!array || array.length == 0) return {label: '', value: '', color: ''};
  let result = array.filter((obj: { label: any; }) => {
    return obj.label == label
  })

  if (!result || result.length == 0) return {label: '', value: '', color: ''};

  return result[0];
};


export const plainTextWithoutHTML = (html: string) => {
  // return html.replace(/(<([^>]+)>)/gi, "");
  return ReactHtmlParser(html)
}

export const addressCombine = (addressObj: any) => {
  // return `${addressObj.address1}, \n</br>${addressObj.address2}, ${addressObj.postalCode + addressObj.city} ${addressObj.state}, ${addressObj.country}`;
  return addressObj.address1 + '\n' + `${addressObj.city} ${addressObj.state} `+ '\n' + addressObj.postalCode + '\n' +addressObj.country;
}

export const formatDateRange = (objDate: any) => {
  console.log(objDate)
  return `${objDate.year}-${objDate.month}`
}

export const handleDownloadImage = async (fileURL: any) => {
  const link = document.createElement("a");
  link.target = "_blank";
  link.href = fileURL.path;
  link.download = fileURL.name;
  link.click();
};

export const setPriceFormat = (price: number) => {
  return price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};
