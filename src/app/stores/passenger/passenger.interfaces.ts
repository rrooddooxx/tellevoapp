import { UserProfileDomain } from '../shared/domain/user-profile.domain';

export class IPassengerState {
  currentTripID?: string;
  userProfile?: UserProfileDomain;
  toggles?: {
    forceActiveTripsReload: boolean;
  };
  mapsState?: {
    tripBookingDropoff: string;
  };
}
