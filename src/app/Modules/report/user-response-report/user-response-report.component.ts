import { Departments } from './../../survey/edit-survey/edit-survey.component';
import { SurveyService } from './../../survey/Service/survey.service';
import { UserResponse } from './../Models/UserResponseModel';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertManagerService } from 'src/app/Helpers/alert-manager.service';
import { ReportService } from './../Services/report.service';
import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { SurveyMaster } from '../../survey/Models/SurveyModel';

@Component({
  selector: 'app-user-response-report',
  templateUrl: './user-response-report.component.html',
  styleUrls: ['./user-response-report.component.css']
})
export class UserResponseReportComponent implements OnInit {

  constructor(private report:ReportService,private Alert:AlertManagerService,private service:SurveyService) { }
  Departments:Departments[];
  ngOnInit(): void {
   this.Departments= this.service.Departments
  }
  survey=new FormGroup({
    StartDate:new FormControl('',[Validators.required]),
    EndDate:new FormControl('',[Validators.required]),
    Department:new FormControl('',[Validators.required])
  })

   DownloadReport()
   { 
     let survey = new SurveyMaster(0,"",this.survey.get('StartDate').value,this.survey.get('EndDate').value,null,this.survey.get('Department').value);
     this.report.GetUserResponseReport(survey).subscribe((data:UserResponse[])=>
      {
        console.log(data);
        if(data.length>0)
        {
          const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
          const workbook: XLSX.WorkBook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
          XLSX.writeFile(workbook,"Report.xlsx");
        }
        else{
          this.Alert.openSnackBar("No Surveys Found For The Above Dates","ok");
        }

      },err=>
      {
         this.Alert.openSnackBar("Something Went Wrong","ok");
      })
   }
}
