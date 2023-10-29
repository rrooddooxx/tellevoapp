export interface ITripCardState {
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
}

export enum ITripStatus {
  OPEN = 'Abierto',
  CLOSED = 'Lleno',
}
