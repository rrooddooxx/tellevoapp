import { HttpClient, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../../../routes/login/model/user.model';
import { supabaseHeaders } from '../api.config';
import { ApiConstants } from '../api.constants';
import { AddUserRequest, EditUserRequest } from '../domain/users.domain';

@Injectable()
export class UsersRepository {
  constructor(private httpClient: HttpClient) {}

  private baseUrl: string = `${ApiConstants.BASE_URL}${ApiConstants.PATH_USERS}`;

  getUsers(): Observable<UserModel[]> {
    return this.httpClient.get<UserModel[]>(this.baseUrl, {
      headers: supabaseHeaders,
      responseType: 'json',
    });
  }

  getUserByEmail(email: string): Observable<UserModel[]> {
    return this.httpClient.get<UserModel[]>(
      `${this.baseUrl}?${ApiConstants.USERBYEMAIL_QUERY_PARAM}=eq.${email}`,
      {
        headers: supabaseHeaders,
        responseType: 'json',
      }
    );
  }

  addUser(payload: AddUserRequest): Observable<Object> {
    return this.httpClient.post(this.baseUrl, payload, {
      headers: supabaseHeaders,
      responseType: 'json',
    });
  }

  editUser(payload: EditUserRequest): Observable<HttpResponseBase> {
    const userID = payload.id;
    return this.httpClient.put(`${this.baseUrl}?id=eq.${userID}`, payload, {
      headers: supabaseHeaders,
      responseType: 'json',
      observe: 'response',
    });
  }
}
