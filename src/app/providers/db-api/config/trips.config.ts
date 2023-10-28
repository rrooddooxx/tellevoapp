import { HttpHeaders } from '@angular/common/http';
import { supabaseHeaders } from '../api.config';
import { ApiConstants } from '../api.constants';

export type ISupabaseHeaders = {
  headers: HttpHeaders;
  responseType: 'json';
};

export class TripsRepositoryConfig {
  private baseUrl: string = `${ApiConstants.BASE_URL}`;

  constructor() {}

  getHeaders(): ISupabaseHeaders {
    return {
      headers: supabaseHeaders,
      responseType: 'json',
    };
  }

  getTripsUrl(): string {
    return `${this.baseUrl}${ApiConstants.PATH_TRIPS}`;
  }

  getActiveTripsRPCUrl(): string {
    return `${this.baseUrl}${ApiConstants.PATH_RPC_ACTIVE_TRIPS}`;
  }
}
