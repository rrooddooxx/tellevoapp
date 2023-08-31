import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { supabaseHeaders } from './api.config';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  async getUsers() {
    return this.httpClient.get(
      'https://tsctbsjuktimnuztflau.supabase.co/rest/v1/users',
      {
        headers: supabaseHeaders,
      }
    );
  }
}
