import { CreateQuestionComponent } from './Modules/survey/create-question/create-question.component';
import { QuestionsComponent } from './Modules/survey/questions/questions.component';
import { AuthenticationGuard } from './Guards/authentication.guard';
import { CreateSurveyComponent } from './Modules/survey/create-survey/create-survey.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveyComponent } from './Modules/survey/survey/survey.component';

const routes: Routes = [
  {path:'Home',
component:SurveyComponent},
{path:'CreateSurvey',
component:CreateSurveyComponent,
canActivate:[AuthenticationGuard],
},{
  path:'Questions',
  component:QuestionsComponent,
  canActivate:[AuthenticationGuard],
 },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
