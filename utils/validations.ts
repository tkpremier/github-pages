const isValidEmail = (email = ''): boolean => {
  const regEx = /\S+@\S+\.\S+/;
  return regEx.test(email);
};

const validatePassword = (password = ''): boolean => {
  if (password.length <= 5 || password === '') {
    return false;
  }
  return true;
};

const isEmpty = (input: string): boolean => {
  if (input === undefined || input === '') {
    return true;
  }
  if (input.replace(/\s/g, '').length) {
    return false;
  }
  return true;
};

const empty = (input: string): boolean => input === undefined || input === '';

export { empty, isEmpty, isValidEmail, validatePassword };
