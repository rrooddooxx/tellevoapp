import { UserTypes } from '../../shared/domain/user-types.domain';

export interface INewUser {
  user_name: string;
  user_rut: string;
  user_pwd: string;
  user_email: string;
  user_phone: string;
  user_lastname: string;
  user_gender: string;
  user_type: UserTypes;
  user_career: number;
  user_ranking: number;
}
