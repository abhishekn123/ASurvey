import { AuthenticationService } from './AuthService/authentication.service';
import { MaterialModule } from './../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleButtonComponent } from './google-button/google-button.component';
import { ProfileComponentComponent } from './profile-component/profile-component.component';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component'



@NgModule({
  declarations: [GoogleButtonComponent, ProfileComponentComponent, LoginComponent],
  imports: [
    CommonModule,MaterialModule,HttpClientModule
  ],
  exports:[GoogleButtonComponent,ProfileComponentComponent],
  providers:[AuthenticationService]
})
export class AuthenticationModule { }
