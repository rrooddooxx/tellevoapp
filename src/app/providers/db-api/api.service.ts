import { HttpClient, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../../routes/login/model/user.model';
import { supabaseHeaders } from './api.config';
import { ApiConstants } from './api.constants';
import { AddUserRequest, EditUserRequest } from './model/api.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<UserModel[]> {
    return this.httpClient.get<UserModel[]>(ApiConstants.PATH_USERS, {
      headers: supabaseHeaders,
      responseType: 'json',
    });
  }

  getUserByEmail(email: string): Observable<UserModel[]> {
    return this.httpClient.get<UserModel[]>(
      `${ApiConstants.PATH_USERS}?${ApiConstants.USERBYEMAIL_QUERY_PARAM}=eq.${email}`,
      {
        headers: supabaseHeaders,
        responseType: 'json',
      }
    );
  }

  addUser(payload: AddUserRequest): Observable<Object> {
    return this.httpClient.post(ApiConstants.PATH_USERS, payload, {
      headers: supabaseHeaders,
      responseType: 'json',
    });
  }

  editUser(payload: EditUserRequest): Observable<HttpResponseBase> {
    const userID = payload.id;
    return this.httpClient.put(
      `${ApiConstants.PATH_USERS}?id=eq.${userID}`,
      payload,
      {
        headers: supabaseHeaders,
        responseType: 'json',
        observe: 'response',
      }
    );
  }
}
