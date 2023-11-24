import { HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { BookAgreementStatus } from '../../shared/domain/book-agreement-status.domain';
import { TripsAgreementRepository } from './../../providers/db-api/repositories/trips-agreement.repository';
import { IRequestTripStatus } from './domain/book-trip.domain';

@Injectable({
  providedIn: 'root',
})
export class BookTripService {
  constructor(
    private readonly tripsAgreementRepository: TripsAgreementRepository
  ) {}

  async makeTripBooking(
    tripID: string,
    userID: string,
    dropOffCoords: string
  ): Promise<BookAgreementStatus> {
    try {
      const isBooked = this.tripsAgreementRepository.makeAgreement(
        tripID,
        userID,
        dropOffCoords
      );
      const booked = await lastValueFrom(isBooked);
      if (
        booked.status === HttpStatusCode.Created &&
        booked.statusText === 'OK'
      ) {
        console.log('Trip booked successfully');
        return Promise.resolve(BookAgreementStatus.BOOKED);
      }
      return Promise.resolve(BookAgreementStatus.FAILED);
    } catch (error) {
      if (error.status === HttpStatusCode.Conflict) {
        return Promise.resolve(BookAgreementStatus.ALREADY_BOOKED);
      } else return Promise.resolve(BookAgreementStatus.FAILED);
    }
  }

  async acceptTripBooking(tripId: number): Promise<IRequestTripStatus> {
    try {
      const tripRequestStatus = await lastValueFrom(
        this.tripsAgreementRepository.acceptTripRequest(tripId)
      );

      const dictionary = {
        [HttpStatusCode.NoContent]: {
          response: IRequestTripStatus.OK_ACCEPTED,
        },
        [HttpStatusCode.BadRequest]: {
          response: IRequestTripStatus.FAIL_ACCEPTED,
        },
      };

      return (
        dictionary[tripRequestStatus.status].response ||
        dictionary[HttpStatusCode.BadRequest].response
      );
    } catch (error) {
      return Promise.resolve(IRequestTripStatus.FAIL_ACCEPTED);
    }
  }

  async rejectTripBooking(tripId: number): Promise<IRequestTripStatus> {
    try {
      const tripRequestStatus = await lastValueFrom(
        this.tripsAgreementRepository.rejectTripRequest(tripId)
      );

      const dictionary = {
        [HttpStatusCode.NoContent]: {
          response: IRequestTripStatus.OK_REJECTED,
        },
        [HttpStatusCode.BadRequest]: {
          response: IRequestTripStatus.FAIL_REJECTED,
        },
      };

      return (
        dictionary[tripRequestStatus.status].response ||
        dictionary[HttpStatusCode.BadRequest].response
      );
    } catch (error) {
      return Promise.resolve(IRequestTripStatus.FAIL_REJECTED);
    }
  }
}
