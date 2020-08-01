import { SurveyData } from './../survey/survey.component';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private http:HttpClient) { }
   SurveyData:SurveyData[];
  GetAllSurveys()
  {
    return this.http.get("https://localhost:5001/Associate/GetAllSurveys");
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
}
