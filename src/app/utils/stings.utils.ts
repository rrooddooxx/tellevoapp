export const toFirstUpper = (str: string): string => {
  return str
    .split(' ')
    .map((word) => word[0].concat(word.substr(1).toLowerCase()))
    .join(' ');
};

export const formatPhone = (str: string): string => {
  if (!str) return '';
  return `+${str.toString().substring(0, 2)} ${str.toString().substring(2)}`;
};
