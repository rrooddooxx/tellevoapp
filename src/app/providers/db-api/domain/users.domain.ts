import { UsrGenders } from '../model/users.model';

export interface AddUserRequest {
  user_name: string;
  user_rut: string;
  user_pwd: string;
  user_email: string;
  user_phone: number;
  user_lastname: string;
  user_gender: UsrGenders;
  user_type: number;
  user_career: number;
  user_ranking: number;
}

export interface EditUserRequest {
  id: number;
  user_name: string;
  rut?: string;
  user_pwd: string;
  user_email: string;
  user_phone?: string;
}
