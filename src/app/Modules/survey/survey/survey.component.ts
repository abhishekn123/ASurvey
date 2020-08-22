import { SurveyMaster } from './../Models/SurveyModel';
import { AlertManagerService } from 'src/app/Helpers/alert-manager.service';
import { DepartmentIdConverterPipe } from './../../../Pipes/department-id-converter.pipe';
import { Departments } from './../edit-survey/edit-survey.component';
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
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { SearchSurveyComponent } from '../search-survey/search-survey.component';
@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})



export class SurveyComponent implements OnInit {
  dataSource ;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static:true}) sort: MatSort;
  Loading:Boolean;
  DepartmentsList:Departments[];
  Departments:Departments[];
  SurveyNameFilter= new FormControl('');
  StartDateFilter=new FormControl('');
  EndDateFilter=new FormControl('');
  DepartmentFilter=new FormControl('');
  filterValues={
    sM_Name:'',
    startDate:'',
    endDate:'',
    dM_Id:'' 
  }
  SelectedDepartmentId:number;
  SurveyName;
   SurveyArray:SurveyData[];
     constructor(private SurveyService:SurveyService,public dialog: MatDialog,  private route: Router,private Alert:AlertManagerService) { 
       
     }
     createFilter(): (data: any, filter: string) => boolean {
      let filterFunction = function(data, filter): boolean {
        let searchTerms = JSON.parse(filter);
        return data.sM_Name.toLowerCase().indexOf(searchTerms.sM_Name) !== -1
          && data.startDate.toString().toLowerCase().indexOf(searchTerms.startDate) !== -1
          && data.endDate.toLowerCase().indexOf(searchTerms.endDate) !== -1
          // && data.dM_Id.indexOf(searchTerms.dM_Id) !== -1;
      }
      return filterFunction;
    }
  ngOnInit(): void {
    this.Loading=true;
    this.GetAllSurveys();
    this.DepartmentsList=this.SurveyService.Departments;
    this.SurveyService.GetAllDepartments().subscribe(data=>
      {
        this.Departments=data["departments"];
      })
  }
  // SearchByDepartmentChange()
  // {
  //   let newState = this.dataSource.filter(exp=>exp.dM_Id===this.SelectedDepartmentId);
  //   this.dataSource=new MatTableDataSource<any>(newState); 
  //   this.dataSource.paginator=this.paginator;
  // }
  // SearchBySurveyName()
  // {
  //   let newState =this.SurveyArray.filter(exp=>exp.sM_Name.startsWith(this.SurveyName));
  //   this.dataSource=new MatTableDataSource<any>(newState); 
  //   this.dataSource.paginator=this.paginator;

  // }
   OpenCreateSurveyComponent()
   {
    this.route.navigate(['/CreateSurvey']);
   }
  GetAllSurveys()
  {
     this.SurveyService.GetAllSurveys().subscribe((data:SurveyData[])=>
      {
        this.Loading=false;
      this.SurveyArray=data;
      this.dataSource = new MatTableDataSource<any>(this.SurveyArray); 
      this.dataSource.paginator=this.paginator;
      console.log('dataSource',this.dataSource)
      },err=>
      {
        this.Loading=false;
        console.log(err);
      })
  }
  displayedColumns: string[] = ['SurveyName', 'StartDate', 'EndDate', 'Department','Action'];


  GetQuestions(Survey)
  {
    if(!(new Date(Survey.startDate)>new Date()))
    {
      return this.Alert.openSnackBar("Only Future Surveys is Editable","OK")
    }
    this.route.navigate(["/Questions"],{queryParams:{Survey:Survey.sM_Id}})
  }

  EditSurvey(Survey)
  {
    if(!(Date.now()<=Date.parse(Survey.startDate)))
    {
      return this.Alert.openSnackBar("Only Future Surveys is Editable","OK")
    }
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
  SearchSurvey()
  {
    const dialogRef = this.dialog.open(SearchSurveyComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {
     let survey:any[] = this.SurveyArray.filter(exp=>result.sM_Name!=""?exp.sM_Name.toLowerCase().startsWith(result.sM_Name.toLowerCase()):exp).filter(exp=>
      {
        
        if(result.startDate!=="")
        {
           if(new Date(exp.startDate).getDate()>=new Date(result.startDate).getDate())
           {
            return exp;
           }
    
        }
        else
        {
          return exp;
        }
      }).filter(exp=>
        {
          if(result.endDate!=="")
          {
             if(new Date(exp.endDate).getDate()<=new Date(result.endDate).getDate())
             {
              return exp;
             }
      
          }
          else
          {
            return exp;
          }
        }).filter(exp=>result.dM_Id!=0?exp.dM_Id===result.dM_Id:exp);
        this.dataSource= new MatTableDataSource<any>(survey);
        this.dataSource.paginator= this.paginator;
      }


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
