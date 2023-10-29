import { UserProfileDomain } from "../shared/domain/user-profile.domain";

export interface IDriverState {
  currentTripID: number;
  userProfile: UserProfileDomain;
}
