import { SurveyData } from './../survey/survey.component';
import { AlertManagerService } from './../../../Helpers/alert-manager.service';
import { SurveyService } from './../Service/survey.service';
import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-survey',
  templateUrl: './edit-survey.component.html',
  styleUrls: ['./edit-survey.component.css']
})

export class EditSurveyComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:SurveyData,private SurveyService:SurveyService,private Alert:AlertManagerService) { }
   @Output() GetAllSurvey=new EventEmitter();
  ngOnInit(): void {
    this.SurveyData=this.data;
    this.id=this.data.dM_Id;
    this.SurveyService.GetAllDepartments().subscribe(data=>
      {
        this.Departments=data["departments"];
      })
  }
  Departments:Departments[];
  SurveyData:SurveyData;
  todayDate:Date = new Date();
  id;
  UpdateSurvey():void
  {
    this.SurveyService.UpdateSurvey({"SM_Id":this.SurveyData.sM_Id,"SM_Name":this.SurveyData.sM_Name,"FromDate":this.SurveyData.startDate,"ToDate":this.SurveyData.endDate,"DM_ID":this.id}).subscribe(data=>
      {
        this.Alert.openSnackBar("Updated Sucessfully","Ok")
      },(err: HttpErrorResponse)=>
      {
        if(err.status===400)
        {
          this.Alert.openSnackBar("All Feilds Are Compulsory","Ok")
        }
        else{
          this.Alert.openSnackBar("UnAuthorized Access","Ok")
        }
        
      })
  }
}
export interface Departments{
  dM_Id:number,
  dM_Name:string,
}