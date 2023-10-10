import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { supabaseHeaders } from '../api.config';
import { ApiConstants } from '../api.constants';
import { TripAgreementModel } from '../model/trips-agreement.model';

@Injectable()
export class TripsAgreementRepository {
  constructor(private readonly httpClient: HttpClient) {}

  private baseUrl: string = `${ApiConstants.BASE_URL}${ApiConstants.PATH_TRIPS_AGREEMENT}`;

  getTripAgreements(): Observable<TripAgreementModel[]> {
    return this.httpClient.get<TripAgreementModel[]>(this.baseUrl, {
      headers: supabaseHeaders,
      responseType: 'json',
    });
  }
}
