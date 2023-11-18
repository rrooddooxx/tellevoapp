import { TypeAgreementStatus } from '../../providers/db-api/model/trips-agreement.model';

export interface ITripCardState {
  id?: string;
  passengers?: string[];
  stops?: string[];
  tripDate: string;
  tripTime: string;
  tripSeatsStatus: string;
  driverName?: string;
  driverLastName?: string;
  tripVehicleBrand?: string;
  tripVehicleModel?: string;
  tripVehicleID?: string;
  tripAgreementStatusForPassenger?: TypeAgreementStatus;
  pickupCoords?: string;
  pickupRef?: string;
  dropoffCoords?: string;
  dropoffRef?: string;
}

export enum ITripStatus {
  OPEN = 'Abierto',
  CLOSED = 'Lleno',
}

export interface IActionButton {
  text?: string;
  role?: string;
  data?: {
    action?: string;
  };
}

export interface ITripStatusField {
  name: string;
  color: string;
}

export interface ITripAgreementStatusField {
  name: string;
  color: string;
}
