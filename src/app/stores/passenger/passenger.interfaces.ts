import { UserProfileDomain } from '../shared/domain/user-profile.domain';

export interface IPassengerState {
  currentTripID: string;
  userProfile: UserProfileDomain;
  toggles: {
    forceActiveTripsReload: boolean;
  };
}
