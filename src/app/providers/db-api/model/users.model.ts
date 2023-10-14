export class UserModel {
  id: number;
  user_name: string;
  user_rut: string;
  user_pwd: string;
  user_email: string;
  user_phone: number;
  created_at: Date;
  user_lastname: string;
  user_gender: UsrGenders;
  user_type: number;
  user_ranking: number;
  user_careeer: number;
}

export enum UsrGenders {
  M = 'M',
  F = 'F',
  NB = 'NB',
  NI = 'NI',
}
