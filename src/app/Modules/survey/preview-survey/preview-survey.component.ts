import { SurveyService } from './../Service/survey.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertManagerService } from 'src/app/Helpers/alert-manager.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionServerViewModel } from '../questions/questions.component';
import { SurveyMaster } from '../Models/SurveyModel';

@Component({
  selector: 'app-preview-survey',
  templateUrl: './preview-survey.component.html',
  styleUrls: ['./preview-survey.component.css']
})
export class PreviewSurveyComponent implements OnInit {
  QuestionsFromServer:QuestionServerViewModel[];
  IsUpdateDisabled:Boolean;
  surveyMaster:SurveyMaster;
  surveyId:number;
  Loading:Boolean;
  constructor(private router:Router,private route:ActivatedRoute,public dialog: MatDialog,private Alert:AlertManagerService,private _formBuilder: FormBuilder,private SurveyService:SurveyService) { }
  ngOnInit(): void {
    this.route
    .queryParams
    .subscribe(params => {
    this.surveyId = params['Survey'] || 0;
    this.surveyMaster=new SurveyMaster( parseInt(params['Survey']),'','','',null,1)
    console.log('Param',this.surveyMaster);
    this.GetSurveyQuestions(this.surveyMaster);
    });
    console.log(this.surveyMaster);
  }
  GoToHome():void
  {
    this.router.navigate(['/Home'])
  }
  GetSurveyQuestions(survey:SurveyMaster)
  {
    this.Loading=true;
    this.SurveyService.GetSurveyQuestions(survey).subscribe(data=>
      {
        this.Loading=false;
        console.log('data from The Server',data);
        this.QuestionsFromServer=<QuestionServerViewModel[]>data;
      },err=>
      {
        this.Loading=false;
        console.log(err);
      })
  }
}
