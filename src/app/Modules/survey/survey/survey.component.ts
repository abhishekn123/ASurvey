import { DeleteSurveyComponent } from './../delete-survey/delete-survey.component';
import { CreateSurveyComponent } from './../create-survey/create-survey.component';
import { SurveyService } from './../Service/survey.service';
import { Component, OnInit,ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatIconRegistry} from '@angular/material/icon';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EditSurveyComponent } from '../edit-survey/edit-survey.component';
@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})



export class SurveyComponent implements OnInit {
  dataSource;
   SurveyArray:SurveyData[];
     constructor(private SurveyService:SurveyService,public dialog: MatDialog) { 
     
   
  }
  ngOnInit(): void {
   this.GetAllSurveys();
  }
  GetAllSurveys()
  {
    this.SurveyService.GetAllSurveys().subscribe(data=>
      {
      this.SurveyArray=data['survey'];
      this.dataSource = new MatTableDataSource<any>(this.SurveyArray); 
      this.dataSource.paginator=this.paginator;
      },err=>
      {
        console.log(err);
      })
  }
  displayedColumns: string[] = ['SurveyName', 'StartDate', 'EndDate', 'Department','Action'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

 

  GetQuestions(SurveyId)
  {
    console.log(this.dataSource.data)
    console.log('Survey Id is',SurveyId);
  }

  EditSurvey(Survey)
  {
    console.log("Edit Survey Id is",Survey.SurveyId);
    const dialogRef=this.dialog.open(EditSurveyComponent,{data:Survey});
    dialogRef.afterClosed().subscribe(result => {
       this.GetAllSurveys();
    });
  }

  DeleteSurvey(Survey)
  {
     console.log("Delete Survey Id is",Survey);
     const dialogRef = this.dialog.open(DeleteSurveyComponent,{data:Survey});
     dialogRef.afterClosed().subscribe(result => {
      this.GetAllSurveys();
   });
  }
}
export interface SurveyData {
  dM_Id: number,
  departmaster: Object,
  endDate: string,
  sM_Id:number,
  sM_Name:string,
  startDate:string
}