interface IValidators {
  emailRegex: string;
}
export const validators: IValidators = {
  emailRegex: `\^[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}(\.[a-z]{2})?$`
}
