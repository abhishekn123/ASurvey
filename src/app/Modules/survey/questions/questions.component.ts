import { SurveyMaster } from './../Models/SurveyModel';
import { QuestionViewModel } from './../Models/QuestionModel';
import { CreateQuestionComponent } from './../create-question/create-question.component';
import { CreateOptionModel, OptionMaster } from './../Models/OptionCreateModel';
import { CreateOptionComponent } from './../create-option/create-option.component';
import { DeleteOptionComponent } from './../delete-option/delete-option.component';
import { SurveyService } from './../Service/survey.service';
import { AlertManagerService } from './../../../Helpers/alert-manager.service';
import { Component, OnInit, Inject, AfterViewChecked } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { QuestionMaster } from '../Models/QuestionModel';
import { DeleteQuestionComponent } from '../delete-question/delete-question.component';
import { QuestionType } from '../create-survey/create-survey.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  constructor(private location:Location,private route:ActivatedRoute,public dialog: MatDialog,private Alert:AlertManagerService,private _formBuilder: FormBuilder,private SurveyService:SurveyService) { }
  QuestionsFromServerArray=[];
  QuestionGroup:FormGroup[]=[]
  QuestionsFromServer:QuestionServerViewModel[];
  IsUpdateDisabled:Boolean;
  surveyMaster:SurveyMaster;
  surveyId:number;
  Loading:Boolean;
  questions: QuestionType[] = [
    { value: 'RadioButton', viewValue: 'RadioButton' },
    { value: 'CheckBox', viewValue: 'CheckBox' },
    { value: 'DropDown', viewValue: 'DropDown' },
    { value: 'List', viewValue: 'List' },
  ];
  GetSurveyQuestions(survey:SurveyMaster)
  {
    this.Loading=true;
    this.SurveyService.GetSurveyQuestions(survey).subscribe(data=>
      {
        console.log('data from The Server',data);
        this.QuestionsFromServer=<QuestionServerViewModel[]>data;
        this.QuestionsFromServerArray=[];
        console.log('Questions From Server',this.QuestionsFromServer)
        this.initServerDate()
        this.Loading=false;
      },err=>
      {
        console.log(err);
        this.Loading=false
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
      'OptionType':new FormControl(question.questionMaster.optionType,[Validators.required]),
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
    this.route
    .queryParams
    .subscribe(params => {
    this.surveyId = params['Survey'] || 0;
    this.surveyMaster=new SurveyMaster( parseInt(params['Survey']),'','','',null,1)
    console.log('Param',this.surveyMaster);
    this.GetSurveyQuestions(this.surveyMaster);
    });
      
  }
    // -------------------------------------------------------------//
   RemoveQuestion(QuestionIndex)
   {
     let optionMaster:OptionMaster[]=[];
     console.log(    this.QuestionsFromServerArray[QuestionIndex].get('QuestionName').value)
    //  this.QuestionsFromServerArray.splice(QuestionIndex,1);
    let questionMaster:QuestionMaster= new QuestionMaster(
    this.QuestionsFromServerArray[QuestionIndex].get('QuestionId').value, 
    this.QuestionsFromServerArray[QuestionIndex].get('QuestionName').value,
    this.QuestionsFromServerArray[QuestionIndex].get('OptionType').value,
    this.QuestionsFromServerArray[QuestionIndex].get('SurveId').value
    );
    for(let option of this.QuestionsFromServerArray[QuestionIndex].controls['OptionMaster'].controls)
    {
       optionMaster.push(option.value);
    }
    let questionViewModel:QuestionViewModel=new QuestionViewModel(questionMaster,optionMaster,this.surveyMaster.SM_Id);
    const dialogRef=this.dialog.open(DeleteQuestionComponent,{data:questionViewModel});
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('result is',result)
        if(result)
        {
          this.GetSurveyQuestions(this.surveyMaster);
        }
    });

   }
     // -------------------------------------------------------------//
   UpdateQuestion(questionIndex)
   {
    let questionMaster:QuestionMaster= new QuestionMaster(
      this.QuestionsFromServerArray[questionIndex].get('QuestionId').value, 
      this.QuestionsFromServerArray[questionIndex].get('QuestionName').value,
      this.QuestionsFromServerArray[questionIndex].get('OptionType').value,
      this.QuestionsFromServerArray[questionIndex].get('SurveId').value
      );
      let optionMaster:OptionMaster[]=[];
     if(this.QuestionsFromServerArray[questionIndex].controls['QuestionName'].valid)
     {
       for(var option of this.QuestionsFromServerArray[questionIndex].controls['OptionMaster'].controls )
       {
         if(option.invalid)
         {
           this.Alert.openSnackBar("All Feild Are Compulsory","Ok");
           break;
         }
         if(option.valid)
         {
          optionMaster.push(option.value);
         }
       }
      }
      console.log()
      if(this.QuestionsFromServerArray[questionIndex].controls['OptionMaster'].controls.length===optionMaster.length)
      {
        let questionViewModel:QuestionViewModel=new QuestionViewModel(questionMaster,optionMaster,this.surveyMaster.SM_Id);
        this.SurveyService.UpdateQuestion(questionViewModel).subscribe(data=>
          {
           this.Alert.openSnackBar("Updated Successfully","Ok")
          },err=>
          {
            this.Alert.openSnackBar("Something Went Wrong","Ok")
          })
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
   AddOption(SurveyId:number,QuestionId:number,questionIndex:number)
   {
     if(this.QuestionsFromServerArray[questionIndex].get('OptionType').value==='TextBox')
     {
        this.Alert.openSnackBar("Question Type TextBox Dont Have Options","ok");
        return;
     }
     else
     console.log(typeof SurveyId,typeof QuestionId)
     let OptionViewModel:CreateOptionModel= new CreateOptionModel();
      let OptionMaster:OptionServerData= new OptionServerData()
      OptionMaster.qM_Id=QuestionId;
      OptionViewModel.sM_id=SurveyId;
      OptionMaster.options="";
      OptionViewModel.OptionMaster=OptionMaster;
    const dialogRef=this.dialog.open(CreateOptionComponent,{data:OptionViewModel});
    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {
        this.GetSurveyQuestions(this.surveyMaster);
      }
    })
   }
     // -------------------------------------------------------------//
   RemoveOption(SurveyId:number,QuestionId:number,OptionId:number)
   {
     let optionMaster:OptionMaster[]=[];
     optionMaster.push(new OptionMaster(QuestionId,'',OptionId))
     console.log(this.QuestionsFromServerArray[0].controls['OptionMaster'].value)
     console.log(SurveyId,QuestionId,OptionId);
    const dialogRef=this.dialog.open(DeleteOptionComponent,{data:optionMaster});
    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {
        this.GetSurveyQuestions(this.surveyMaster);
      }
    });
   }
     // -------------------------------------------------------------//
  AddQuestion()
  {
    const dialogRef=this.dialog.open(CreateQuestionComponent,{data:this.surveyMaster.SM_Id});
    dialogRef.afterClosed().subscribe(result => {

        this.GetSurveyQuestions(this.surveyMaster);
      
    });
  }
  //----------------------------------------------------------------//
  onSeletQuestionType(questionIndex:number) {
    if( this.QuestionsFromServerArray[questionIndex].get('OptionType').value==='TextBox' && this.QuestionsFromServerArray[questionIndex].controls['OptionMaster'].controls.length>0)
    {
      let optionMaster:OptionMaster[]=[];
      for(var option of this.QuestionsFromServerArray[questionIndex].controls['OptionMaster'].controls )
       {
         console.log(option.controls.qM_Id.value)
            optionMaster.push(new OptionMaster(option.controls.qM_Id.value,option.controls.options.value,option.controls.oM_Id.value));
       }
       console.log("optionMaster Array",optionMaster);
      const dialogRef=this.dialog.open(DeleteOptionComponent,{data:optionMaster});
      dialogRef.afterClosed().subscribe(result => {
        if(result)
        {
          this.UpdateQuestion(questionIndex);
        }
        else{
          console.log(this.QuestionsFromServerArray[questionIndex].get('OptionType').value)
          this.QuestionsFromServerArray[questionIndex].get('OptionType').value="RadioButton"
          this.UpdateQuestion(questionIndex);
        }
      });
    }
      // this.addOptionControls(questionType, index)
  }
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