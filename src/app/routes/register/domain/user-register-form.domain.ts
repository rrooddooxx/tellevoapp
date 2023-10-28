export interface UserRegisterForm {
  user_name: string;
  user_phone: number;
  user_pwd: string;
  user_email: string;
  rut: string;
}

export enum UserTypeRegistration {
  DRIVER = 'DRIVER',
  STUDENT = 'STUDENT',
}
