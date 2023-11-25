import { Builder } from 'builder-pattern';
import { CreateTripRequest } from 'src/app/providers/db-api/domain/trips.domain';
import { IDriverState } from 'src/app/stores/driver/driver.interfaces';
import { CreateTripInput } from '../domain/create-trip-input.domain';
import { TripFinalStatus, TripStatus } from 'src/app/providers/db-api/model/trips.model';


export const mapNewTrip = (driverState: IDriverState, tripInput: CreateTripInput): CreateTripRequest => {
  return Builder<CreateTripRequest>()
    .driver_id(driverState.userProfile.user_id)
    .vehicle_id(1)
    .seats_offered(4)
    .pickup_ref(tripInput.pickup_ref)
    .pickup_coords(tripInput.pickup_coords)
    .dropoff_ref(tripInput.dropoff_ref)
    .dropoff_coords(tripInput.dropoff_coords)
    .trip_seats_status(TripStatus.OPEN)
    .trip_final_status(TripFinalStatus.NOT_COMPLETED)
    .trip_datetime(tripInput.trip_datetime)
    .build();
}