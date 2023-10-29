import { UserTypes } from '../../../shared/domain/user-types.domain';

export interface IUserSessionStorage {
  userType: UserTypes;
  userID: number;
}
