import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../Service/survey.service';
import { Departments, SurveyFromDateAndEndDateValidator } from '../edit-survey/edit-survey.component';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-search-survey',
  templateUrl: './search-survey.component.html',
  styleUrls: ['./search-survey.component.css']
})
export class SearchSurveyComponent implements OnInit {

  constructor(private SurveyService:SurveyService,private _formBuilder: FormBuilder,private dialogRef: MatDialogRef<SearchSurveyComponent>) { }
  Departments:Departments[];
  SurveyFormGroup: FormGroup;
  todayDate:Date = new Date();
  ngOnInit(): void {
    this.SurveyFormGroup=this._formBuilder.group({
      'Surveyname':new FormControl('',[Validators.minLength(3)]),
     'StartDate' : new FormControl(''),
     'EndDate' : new FormControl(''),
     'Department':new FormControl(0)
   });
    this.SurveyService.GetAllDepartments().subscribe(data=>
      {
        this.Departments=data["departments"];
      })
  }
  SearchSurvey()
  {
    let data={
      sM_Name:'',
      startDate:'',
      endDate:'',
      dM_Id:0 
    }
    data.sM_Name=this.SurveyFormGroup.get('Surveyname').valid?this.SurveyFormGroup.get('Surveyname').value:'';
    data.startDate=this.SurveyFormGroup.get('StartDate').value;
    data.endDate=this.SurveyFormGroup.get('EndDate').value;
    data.dM_Id=this.SurveyFormGroup.get('Department').value;
    this.dialogRef.close(data)
  }
}
