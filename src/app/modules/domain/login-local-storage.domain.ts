import { UserTypes } from '../../shared/domain/user-types.domain';

export type ILoginLocalStorage = {
  status: boolean;
  userType: UserTypes;
};
