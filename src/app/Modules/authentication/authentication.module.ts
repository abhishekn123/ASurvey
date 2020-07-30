import { MaterialModule } from './../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleButtonComponent } from './google-button/google-button.component';
import { ProfileComponentComponent } from './profile-component/profile-component.component';



@NgModule({
  declarations: [GoogleButtonComponent, ProfileComponentComponent],
  imports: [
    CommonModule,MaterialModule
  ],
  exports:[GoogleButtonComponent,ProfileComponentComponent]
})
export class AuthenticationModule { }
