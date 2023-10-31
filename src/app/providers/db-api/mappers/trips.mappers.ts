import { Injectable } from '@angular/core';
import { Builder } from 'builder-pattern';
import { DateTime } from 'luxon';
import { ITripCardState } from '../../../components/trip-card/trip-card.interfaces';
import { IAcceptedTrips } from '../../../routes/passenger/trips/domain/trip-lists.domain';
import { UserTripInfoRPCModel } from '../model/active-trips.model';
import {
  TripAgreementModel,
  TypeAgreementStatus,
} from '../model/trips-agreement.model';
import { TakenTripModel } from '../model/trips.model';

@Injectable({ providedIn: 'root' })
export class TripMappers {
  private mapEachActiveTripToDomain(
    trip: UserTripInfoRPCModel
  ): ITripCardState {
    return Builder<ITripCardState>()
      .id(trip.trip_id.toString())
      .passengers(trip.passengers)
      .stops(trip.stops)
      .tripDate(DateTime.fromISO(trip.trip_datetime).toFormat('dd/MM/yyyy'))
      .tripSeatsStatus(trip.trip_seats_status.toString())
      .tripTime(DateTime.fromISO(trip.trip_datetime).toFormat('HH:mm'))
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

  public mapTripAgreementStatusToTripList(
    tripLists: ITripCardState[],
    tripAgreements: TripAgreementModel[],
    userID: string
  ) {
    return tripLists.map((trip) => {
      trip.tripAgreementStatusForPassenger = TypeAgreementStatus.NOT_BOOKED;
      if (
        tripAgreements.find(
          (ta) =>
            ta.trip_id === Number(trip.id) && ta.student_id === Number(userID)
        )
      ) {
        trip.tripAgreementStatusForPassenger = tripAgreements.find(
          (ta) =>
            ta.trip_id === Number(trip.id) && ta.student_id === Number(userID)
        ).trip_agreement_status;
      }
      return trip;
    });
  }

  private mapEachAcceptedTripToDomain(
    tripAgreement: TakenTripModel
  ): IAcceptedTrips {
    return Builder<IAcceptedTrips>()
      .tripID(tripAgreement.trip_id)
      .tripAgreementID(tripAgreement.id)
      .build();
  }

  mapTripsToIDList(tripAgreements: TakenTripModel[]) {
    return tripAgreements.reduce<number[]>((acc, agreement) => {
      acc.push(agreement.trip_id);
      return acc;
    }, []);
  }
}
