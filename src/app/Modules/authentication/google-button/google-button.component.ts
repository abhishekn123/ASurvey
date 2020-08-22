import { AlertManagerService } from './../../../Helpers/alert-manager.service';
import { AuthenticationService } from './../AuthService/authentication.service';
import { Component, OnInit } from '@angular/core';
import   { SocialAuthService }   from 'angularx-social-login';
import {
  GoogleLoginProvider
} from 'angularx-social-login';
import { Router } from '@angular/router';


@Component({
  selector: 'app-google-button',
  templateUrl: './google-button.component.html',
  styleUrls: ['./google-button.component.css']
})
export class GoogleButtonComponent implements OnInit {
  constructor(private route:Router,private authService:SocialAuthService,private Auth:AuthenticationService,private Alert:AlertManagerService) { }
  signInWithGoogle(): void {
    console.log("Login state inside SignInWith Google",this.authService.authState)
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(x => 
      {
        this.Auth.AuthenticateUser(x.idToken).subscribe(data=>
          {
              localStorage.setItem('Token',data['token']);
              this.route.navigate(['/Home'])
          },err=>
          {
            console.log('err',err);
            this.Alert.openSnackBar('UnAuthorized Access','Ok')
            this.authService.signOut();
            this.route.navigate(['/Login'])
          })
      }).catch(err=>
      {
        console.log('err',err);
        this.Alert.openSnackBar('Login Failed','Ok')
        this.authService.signOut();
      });
  }
  ngOnInit(): void {
  }

}
