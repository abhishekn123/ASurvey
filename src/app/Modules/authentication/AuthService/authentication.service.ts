import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient) { }


  AuthenticateUser(Token_Id:string)
  {
    return this.http.post("https://localhost:5001/Users/Authenticate",{'Token_Id':Token_Id})
  }
}
