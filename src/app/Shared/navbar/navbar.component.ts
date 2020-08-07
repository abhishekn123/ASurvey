import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import {MatSidenav} from '@angular/material/sidenav';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav: MatSidenav;
  user: SocialUser;
  loggedIn: boolean;
  side:string='side'
  constructor(private authService: SocialAuthService,private router:Router) {
    console.log('constructor called');
   
   }
   navigate():void
   {
     this.router.navigate(['/CreateSurvey'])
   }
  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log('Subscribe called');
    },err=>
    {
      console.log('err in auth state')
    });
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  
  }

}
