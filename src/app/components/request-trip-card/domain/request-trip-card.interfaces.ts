export interface IRequestTripCard {
  trip_agreement_id: number;
  trip_id: number;
  driver_id: number;
  trip_date: string;
  trip_time: string;
  dropoff_ref: string;
  dropoff_coords: string;
  student_id: number;
  student_name: string;
  student_lastname: string;
  student_career: string;
  student_gender: string;
  student_ranking: number;
}

export interface IPassengerGenderFormat {
  name: string;
}
