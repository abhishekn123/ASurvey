import { MaterialModule } from './../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyComponent } from './survey/survey.component';
import { QuestionsComponent,QuestionModal } from './questions/questions.component';
@NgModule({
  imports: [
    CommonModule,MaterialModule
  ],
  declarations: [SurveyComponent, QuestionsComponent,QuestionModal],
  exports:[SurveyComponent,QuestionsComponent,QuestionModal ]
})
export class SurveyModule { }
