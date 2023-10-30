import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiDatabaseConfig } from '../api.config';
import { TripRequest } from '../domain/trips-agreements.domain';
import {
  TripAgreementModel,
  TypeAgreementStatus,
} from '../model/trips-agreement.model';
import { TakenTripModel } from '../model/trips.model';
import { ApiConstants } from './../api.constants';

@Injectable()
export class TripsAgreementRepository {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly config: ApiDatabaseConfig
  ) {}

  private baseUrl: string = `${this.config.getBaseUrl()}${
    ApiConstants.PATH_TRIPS_AGREEMENT
  }`;
  private bookingAgreementResult: boolean = false;

  getTripAgreements(): Observable<TripAgreementModel[]> {
    return this.httpClient.get<TripAgreementModel[]>(
      this.baseUrl,
      this.config.getHeadersBody()
    );
  }

  getWaitingTripsByStudentID(studentId: string): Observable<TakenTripModel[]> {
    return this.httpClient.get<TakenTripModel[]>(
      `${
        this.baseUrl
      }?student_id=eq.${studentId.toString()}&trip_agreement_status=eq.${TypeAgreementStatus.WAITING_FOR_APPROVAL.toString()}`,
      this.config.getHeadersBody()
    );
  }

  getRejectedTripsByStudentID(studentId: string): Observable<TakenTripModel[]> {
    return this.httpClient.get<TakenTripModel[]>(
      `${
        this.baseUrl
      }?student_id=eq.${studentId.toString()}&trip_agreement_status=eq.${TypeAgreementStatus.REJECTED.toString()}`,
      this.config.getHeadersBody()
    );
  }

  getAcceptedTripsByStudentID(studentId: string): Observable<TakenTripModel[]> {
    return this.httpClient.get<TakenTripModel[]>(
      `${
        this.baseUrl
      }?student_id=eq.${studentId.toString()}&trip_agreement_status=eq.${TypeAgreementStatus.ACCEPTED.toString()}`,
      this.config.getHeadersBody()
    );
  }

  makeAgreement(tripID: string, userID: string): Observable<HttpResponse<any>> {
    return this.httpClient.post<any>(
      `${this.baseUrl}?trip_id=eq.${tripID}`,
      {
        trip_id: tripID,
        student_id: userID,
        dropoff_ref: 'prueba',
        dropoff_coords: '',
      },
      {
        headers: ApiDatabaseConfig.supabaseHeaders,
        observe: 'response',
        responseType: 'json',
      }
    );
  }

  getActiveRequestsByDriverId(driverId: number): Observable<TripRequest[]> {
    return this.httpClient.get<TripRequest[]>(
      `${this.config.getBaseUrl()}${
        ApiConstants.PATH_RPC_ACTIVE_AGREEMENTS
      }?driver_id=eq.${driverId}`,
      this.config.getHeadersBody()
    );
  }

  acceptTripRequest(tripId: number): Observable<HttpResponse<any>> {
    return this.httpClient.patch<any>(
      `${this.baseUrl}?trip_id=eq.${tripId}`,
      {
        trip_agreement_status: TypeAgreementStatus.ACCEPTED.toString(),
      },
      {
        headers: ApiDatabaseConfig.supabaseHeaders,
        observe: 'response',
        responseType: 'json',
      }
    );
  }

  rejectTripRequest(tripId: number): Observable<HttpResponse<any>> {
    return this.httpClient.patch<any>(
      `${this.baseUrl}?trip_id=eq.${tripId}`,
      {
        trip_agreement_status: TypeAgreementStatus.REJECTED.toString(),
      },
      {
        headers: ApiDatabaseConfig.supabaseHeaders,
        observe: 'response',
        responseType: 'json',
      }
    );
  }
}
