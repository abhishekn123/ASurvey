import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SurveyMaster } from '../../survey/Models/SurveyModel';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http:HttpClient) { }
   Baseurl ="https://localhost:5001";
  GetUserResponseReport(surveyMaster:SurveyMaster)
  {
    return this.http.post(this.Baseurl+"/Admin/GetUserResponseReport",surveyMaster);
  }
  GetCompletionReport(Surveymaster:SurveyMaster)
  {
    return this.http.post(this.Baseurl+"/Admin/GetCompletionReport",Surveymaster);
  }
}
