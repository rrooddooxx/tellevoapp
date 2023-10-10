export interface AddUserRequest {
  user_name: string;
  rut: string;
  user_pwd: string;
  user_email: string;
  user_phone: string;
}

export interface EditUserRequest {
  id: number;
  user_name: string;
  rut?: string;
  user_pwd: string;
  user_email: string;
  user_phone?: string;
}
