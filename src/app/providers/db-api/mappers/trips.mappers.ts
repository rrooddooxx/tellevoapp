import { Injectable } from '@angular/core';
import { Builder } from 'builder-pattern';
import { DateTime } from 'luxon';
import { ITripCardState } from '../../../components/trip-card/trip-card.interfaces';
import { UserTripInfoRPCModel } from '../model/active-trips.model';

@Injectable({ providedIn: 'root' })
export class TripMappers {
  private mapEachActiveTripToDomain(
    trip: UserTripInfoRPCModel
  ): ITripCardState {
    return Builder<ITripCardState>()
      .passengers(trip.passengers)
      .stops(trip.stops)
      .tripDate(DateTime.fromISO(trip.created_at).toFormat('dd/MM/yyyy'))
      .tripSeatsStatus(trip.trip_seats_status.toString())
      .tripTime(DateTime.fromISO(trip.created_at).toFormat('HH:mm'))
      .driverName(trip.user_name)
      .driverLastName(trip.user_lastname)
      .tripVehicleBrand(trip.vehicle_brand)
      .tripVehicleModel(trip.vehicle_model)
      .tripVehicleID(trip.vehicle_patent)
      .build();
  }
  public mapActiveTripsToDomain(
    trips: UserTripInfoRPCModel[]
  ): ITripCardState[] {
    return trips.map((trip) => this.mapEachActiveTripToDomain(trip));
  }
}
