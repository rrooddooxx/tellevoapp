import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const supabaseHeaders = new HttpHeaders()
  .set('Authorization', `Bearer ${environment.SUPABASE_API_JWT}`)
  .set('apikey', `${environment.SUPABASE_API_JWT}`);

export const getHeaders = () => {
  return {
    headers: supabaseHeaders,
    responseType: 'json',
    observe: 'response',
  };
};
