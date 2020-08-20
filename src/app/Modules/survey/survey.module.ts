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
import { SurveyDateValidatorDirective } from './SurveyValidators/survey-date-validator.directive';
import { DeleteOptionComponent } from './delete-option/delete-option.component';
import { CreateOptionComponent } from './create-option/create-option.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { DeleteQuestionComponent } from './delete-question/delete-question.component';
import { SearchSurveyComponent } from './search-survey/search-survey.component';
import {TableModule} from 'primeng/table';
@NgModule({
  imports: [
CommonModule,MaterialModule,HttpClientModule,ReactiveFormsModule,FormsModule,TableModule
  ],
  declarations: [DepartmentIdConverterPipe,SurveyComponent, QuestionsComponent, CreateSurveyComponent, EditSurveyComponent, DeleteSurveyComponent, SurveyDateValidatorDirective,SurveyDateValidatorDirective, DeleteOptionComponent, CreateOptionComponent, CreateQuestionComponent, DeleteQuestionComponent, SearchSurveyComponent ],
  exports:[SurveyComponent,QuestionsComponent,CreateSurveyComponent ],
  entryComponents:[EditSurveyComponent,DeleteSurveyComponent,CreateSurveyComponent,DeleteOptionComponent,CreateOptionComponent,CreateQuestionComponent,DeleteQuestionComponent]
})
export class SurveyModule { }
