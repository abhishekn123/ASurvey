import { SocialAuthService } from 'angularx-social-login';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthenticationService } from '../Modules/authentication/AuthService/authentication.service';
import { AlertManagerService } from '../Helpers/alert-manager.service';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private Auth:SocialAuthService,private AuthenticationService:AuthenticationService,private Alert:AlertManagerService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const Token=this.AuthenticationService.getToken();
    const helper = new JwtHelperService();
    if(Token)
    {
      console.log('Is token Expired',helper.isTokenExpired(Token))
       if(helper.isTokenExpired(Token))
       {
         this.Alert.openSnackBar("Please Login","ok")
         this.Auth.signOut();
         return false;
       }
       return true;
    }
    this.Alert.openSnackBar("Please Login","ok")
    return false;
  }
  
}
