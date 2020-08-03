import { QuestionsComponent } from './questions/questions.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyComponent } from './survey/survey.component';
import { CreateSurveyComponent } from './create-survey/create-survey.component';
import { EditSurveyComponent } from './edit-survey/edit-survey.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { DeleteSurveyComponent } from './delete-survey/delete-survey.component'
@NgModule({
  imports: [
    CommonModule,MaterialModule,HttpClientModule,ReactiveFormsModule,FormsModule
  ],
  declarations: [SurveyComponent, QuestionsComponent, CreateSurveyComponent, EditSurveyComponent, DeleteSurveyComponent],
  exports:[SurveyComponent,QuestionsComponent,CreateSurveyComponent ],
  entryComponents:[EditSurveyComponent,DeleteSurveyComponent]
})
export class SurveyModule { }
