import { UserResponseReportComponent } from './Modules/report/user-response-report/user-response-report.component';
import { CreateQuestionComponent } from './Modules/survey/create-question/create-question.component';
import { QuestionsComponent } from './Modules/survey/questions/questions.component';
import { AuthenticationGuard } from './Guards/authentication.guard';
import { CreateSurveyComponent } from './Modules/survey/create-survey/create-survey.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveyComponent } from './Modules/survey/survey/survey.component';
import { LoginComponent } from './Modules/authentication/login/login.component';
import { PreviewSurveyComponent } from './Modules/survey/preview-survey/preview-survey.component';

const routes: Routes = [
  {
    path:'Login',
    component:LoginComponent,
  },
  {
    path:'Home',
component:SurveyComponent,
canActivate:[AuthenticationGuard],
},
{path:'CreateSurvey',
component:CreateSurveyComponent,
canActivate:[AuthenticationGuard],
},{
  path:'Questions',
  component:QuestionsComponent,
  canActivate:[AuthenticationGuard],
 },
 {
   path:'PreView',
   component:PreviewSurveyComponent,
   canActivate:[AuthenticationGuard]
 },
 {
   path:'Report',
   component:UserResponseReportComponent,
   canActivate:[AuthenticationGuard]
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
