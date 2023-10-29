import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiDatabaseConfig } from '../api.config';
import { ApiConstants } from '../api.constants';
import { VehicleModel } from '../model/vehicle.model';

@Injectable()
export class VehicleRepository {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly config: ApiDatabaseConfig
  ) {}

  private baseUrl: string = `${ApiConstants.BASE_URL}${ApiConstants.PATH_VEHICLE}`;

  getUserTypes(): Observable<VehicleModel[]> {
    return this.httpClient.get<VehicleModel[]>(
      this.baseUrl,
      this.config.getHeadersBody()
    );
  }
}
