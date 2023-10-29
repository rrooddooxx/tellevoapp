import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiDatabaseConfig } from '../api.config';
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

  private baseUrl: string = `${ApiConstants.BASE_URL}${ApiConstants.PATH_TRIPS_AGREEMENT}`;

  getTripAgreements(): Observable<TripAgreementModel[]> {
    return this.httpClient.get<TripAgreementModel[]>(
      this.baseUrl,
      this.config.getHeadersBody()
    );
  }

  getTripsTakenByStudentID(studentId: number): Observable<TakenTripModel> {
    return this.httpClient.get<TakenTripModel>(
      `${this.config.getBaseUrl()}?student_id=$eq.${studentId.toString()}$trip_agreement_status=eq.${TypeAgreementStatus.ACCEPTED.toString()}`,
      this.config.getHeadersBody()
    );
  }
}
