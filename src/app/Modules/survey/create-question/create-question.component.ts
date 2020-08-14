import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertManagerService } from 'src/app/Helpers/alert-manager.service';
import { SurveyService } from '../Service/survey.service';
import { QuestionType } from '../create-survey/create-survey.component';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data,private SurveyService:SurveyService,private Alert:AlertManagerService,private dialogRef: MatDialogRef<CreateQuestionComponent>) { }
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
      "OptionMaster":new FormArray([
        new FormControl('',[Validators.required]),
        new FormControl('',[Validators.required])
      ],Validators.required)
    },[Validators.required]);
  }
  onSeletQuestionType(questionType, index) {

      
  }
  addOption()
  {
     console.log(this.Question.controls['OptionMaster'].push(new FormControl('',Validators.required)));
  }
}
