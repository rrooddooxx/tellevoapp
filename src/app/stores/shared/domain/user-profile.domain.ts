import { UserTypes } from '../../../shared/domain/user-types.domain';

export class UserProfileDomain {
  user_id: number;
  user_name: string;
  user_lastname: string;
  user_email: string;
  user_phone: number;
  user_gender: 'M' | 'F' | 'NB' | 'NI';
  type_name: UserTypes;
  user_type_id: number;
  user_ranking: number;
  career_name: string;
  user_career_id: number;
}
