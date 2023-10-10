export class TripAgreementModel {
  id: number;
  trip_id: number;
  student_id: number;
  dropoff_ref: string;
  dropoff_coords: string;
  trip_agreement_status: TypeAgreementStatus;
}

enum TypeAgreementStatus {
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  WAITING_FOR_APPROVAL = 'WAITING_FOR_APPROVAL',
}
