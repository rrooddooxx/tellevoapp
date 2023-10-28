interface IValidators {
  emailRegex: string;
}
export const validators: IValidators = {
  emailRegex: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}',
};
