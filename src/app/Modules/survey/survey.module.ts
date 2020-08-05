import { DepartmentIdConverterPipe } from './../../Pipes/department-id-converter.pipe';
import { QuestionsComponent } from './questions/questions.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyComponent } from './survey/survey.component';
import { CreateSurveyComponent } from './create-survey/create-survey.component';
import { EditSurveyComponent } from './edit-survey/edit-survey.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { DeleteSurveyComponent } from './delete-survey/delete-survey.component';
import { SurveyDateValidatorDirective } from './SurveyValidators/survey-date-validator.directive'
@NgModule({
  imports: [
    CommonModule,MaterialModule,HttpClientModule,ReactiveFormsModule,FormsModule
  ],
  declarations: [DepartmentIdConverterPipe,SurveyComponent, QuestionsComponent, CreateSurveyComponent, EditSurveyComponent, DeleteSurveyComponent, SurveyDateValidatorDirective,SurveyDateValidatorDirective],
  exports:[SurveyComponent,QuestionsComponent,CreateSurveyComponent ],
  entryComponents:[EditSurveyComponent,DeleteSurveyComponent,CreateSurveyComponent]
})
export class SurveyModule { }
