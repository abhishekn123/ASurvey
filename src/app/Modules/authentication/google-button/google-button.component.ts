import { Component, OnInit } from '@angular/core';
import   { SocialAuthService }   from 'angularx-social-login';
import {
  GoogleLoginProvider
} from 'angularx-social-login';


@Component({
  selector: 'app-google-button',
  templateUrl: './google-button.component.html',
  styleUrls: ['./google-button.component.css']
})
export class GoogleButtonComponent implements OnInit {
  constructor(private authService:SocialAuthService) { }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(x => console.log(x)).catch(err=>
      {
        console.log('err',err);
      });
  }
  ngOnInit(): void {
  }

}
