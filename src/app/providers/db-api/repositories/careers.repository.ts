import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { supabaseHeaders } from '../api.config';
import { ApiConstants } from '../api.constants';
import { CareerModel } from '../model/career.model';

@Injectable()
export class CareerRepository {
  constructor(private readonly httpClient: HttpClient) {}

  private baseUrl: string = `${ApiConstants.BASE_URL}${ApiConstants.PATH_CAREERS}`;

  getCareers(): Observable<CareerModel[]> {
    return this.httpClient.get<CareerModel[]>(this.baseUrl, {
      headers: supabaseHeaders,
      responseType: 'json',
    });
  }
}
