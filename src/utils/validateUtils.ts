export const validateEmail = (email: string): boolean => {
  let result = false;
  // use regexp /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  const mailformat = new RegExp(
    '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$',
  );

  if (email.match(mailformat)) {
    result = true;
  }

  return result;
};
