// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isValidNumber = (value: any) => {
  if (!value || Array.isArray(value)) {
    return false;
  }

  if (value.toString().trim() === '') {
    return false;
  }

  return !isNaN(Number(value));
};
