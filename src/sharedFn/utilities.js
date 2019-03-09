export const updateObj = (oldObj, UpdatedProps) => {
  return {
    ...oldObj,
    ...UpdatedProps
  }
}

export const checkValidity = (input, rules) => {
  let isValid = true;

  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = input.trim() !== "" && isValid;
  }

  if (rules.length) {
    isValid =
      input.length >= rules.length.minLength &&
      input.length <= rules.length.maxLength &&
      isValid;
  }

  if (rules.pattern) {
    const pat = new RegExp(rules.pattern);
    isValid = pat.test(input) && isValid;
  }

  return isValid;
};