import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TripsRepositoryConfig } from '../config/trips.config';
import { UserTripInfoRPCModel } from '../model/active-trips.model';
import { TripModel } from '../model/trips.model';

@Injectable()
export class TripsRepository {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly repositoryConfig: TripsRepositoryConfig
  ) {}

  getTrips(): Observable<TripModel[]> {
    return this.httpClient.get<TripModel[]>(
      this.repositoryConfig.getTripsUrl(),
      this.repositoryConfig.getHeaders()
    );
  }

  getActiveTripsRPC(): Observable<UserTripInfoRPCModel[]> {
    return this.httpClient.get<UserTripInfoRPCModel[]>(
      this.repositoryConfig.getActiveTripsRPCUrl(),
      this.repositoryConfig.getHeaders()
    );
  }
}
