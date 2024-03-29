import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertManagerService } from 'src/app/Helpers/alert-manager.service';
import { SocialAuthService, SocialUser } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient,private Auth:SocialAuthService,private Alert:AlertManagerService) { }
   
  BaseUrl="https://localhost:5001"
  User:SocialUser=null;

  AuthenticateUser(Token_Id:string)
  {
    return this.http.post(this.BaseUrl+"/Users/AuthenticateAdmin",{'Token_Id':Token_Id})
  }

  getToken():string{
    return localStorage.getItem('Token');
  }
  removeToken():void
  {
   localStorage.removeItem('Token');
  }
  CheckAuthState():Boolean
  {
    const Token=this.getToken();
    const helper = new JwtHelperService();
    if(Token)
    {
       if(helper.isTokenExpired(Token))
       {
         this.Alert.openSnackBar("Please Login","ok")
         this.User=null;
         this.Auth.signOut();
         return false;
       }
       return true;
    }
    this.User=null;
    this.Alert.openSnackBar("Please Login","ok")
    console.log(this.User)
    return false;
  }
}
