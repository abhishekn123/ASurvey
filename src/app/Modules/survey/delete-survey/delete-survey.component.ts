import { HttpErrorResponse } from '@angular/common/http';
import { SurveyService } from './../Service/survey.service';
import { Component, OnInit, Inject } from '@angular/core';
import { SurveyData } from '../survey/survey.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertManagerService } from 'src/app/Helpers/alert-manager.service';

@Component({
  selector: 'app-delete-survey',
  templateUrl: './delete-survey.component.html',
  styleUrls: ['./delete-survey.component.css']
})
export class DeleteSurveyComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:SurveyData,private SurveyService:SurveyService,private Alert:AlertManagerService,private dialogRef: MatDialogRef<DeleteSurveyComponent>) { }
  SurveyData:SurveyData;
  ngOnInit(): void {
    this.SurveyData=this.data;
  }
  DeleteSurvey():void
  {
    this.SurveyService.DeleteSurvey({"SM_Id":this.SurveyData.sM_Id,"SM_Name":this.SurveyData.sM_Name,"FromDate":this.SurveyData.startDate,"ToDate":this.SurveyData.endDate,"DM_ID":this.data.dM_Id}).subscribe(data=>
      {
        this.Alert.openSnackBar("Deleted Succesfully","Ok")
      },(err:HttpErrorResponse)=>
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
  closeDialog() {
    this.dialogRef.close('Pizza!');
  }
}
