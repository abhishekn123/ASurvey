import { AuthenticatonInterceptor } from './authenticaton.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthenticatonInterceptor, multi: true },
];