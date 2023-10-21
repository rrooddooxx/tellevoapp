export interface ITripCardState {
  passengers: string[];
  stops: string[];
  tripDate: string;
  tripTime: string;
  tripSeatsStatus: ITripStatus;
}

export enum ITripStatus {
  OPEN = 'Abierto',
  CLOSED = 'Lleno',
}
