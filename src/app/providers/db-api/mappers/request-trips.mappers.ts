import { Injectable } from '@angular/core';
import { Builder } from 'builder-pattern';
import { DateTime } from 'luxon';
import { ITripCardState } from '../../../components/trip-card/trip-card.interfaces';
import { TripRequest } from '../domain/trips-agreements.domain';
import { IRequestTripCard } from 'src/app/components/request-trip-card/domain/request-trip-card.interfaces';

@Injectable({ providedIn: 'root' })
export class RequestTripMappers {
  private mapRequestTripToDomain(request: TripRequest): IRequestTripCard {
    return Builder<IRequestTripCard>()
      .trip_agreement_id(request.trip_agreement_id)
      .trip_id(request.trip_id)
      .driver_id(request.driver_id)
      .trip_date(DateTime.fromISO(request.trip_datetime).toFormat('dd/MM/yyyy'))
      .trip_time(DateTime.fromISO(request.trip_datetime).toFormat('HH:mm'))
      .dropoff_ref(request.dropoff_ref)
      .dropoff_coords(request.dropoff_coords)
      .student_id(request.student_id)
      .student_name(request.student_name)
      .student_lastname(request.student_lastname)
      .student_career(request.student_career)
      .student_gender(request.student_gender)
      .student_ranking(request.student_ranking)
      .build();
  }

  public mapActiveRequestTripsToDomain(
    requests: TripRequest[]
  ): IRequestTripCard[] {
    return requests.map((request) => this.mapRequestTripToDomain(request));
  }
}
