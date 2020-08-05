import { CreateSurveyComponent } from './Modules/survey/create-survey/create-survey.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveyComponent } from './Modules/survey/survey/survey.component';

const routes: Routes = [
  {path:'Home',
component:SurveyComponent},
{path:'CreateSurvey',
component:CreateSurveyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
