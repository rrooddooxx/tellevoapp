export interface CreateTripRequest {
  driver_id: number;
  vehicle_id: number;
  seats_offered: number;
  pickup_ref: string;
  pickup_coords: string;
  dropoff_ref: string;
  dropoff_coords: string;
  trip_seats_status: string;
  trip_final_status: string;
  trip_datetime: string;  
}
