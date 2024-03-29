import { SurveyMaster } from './../Models/SurveyModel';
import { QuestionMaster } from './../create-survey/data-model';
import { CreateOptionModel, OptionMaster } from './../Models/OptionCreateModel';
import { OptionServerData } from './../questions/questions.component';
import { SurveyData } from './../survey/survey.component';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Departments } from '../edit-survey/edit-survey.component';
import { QuestionViewModel } from '../Models/QuestionModel';
@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private http:HttpClient) {
    this.GetAllDepartments().subscribe(data=>
      {
        this.Departments=data['departments']
      })
   }
   SurveyData:SurveyData[];
   Departments:Departments[];
   BaseUrl="https://localhost:5001"
  GetAllSurveys()
  {
    return this.http.get(this.BaseUrl+"/Admin/GetSurveyList");
  }
  createDateAsUTC(date) {
    console.log("CreateUtcDate",date);
    return new Date(Date.UTC(new Date().getFullYear(), date.getMonth(), date.getDate(), new Date().getHours(), new Date().getMinutes(), new Date().getSeconds(),new Date().getMilliseconds()));
}
  UpdateSurvey(SurveyMaster)
  {
    return this.http.post(this.BaseUrl+"/Admin/UpdateSurvey",SurveyMaster)
  }
  DeleteSurvey(SurveyMaster)
  {
    return this.http.post(this.BaseUrl+"/Admin/DeleteSurvey",SurveyMaster)
  }
  GetAllDepartments()
  {
    return this.http.get(this.BaseUrl+"/Admin/GetAllDepartMents");
  }

  SurveyBulkInsert(SurveyData)
  {
    let headers = new Headers({ 'Content-Type': 'application/json' });
     return this.http.post(this.BaseUrl+"/Admin/BulkInsertSurvey",JSON.parse(SurveyData),{headers:{'Content-Type': 'application/json'}})
  }
   
  GetSurveyQuestions(surveyMaster:SurveyMaster)
  {
    console.log('Serice ',typeof surveyMaster.SM_Id);
    let SM_Id=surveyMaster.SM_Id;
    return this.http.post(this.BaseUrl+"/Admin/Questions",{SM_Id},{headers:{'Content-Type': 'application/json'}})
  }

  CreateOption(data:CreateOptionModel)
  {
    console.log(data)
    return this.http.post(this.BaseUrl+"/Admin/CreateOption",data,{headers:{'Content-Type': 'application/json'}})
  }

  RemoveOption(OptionMaster:OptionMaster[])
  {
    console.log(OptionMaster)
    return this.http.post(this.BaseUrl+"/Admin/RemoveOption",OptionMaster)
  }

  CreateQuestion(QuestionViewModel:QuestionViewModel)
  {
    console.log(QuestionViewModel);
    return this.http.post(this.BaseUrl+"/Admin/CreateQuestion",QuestionViewModel)
  }

  RemoveQuestion(QuestionViewModel:QuestionViewModel)
  {
    return this.http.post(this.BaseUrl+"/Admin/DeleteQuestion",QuestionViewModel)
  }
  UpdateQuestion(QuestionViewModel:QuestionViewModel)
  {
    return this.http.post(this.BaseUrl+"/Admin/UpdateQuestion",QuestionViewModel)
  }
}
