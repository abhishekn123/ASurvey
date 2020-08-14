import { CreateQuestionComponent } from './../create-question/create-question.component';
import { CreateOptionModel } from './../Models/OptionCreateModel';
import { CreateOptionComponent } from './../create-option/create-option.component';
import { DeleteOptionComponent } from './../delete-option/delete-option.component';

import { SurveyService } from './../Service/survey.service';
import { AlertManagerService } from './../../../Helpers/alert-manager.service';
import { Component, OnInit, Inject, AfterViewChecked } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  constructor(public dialog: MatDialog,private Alert:AlertManagerService,private _formBuilder: FormBuilder,private SurveyService:SurveyService) { }
  QuestionsFromServerArray=[];
  QuestionGroup:FormGroup[]=[]
  QuestionsFromServer:QuestionServerViewModel[];
  IsUpdateDisabled:Boolean;
  GetSurveyQuestions(SurveyId:number)
  {
    this.SurveyService.GetSurveyQuestions(SurveyId).subscribe(data=>
      {
        this.QuestionsFromServer=<QuestionServerViewModel[]>data;
        console.log('Questions From Server',this.QuestionsFromServer)
        this.initServerDate()
      },err=>
      {
        console.log(err);
      })
  }
  // -------------------------------------------------------------//
  initServerDate()
  {
    let que:FormGroup;
   for(var question of this.QuestionsFromServer)
   {{}
     console.log('Each Question',question);
    que=this._formBuilder.group({
      'SurveId':new FormControl(question.sM_Id,[Validators.required]),
      'QuestionId':new FormControl(question.questionMaster.qM_Id,[Validators.required]),
      'QuestionName':new FormControl(question.questionMaster.qM_QuestionName,[Validators.required]),
      'OptionMaster':new FormArray([],[Validators.required])
    })
    console.log('OptionMaster',question['optionMaster'])
  
    for(var option of question.optionMaster)
      {
        let OptionsGroup=new FormGroup({},[Validators.required]);
        console.log('Each Option',option.oM_Id);
        OptionsGroup.registerControl('options',new FormControl(option.options,[Validators.required]));
        OptionsGroup.registerControl('qM_Id',new FormControl(option.qM_Id,[Validators.required]));
        OptionsGroup.registerControl('oM_Id',new FormControl(option.oM_Id,[Validators.required]));
        <FormArray>que.controls['OptionMaster']['controls'].push(OptionsGroup)
      }
      this.QuestionsFromServerArray.push(que);
   }

   console.log("Question from Server Array",this.QuestionsFromServerArray)
  }
    // -------------------------------------------------------------//
  ngOnInit(): void {
    this.GetSurveyQuestions(1);
  }
    // -------------------------------------------------------------//
   RemoveQuestion(QuestionIndex)
   {
     console.log(this.QuestionsFromServerArray[QuestionIndex])
     this.QuestionsFromServerArray.splice(QuestionIndex,1);
   }
     // -------------------------------------------------------------//
   UpdateQuestion(questionIndex,optionIndex)
   {
       for(var item of this.QuestionsFromServerArray[questionIndex].controls['OptionMaster'].controls )
       {
         if(item.invalid)
         {
           this.Alert.openSnackBar("All Feild Are Compulsory","Ok");
           break;
         }
         console.log(item.value);
       }
   }
  // -------------------------------------------------------------//
   BulkUpdate()
   {
     let avr=[];
     console.log(this.QuestionsFromServerArray)
     for(var question of this.QuestionsFromServerArray)
     {
       let data;
       console.log('Question Valid',question.valid)
       if(question.get('OptionMaster').valid && question.valid)
       {
        data ={
          "sM_Id":question.get('SurveId').value,
          "qM_Id":question.get('QuestionId').value,
          "QuestionName":question.get('QuestionName').value,
          "OptionMaster":[]
        }
        for(let option of question.get('OptionMaster')['controls'])
        {
           data.OptionMaster.push({'options':option.value})
        }
       }
       else{
        console.log(false,'condition');
        this.Alert.openSnackBar("All Feilds Are Compulsory","ok")
        return ;
       }
       avr.push(data);
     }
     console.log(avr)
   }
     // -------------------------------------------------------------//
   AddOption(SurveyId,QuestionId)
   {
     console.log(typeof SurveyId,typeof QuestionId)
     let OptionViewModel:CreateOptionModel= new CreateOptionModel();
      let OptionMaster:OptionServerData= new OptionServerData()
      OptionMaster.qM_Id=QuestionId;
      OptionViewModel.sM_id=SurveyId;
      OptionMaster.options="";
      OptionViewModel.OptionMaster=OptionMaster;
    const dialogRef=this.dialog.open(CreateOptionComponent,{data:OptionViewModel});
    dialogRef.afterClosed().subscribe(result => {
      this.SurveyService.GetSurveyQuestions(1).subscribe();
    })
   }
     // -------------------------------------------------------------//
   RemoveOption(SurveyId,QuestionId,OptionId)
   {
     console.log(this.QuestionsFromServerArray[0].controls['OptionMaster'].value)
     console.log(SurveyId,QuestionId,OptionId);
    const dialogRef=this.dialog.open(DeleteOptionComponent,{data:{"QuestionId":QuestionId,"OptionId":OptionId,"SurveyId":SurveyId}});
    dialogRef.afterClosed().subscribe(result => {
       console.log('Delete Option reference closed')
       this.SurveyService.GetSurveyQuestions(1).subscribe(data=>{});
    });
   }
     // -------------------------------------------------------------//
  AddQuestion()
  {
    const dialogRef=this.dialog.open(CreateQuestionComponent);
    dialogRef.afterClosed().subscribe(result => {
       console.log('Add Question reference closed')
    });
  }
  //-----------------------------------------------------------------//
}

export interface QuestionServerData{
optionType:string;
qM_Id:number;
qM_QuestionName:string;
sM_Id:number;
surveyMaster:object;
}
export class OptionServerData{
  public oM_Id:number;
  public questionMaster:Object;
  public qM_Id:number;
  public options:string
}
export class  QuestionServerViewModel{
   public sM_Id:number;
  public questionMaster:QuestionServerData;
  public optionMaster:OptionServerData[];
}