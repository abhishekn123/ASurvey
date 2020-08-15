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
  GetAllSurveys()
  {
    return this.http.get("https://localhost:5001/Admin/GetSurveyList");
  }
  createDateAsUTC(date) {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), new Date().getHours(), new Date().getMinutes(), new Date().getSeconds(),new Date().getMilliseconds()));
}
  UpdateSurvey(SurveyMaster)
  {
    return this.http.post("https://localhost:5001/Admin/UpdateSurvey",SurveyMaster)
  }
  DeleteSurvey(SurveyMaster)
  {
    return this.http.post("https://localhost:5001/Admin/DeleteSurvey",SurveyMaster)
  }
  GetAllDepartments()
  {
    return this.http.get("https://localhost:5001/Admin/GetAllDepartMents");
  }

  SurveyBulkInsert(SurveyData)
  {
    let headers = new Headers({ 'Content-Type': 'application/json' });
     return this.http.post("https://localhost:5001/Admin/BulkInsertSurvey",JSON.parse(SurveyData),{headers:{'Content-Type': 'application/json'}})
  }
   
  GetSurveyQuestions(SM_Id:number)
  {
    return this.http.post("https://localhost:5001/Admin/Questions",{SM_Id},{headers:{'Content-Type': 'application/json'}})
  }

  CreateOption(data:CreateOptionModel)
  {
    console.log(data)
    return this.http.post("https://localhost:5001/Admin/CreateOption",data,{headers:{'Content-Type': 'application/json'}})
  }

  RemoveOption(OptionMaster:OptionMaster[])
  {
    console.log(OptionMaster)
    return this.http.post("https://localhost:5001/Admin/RemoveOption",OptionMaster)
  }

  CreateQuestion(QuestionViewModel:QuestionViewModel)
  {
    console.log(QuestionViewModel);
    return this.http.post("https://localhost:5001/Admin/CreateQuestion",QuestionViewModel)
  }

  RemoveQuestion(QuestionViewModel:QuestionViewModel)
  {
    return this.http.post("https://localhost:5001/Admin/DeleteQuestion",QuestionViewModel)
  }
  UpdateQuestion(QuestionViewModel:QuestionViewModel)
  {
    return this.http.post("https://localhost:5001/Admin/UpdateQuestion",QuestionViewModel)
  }
}
