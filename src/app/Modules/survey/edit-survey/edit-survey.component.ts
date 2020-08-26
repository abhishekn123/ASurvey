import { SurveyData } from './../survey/survey.component';
import { AlertManagerService } from './../../../Helpers/alert-manager.service';
import { SurveyService } from './../Service/survey.service';
import { Component, OnInit, Inject, Output, EventEmitter, Directive } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormControl, FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { SurveyDateValidatorDirective } from '../SurveyValidators/survey-date-validator.directive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-survey',
  templateUrl: './edit-survey.component.html',
  styleUrls: ['./edit-survey.component.css'],
})

export class EditSurveyComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:SurveyData,private SurveyService:SurveyService,private Alert:AlertManagerService,private _formBuilder: FormBuilder,private route:Router,private dialogRef: MatDialogRef<EditSurveyComponent>) { }
   @Output() GetAllSurvey=new EventEmitter();
   SurveyFormGroup: FormGroup;
   isDisabled=true;
   StartedDate:Date;

  ngOnInit(): void {
    this.StartedDate=new Date(this.data.startDate)
   this.SurveyFormGroup=this._formBuilder.group({
     'name':new FormControl(this.data.sM_Name),
    'StartDate' : new FormControl((new Date(this.data.startDate)).toISOString()),
    'EndDate' : new FormControl((new Date(this.data.endDate)).toISOString()),
    'Department':new FormControl(this.data.dM_Id,[Validators.required])
  },{ validator:SurveyFromDateAndEndDateValidator });
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
  createDateAsUTC(date:Date) {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), new Date().getHours(), new Date().getMinutes(), new Date().getSeconds(),new Date().getMilliseconds()));
  
}
  UpdateSurvey():void
  {
    console.log('Date from Function',this.createDateAsUTC(new Date(this.SurveyData.startDate)),this.SurveyData.startDate)
    this.SurveyService.UpdateSurvey({"SM_Id":this.SurveyData.sM_Id,"SM_Name":this.SurveyFormGroup.get('name').value,"StartDate":this.createDateAsUTC(new Date(this.SurveyFormGroup.get('StartDate').value)),"EndDate":this.createDateAsUTC(new Date(this.SurveyFormGroup.get('EndDate').value)),"DM_ID":this.SurveyFormGroup.get('Department').value}).subscribe(data=>
      {
        this.Alert.openSnackBar("Updated Sucessfully","Ok")
      },(err: HttpErrorResponse)=>
      {
        if(err.status===400)
        {
          this.Alert.openSnackBar("Something Went Wrong","Ok")
        }
        else{
          this.Alert.openSnackBar("UnAuthorized Access","Ok")
        }
        
      })
  }
  GetQuestions()
  {
    if(!(new Date(this.SurveyData.startDate)>new Date()))
    {
      return this.Alert.openSnackBar("Only Future Surveys is Editable","OK")
    }
    this.dialogRef.close();
    this.route.navigate(["/Questions"],{queryParams:{Survey:this.SurveyData.sM_Id}})
  }
}

export interface Departments{
  dM_Id:number,
  dM_Name:string,
}
export const SurveyFromDateAndEndDateValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const StartDate = control.get('StartDate');
  const EndDate = control.get('EndDate');
    if (new Date(StartDate.value) > new Date(EndDate.value) || new Date(StartDate.value)<new Date(Date.now()) || new Date(EndDate.value)<new Date(Date.now())  ) {
      
      return { MisMatch: true };
    } else {
      return null
    }
}