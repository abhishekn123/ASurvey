import { ReportModule } from './Modules/report/report.module';
import { httpInterceptorProviders } from './Interceptor/InterceptorProvider';
import { AuthenticatonInterceptor } from './Interceptor/authenticaton.interceptor';
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
import { JwtModule } from "@auth0/angular-jwt";
import { AgGridModule } from 'ag-grid-angular';


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
    MaterialModule,
    JwtModule,
    ReportModule,
    AgGridModule.withComponents([])
  ],
  providers: [   {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: true,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '471172821639-k4ee78c4kqq22pj7n8580hp2o5jqa5gk.apps.googleusercontent.com'
          ),
        },],
    } as SocialAuthServiceConfig,
  },httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
