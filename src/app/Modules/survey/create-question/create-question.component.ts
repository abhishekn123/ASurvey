import { QuestionViewModel } from './../Models/QuestionModel';
import { OptionMaster } from '../Models/OptionCreateModel';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertManagerService } from 'src/app/Helpers/alert-manager.service';
import { SurveyService } from '../Service/survey.service';
import { QuestionType } from '../create-survey/create-survey.component';
import { QuestionMaster } from '../../survey/Models/QuestionModel';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:number,private SurveyService:SurveyService,private Alert:AlertManagerService,private dialogRef: MatDialogRef<CreateQuestionComponent>) { }
  Question:FormGroup;
  questions: QuestionType[] = [
    { value: 'RadioButton', viewValue: 'RadioButton' },
    { value: 'CheckBox', viewValue: 'CheckBox' },
    { value: 'DropDown', viewValue: 'DropDown' },
    { value: 'List', viewValue: 'List' },
    { value: 'TextBox', viewValue: 'TextBox' }
  ];
  ngOnInit(): void {
    this.Question= new FormGroup({
      'QuestionName':new FormControl('',[Validators.required]),
      "QuestionType":new FormControl('',[Validators.required]),
      "OptionMaster":new FormArray([],[Validators.required])
    },[Validators.required]);
  }
  onSeletQuestionType(questionType, index) {

      
  }
  addOption():void
  {
     let options =<FormArray>(this.Question.controls.OptionMaster);
     options.push(new FormControl('',Validators.required));
  }

  CreateQuestion():void
  {
    let questionMaster:QuestionMaster=new QuestionMaster(0,this.Question.controls['QuestionName'].value,this.Question.controls['QuestionType'].value,1);
    let optionMaster:OptionMaster[]=[];
    let questionViewModel:QuestionViewModel;
    console.log(  this.Question.get('OptionMaster').value.length)
    if(this.Question.controls['QuestionType'].value!=='TextBox' && this.Question.get('OptionMaster').value.length<2 )
    {
      this.Alert.openSnackBar('Atleast Two Option Needed','ok')
      return;
    }
    else
    this.dialogRef.close(true);
    for(let option of this.Question.get('OptionMaster')['controls'])
    {
        optionMaster.push(new OptionMaster(0,option.value))
    }
     questionViewModel= new QuestionViewModel(questionMaster,optionMaster,1);
    this.SurveyService.CreateQuestion(questionViewModel).subscribe(data=>
      {
        this.Alert.openSnackBar('QuestionCreated Succesfully','ok')
      },err=>
      {
        this.Alert.openSnackBar('Something Went Wrong','ok')
      })
  }
}
