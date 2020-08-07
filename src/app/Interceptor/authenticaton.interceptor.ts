import { SocialAuthService } from 'angularx-social-login';
import { AlertManagerService } from 'src/app/Helpers/alert-manager.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthenticationService } from '../Modules/authentication/AuthService/authentication.service';

@Injectable()
export class AuthenticatonInterceptor implements HttpInterceptor {

  constructor(private Alert:AlertManagerService,private Auth:SocialAuthService,private AuthenticationService:AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authReq = request.clone({
      headers: request.headers.set('Authorization', 'Bearer '+this.AuthenticationService.getToken())
    });
      return next.handle(authReq);  
  }
  
}
