export const validUsername = (username: string) => {
  let errMessage;

  if (!username || username === '') {
    errMessage = 'Username cannot be blank.'
    return errMessage;
  }

  if (username.length < 3) {
    errMessage = 'Username must be at least 3 characters.'
  }

  if (username.search(/(?!.* )/)) {
    errMessage = 'Username cannot include spaces.'
  }

  return errMessage
}

export const validPassword = (password: string) => {
  let errMessage;
  // ^(?!.* )(?=.*\d)(?=.*[A-Z]).{6,15}$

  if (!password || password === '') {
    errMessage = 'Password cannot be empty.'
    return errMessage;
  }

  if (password.length < 3) {
    errMessage = 'Password must be at least 6 characters.'
  }

  if (password.search(/(?!.* )/)) {
    errMessage = 'Password cannot include spaces.'
  }
  // const re = /^(?!.* )(?=.*\d).{6,15}$/
  // if (!re.test(String(password))) {
  //   errMessage = `Wrong ${label} format.`;
  // }
  return errMessage;
}

export const validEmail = (email: string) => {
  let errMessage;
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!re.test(String(email))) {
    errMessage = 'Wrong email format.';
  }
  return errMessage;
};

export const checkPhoneStringLength = (string: string, label='field') => {
  let errMessage;
  if (!string || string.length < 7 || string.length > 11) {
    errMessage = label + " wrong format.";
  }

  return errMessage;
};

export const isEmpty = (string: string, label='field') => {
  let errMessage;

  if (!string || string === '') {
    errMessage = label + " can't be blank.";
  }
  return errMessage;
};

export const isEmptyNumber = (number: any, label='field') => {
  let errMessage;

  if (parseFloat(number) === 0 || isNaN(number)) {
    errMessage = label + " can't be blank.";
  }
  return errMessage;
};

export const isEmptySelected = (number: number | string, label='selections') => {
  let errMessage;

  if (number === 0 || number === '-') {
    errMessage = " Please choose a " + label;
  }
  return errMessage;
};

export const isArrayEmpty= (arr: Array<string>, label='selections') => {
  let errMessage;

  if ((!Array.isArray(arr) || arr.length === 0)) {
    errMessage = label +  " can't be blank." ;
  }
  return errMessage;
}

export const comparePassword = (password: string, confirmPassword: string, isSame = false ) => {
  let errMessage;
  if (!password || password === '' || password.length === 0) {
    errMessage = "Password can't be blank.";
  }

  if (!confirmPassword || confirmPassword === ''|| password.length === 0) {
    errMessage = "Confirm Password can't be blank.";
  }

  if (isSame) {
    if (password === confirmPassword ) {
      errMessage = "Your new password can not be the same as current password.";
    }
  }
  else {
    if (password !== confirmPassword ) {
      errMessage = "Password and Confirm Password are different.";
    }
  }

  return errMessage
}
