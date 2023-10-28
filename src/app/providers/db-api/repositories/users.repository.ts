import { HttpClient, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../../../routes/login/model/user.model';
import { ApiDatabaseConfig } from '../api.config';
import { ApiConstants } from '../api.constants';
import { AddUserRequest, EditUserRequest } from '../domain/users.domain';
import { UserProfile } from '../model/users.model';

@Injectable()
export class UsersRepository {
  constructor(
    private httpClient: HttpClient,
    private readonly apiConfig: ApiDatabaseConfig
  ) {}

  private baseUrl: string = `${ApiConstants.BASE_URL}${ApiConstants.PATH_USERS}`;

  getUsers(): Observable<UserModel[]> {
    return this.httpClient.get<UserModel[]>(
      this.baseUrl,
      this.apiConfig.getHeadersBody()
    );
  }

  getUserByEmail(email: string): Observable<UserModel[]> {
    return this.httpClient.get<UserModel[]>(
      `${this.baseUrl}?${ApiConstants.USERBYEMAIL_QUERY_PARAM}=eq.${email}`,
      this.apiConfig.getHeadersBody()
    );
  }

  addUser(payload: AddUserRequest): Observable<Object> {
    return this.httpClient.post(
      this.baseUrl,
      payload,
      this.apiConfig.getHeadersBody()
    );
  }

  editUser(payload: EditUserRequest) {
    const userID = payload.id;
    return this.httpClient.put<HttpResponseBase>(
      `${this.baseUrl}?id=eq.${userID}`,
      payload,
      this.apiConfig.getHeadersResponse()
    );
  }

  getUserProfileById(userId: number): Observable<UserProfile[]> {
    return this.httpClient.get<UserProfile[]>(
      `${this.apiConfig.getBaseUrl()}${
        ApiConstants.PATH_RPC_USER_PROFILE
      }?user_id=eq.${userId?.toString() || ''}`,
      this.apiConfig.getHeadersBody()
    );
  }
}
