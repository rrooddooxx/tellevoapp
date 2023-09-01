import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRegisterForm } from 'src/app/routes/register/domain/user-register-form.domain';
import { UserModel } from '../../routes/login/model/user.model';
import { supabaseHeaders } from './api.config';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<UserModel[]> {
    return this.httpClient.get<UserModel[]>(
      'https://tsctbsjuktimnuztflau.supabase.co/rest/v1/users',
      {
        headers: supabaseHeaders,
        responseType: 'json',
      }
    );
  }

  addUser(body: UserRegisterForm): Observable<Object> {
    return this.httpClient.post(
      'https://tsctbsjuktimnuztflau.supabase.co/rest/v1/users',
      body,
      {
        headers: supabaseHeaders
      }
    )
  }
}
