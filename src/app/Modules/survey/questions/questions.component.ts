import { AlertManagerService } from './../../../Helpers/alert-manager.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
export interface QuestionData {
   QuestionId:string,
   QuestionName:string,
   OptionMaster:[
     {
       OptionId:string,
       OptionName:string,
     }
   ]
  
}

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  constructor(private Alert:AlertManagerService,private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
  
  }


}

