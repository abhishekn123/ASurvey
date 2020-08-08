import { AlertManagerService } from './../../../Helpers/alert-manager.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { OptionMaster } from '../create-survey/data-model';
export interface QuestionData {
   QuestionId:string,
   QuestionName:string,
   OptionMaster:OptionData[],
}
export interface OptionData
{
  OptionId:string,OptionName:string
}

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  constructor(private Alert:AlertManagerService,private _formBuilder: FormBuilder) { }
  Questions:QuestionData[];
  QuestionGroup:FormGroup[]=[]
  RemoveOption(QuestionIndex,OptionIndex)
  {
  console.log(this.QuestionGroup[QuestionIndex].get('OptionMaster')['controls'].splice(OptionIndex,1))
  // this.QuestionGroup[QuestionIndex].get('OptionAmster').value=this.QuestionGroup[QuestionIndex].get('OptionMaster').value;
  }
  ngOnInit(): void {
    this.Questions=[ {
      'QuestionId':'1',
      'QuestionName':'What is your Age',
        'OptionMaster':[
          {'OptionId':'1','OptionName':'21'},
          {'OptionId':'2','OptionName':'22'},
          {'OptionId':'3','OptionName':'25'},
          {'OptionId':'4','OptionName':'32'}
    ] 
      },{
        'QuestionId':'2',
        'QuestionName':'What is your name',
          'OptionMaster':[
            {'OptionId':'1','OptionName':'X'},
            {'OptionId':'2','OptionName':'Y'},
            {'OptionId':'3','OptionName':'Z'},
      ] 
        }]
  }
   StartAssigning()
   { let que:FormGroup;


     console.log('Sarted Assigning')
     this.Questions.map((question,index)=>
      {  
        let OptionArray=new FormArray([]);
        que= this._formBuilder.group({
          'QuestionId':new FormControl(question.QuestionId,Validators.required),
          'QuestionName':new FormControl(question.QuestionName,Validators.required),
          // 'OptionMaster':new FormGroup({})
        });
        question.OptionMaster.map((option,index)=>
        {
          let OptionMaster= new FormControl(option,Validators.required);
           OptionArray.push(OptionMaster);
        })
        que.registerControl("OptionMaster",OptionArray);
        this.QuestionGroup.push(que);
      })
     console.log('Question Group',this.QuestionGroup);
   }
   RemoveQuestion(QuestionIndex)
   {
     console.log(QuestionIndex);
     this.QuestionGroup.splice(QuestionIndex,1);
   }
   UpdateQuestion(questionIndex)
   {
let data =  {
       QuestionName:this.QuestionGroup[questionIndex].get('QuestionName').value,
       OptionMaster:[...this.QuestionGroup[questionIndex].get('OptionMaster').value]
     }
     console.log('updted data',data)
   }

   BulkUpdate()
   {
     for(var question of this.QuestionGroup)
     {
       console.log(question.value)
     }
   }
}

