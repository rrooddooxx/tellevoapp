export interface UserModel {
  id: number;
  rut: string;
  email: string;
  name: string;
  last_name: string;
  user_type: UserType;
  user_enabled: boolean;
  phone: string;
  address: string;
  password: string;
}

export enum UserType {
  USER = 'user',
  ADMIN = 'admin',
}
