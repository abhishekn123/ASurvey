import { Component, OnInit,ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatIconRegistry} from '@angular/material/icon';
export interface SurveyData {
  SurveyId:number,
  SurveyName: string;
  StartDate: string;
  EndDate: string;
  Department: string;
}

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  
  constructor() { 
   
  }

  ngOnInit(): void {
    console.log(this.dataSource)
    this.dataSource.paginator=this.paginator;
  }
  displayedColumns: string[] = ['SurveyName', 'StartDate', 'EndDate', 'Department','Action'];
  ServerData:SurveyData[] = [{SurveyId:1,SurveyName:"ABCD",StartDate:'2020-01-12',EndDate:'2020-01-12',Department:'Ivy'},
  {SurveyId:2,SurveyName:"ABCD",StartDate:'2020-01-12',EndDate:'2020-01-12',Department:'Ivy'},
  {SurveyId:3,SurveyName:"ABCD",StartDate:'2020-01-12',EndDate:'2020-01-12',Department:'Ivy'},
  {SurveyId:4,SurveyName:"ABCD",StartDate:'2020-01-12',EndDate:'2020-01-12',Department:'Ivy'},
  {SurveyId:5,SurveyName:"ABCD",StartDate:'2020-01-12',EndDate:'2020-01-12',Department:'Ivy'},
  {SurveyId:6,SurveyName:"ABCD",StartDate:'2020-01-12',EndDate:'2020-01-12',Department:'Ivy'},];
  dataSource = new MatTableDataSource<SurveyData>(this.ServerData);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
 
  GetQuestions(SurveyId)
  {
    console.log('Survey Id is',SurveyId);
  }

  EditSurvey(SurveyId)
  {
    console.log("Edit Survey Id is",SurveyId);
  }

  DeleteSurvey(SurveyId)
  {
     console.log("Delete Survey Id is",SurveyId);
  }
}
