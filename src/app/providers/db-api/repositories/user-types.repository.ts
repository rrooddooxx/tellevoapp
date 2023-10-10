import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { supabaseHeaders } from '../api.config';
import { ApiConstants } from '../api.constants';
import { UserTypesModel } from '../model/user-types.model';

@Injectable()
export class UserTypesRepository {
  constructor(private readonly httpClient: HttpClient) {}

  private baseUrl: string = `${ApiConstants.BASE_URL}${ApiConstants.PATH_USER_TYPES}`;

  getUserTypes(): Observable<UserTypesModel[]> {
    return this.httpClient.get<UserTypesModel[]>(this.baseUrl, {
      headers: supabaseHeaders,
      responseType: 'json',
    });
  }
}
