import { UserTypes } from '../../shared/domain/user-types.domain';

export type LoginResponse = {
  status: boolean;
  userType?: UserTypes;
};
