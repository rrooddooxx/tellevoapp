import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { supabaseHeaders } from '../api.config';
import { ApiConstants } from '../api.constants';
import { TripModel } from '../model/trips.model';

@Injectable()
export class TripsRepository {
  constructor(private readonly httpClient: HttpClient) {}

  private baseUrl: string = `${ApiConstants.BASE_URL}${ApiConstants.PATH_TRIPS}`;

  getTrips(): Observable<TripModel[]> {
    return this.httpClient.get<TripModel[]>(this.baseUrl, {
      headers: supabaseHeaders,
      responseType: 'json',
    });
  }
}
