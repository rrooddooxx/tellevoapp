import { UserProfileDomain } from "../shared/domain/user-profile.domain";

export interface IDriverState {
  currentTripID: number;
  userProfile: UserProfileDomain;
  actionSheetTrigger?: "open-action-sheet-accept" | "open-action-sheet-reject";
  actionSheetHeader?: "¿Aceptar Viaje?" | "¿Rechazar Viaje?"
  mapsState?: {
    initTripBookingDropoff: string;
    endTripBookingDropoff: string;
  };
}
