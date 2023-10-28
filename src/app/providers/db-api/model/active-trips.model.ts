import { TripFinalStatus, TripStatus } from './trips.model';

export interface UserTripInfoRPCModel {
  user_name: string;
  user_lastname: string;
  user_gender: 'M' | 'F' | 'Other';
  user_ranking: number;
  user_id: number;
  vehicle_brand: string;
  vehicle_model: string;
  vehicle_patent: string;
  vehicle_seats: number;
  seats_offered: number;
  trip_seats_status: TripStatus;
  trip_final_status: TripFinalStatus;
  created_at: string;
  trip_id: number;
  driver_career: string;
  passengers: string[];
  stops: string[];
}
