export interface TripRequest {
  trip_agreement_id: number;
  trip_id: number;
  driver_id: number;
  trip_datetime: string;
  dropoff_ref: string;
  dropoff_coords: string;
  student_id: number;
  student_name: string;
  student_lastname: string;
  student_gender: string;
  student_ranking: number;
  student_career: string;
}
