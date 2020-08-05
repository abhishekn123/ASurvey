import { MaterialModule } from './material/material.module';
import { AuthenticationModule } from './Modules/authentication/authentication.module';
import { SocialAuthService } from 'angularx-social-login';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SurveyModule } from './Modules/survey/survey.module';
import { NavbarComponent } from './Shared/navbar/navbar.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
} from 'angularx-social-login';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SurveyModule,
    SocialLoginModule,
    AuthenticationModule,
    MaterialModule
  ],
  providers: [   {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: true,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '782740102672-mfc1do9oq50mpedecc92fmiu981ks69n.apps.googleusercontent.com'
          ),
        },
      ],
    } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
