import { UserProfileDomain } from '../shared/domain/user-profile.domain';

export interface IDriverState {
  driverName: string;
  userProfile: UserProfileDomain;
  //...agregar aquí la forma de tu state.
}
