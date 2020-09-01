import { Router } from '@angular/router';
import { AlertManagerService } from './../../../Helpers/alert-manager.service';
import { Departments, SurveyFromDateAndEndDateValidator } from './../edit-survey/edit-survey.component';
import { SurveyService } from './../Service/survey.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators,FormControl, FormArray, ValidatorFn, ValidationErrors,  } from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { SurveyData } from '../survey/survey.component';
import {  QuestionMaster, OptionMaster, QuestionViewModel, ListQuestionViewModel } from './data-model';


@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})
export class CreateSurveyComponent implements OnInit {
  surveyForm: FormGroup;
  selectedOption = [];
  Loader:Boolean;
  questions: QuestionType[] = [
    { value: 'RadioButton', viewValue: 'RadioButton' },
    { value: 'CheckBox', viewValue: 'CheckBox' },
    { value: 'DropDown', viewValue: 'DropDown' },
    { value: 'List', viewValue: 'List' },
    { value: 'TextBox', viewValue: 'TextBox' }
  ];

  private initForm() {
    console.log('selected option inside init form',this.selectedOption)
    let surveyQuestions = new FormArray([]);
    this.surveyForm = new FormGroup({
      'surveyQuestions': surveyQuestions,
    });

    this.onAddQuestion();

  }
  onAddQuestion() {
    console.log(this.surveyForm);
    const surveyQuestionItem = new FormGroup({
      'questionTitle': new FormControl('', Validators.required),
      'questionType': new FormControl('', Validators.required),
      'questionGroup': new FormGroup({})
    });

    (<FormArray>this.surveyForm.get('surveyQuestions')).push(surveyQuestionItem);

  }
  onRemoveQuestion(index) {

  
    // this.surveyForm.controls.surveyQuestions['controls'][index].controls.questionGroup = new FormGroup({});
    // this.surveyForm.controls.surveyQuestions['controls'][index].controls.questionType = new FormControl({});

    (<FormArray>this.surveyForm.get('surveyQuestions')).removeAt(index);
    this.selectedOption.splice(index,1)
    console.log(this.surveyForm);

  }
  onSeletQuestionType(questionType, index) {
    console.log('Selected option inside onSelectedType',this.selectedOption)
    if(questionType==="TextBox")
    {
      // console.log(this.surveyForm.controls.surveyQuestions['controls'][index].controls.questionGroup.controls=[]);
      (<FormArray>this.surveyForm.controls.surveyQuestions['controls'][index].controls.questionGroup.controls.options).clear()
      return;
    }
    else
    console.log('Valiating',this.surveyForm.controls.surveyQuestions.valid)
      this.addOptionControls(questionType, index)
  }
  addOptionControls(questionType, index) {

    let options = new FormArray([]);

     if(questionType==="TextBox")
     {
         return;
     }
    (this.surveyForm.controls.surveyQuestions['controls'][index].controls.questionGroup).addControl('options', options);

    this.clearFormArray((<FormArray>this.surveyForm.controls.surveyQuestions['controls'][index].controls.questionGroup.controls.options));

    this.addOption(index);
    this.addOption(index);
  }


  private clearFormArray(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }


  addOption(index) {
    const optionGroup = new FormGroup({
      'optionText': new FormControl('', Validators.required),
    });
    console.log(this.surveyForm.controls.surveyQuestions['controls'][index].controls.questionType.value)
    if(this.surveyForm.controls.surveyQuestions['controls'][index].controls.questionType.value!=='TextBox')
    {
      (<FormArray>this.surveyForm.controls.surveyQuestions['controls'][index].controls.questionGroup.controls.options).push(optionGroup);
    }
  }

  removeOption(questionIndex, itemIndex) {
    (<FormArray>this.surveyForm.controls.surveyQuestions['controls'][questionIndex].controls.questionGroup.controls.options).removeAt(itemIndex);
  }

  //-------------------------------------------------//
  postSurvey() {
   console.log(this.surveyForm.valid);
    let formData = this.surveyForm.value;
    // let optionMaster=[];
    let QuestionViewModelList=[];
    let surveyQuestions = formData.surveyQuestions;
    let ListOfQuestionViewModel=new ListQuestionViewModel(QuestionViewModelList)
    console.log('SurveyForm Value',this.surveyForm.value);
    surveyQuestions.forEach((question, index, array) => {
      let OptionType:string;
      let QM_QuestionName:string;
      let optionMaster=[];
      let questionMaster=new QuestionMaster(OptionType,QM_QuestionName);
      let questionViewModel= new QuestionViewModel(questionMaster,optionMaster);
        questionViewModel.QuestionMaster.QM_QuestionName=question.questionTitle;
        questionViewModel.QuestionMaster.OptionType= question.questionType;
      if (question.questionGroup.hasOwnProperty('options')) {
        question.questionGroup.options.forEach(option => {
          let optionItem: OptionMaster = {
            "Options": option.optionText,
          }
          questionViewModel.optionMaster.push(optionItem);
        });
      }
        ListOfQuestionViewModel.QuestionViewModelList.push(questionViewModel);
    });
    console.log(JSON.stringify({"SurveyMaster":{"SM_Name":this.firstFormGroup.get("SurveyName").value ,"FromDate":this.firstFormGroup.get("StartDate").value,"ToDate":this.firstFormGroup.get("EndDate").value,"DM_ID":this.firstFormGroup.get('Department').value},"QuestionViewModelList":ListOfQuestionViewModel.QuestionViewModelList}));
    this.BulkInsertSurvey(JSON.stringify({"SurveyMaster":{"SM_Name":this.firstFormGroup.get("SurveyName").value ,"StartDate":this.firstFormGroup.get("StartDate").value,"EndDate":this.firstFormGroup.get("EndDate").value,"DM_ID":this.firstFormGroup.get('Department').value},"QuestionViewModelList":ListOfQuestionViewModel.QuestionViewModelList}))
  }
  //---------------------------------------------------------------//
  onSubmit() {
    this.postSurvey();
  }
  // Temporary
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  OptionFormGroup:FormGroup;
  todayDate:Date ;
   tomorrow:Date ;
  presentDate:Date=new Date();
  nextDate:Date=this.todayDate;
  constructor(private router:Router,private _formBuilder: FormBuilder,private SurveyService:SurveyService,private Alertmanager:AlertManagerService ) {
   }
   Departments:Departments[];
   SelectedDepartmentId:number;
   SurveyData:SurveyData;
   OptionTypes:string[]=["RadioButton","CheckBox","DropDown","List"];
   SelectedOptionType:string;
   SelectedOptionCount:number=0;
   t=false;
   
  ngOnInit(): void {
    this.todayDate=new Date();
    this.tomorrow= new Date();
    this.todayDate.setMinutes(this.todayDate.getMinutes()+5);
    this.tomorrow.setHours(new Date().getHours()+3);
    this.Loader=false;
    this.initForm();
      this.SurveyService.GetAllDepartments().subscribe(data=>
        {
          this.Departments=data["departments"];
        })
      
    this.firstFormGroup = this._formBuilder.group({
      SurveyName: ['', Validators.required],
      StartDate: [{disabled:true,}, Validators.required],
      EndDate: [{disabled:true}, Validators.required],
      Department:['', Validators.required],
    },{ validator:SurveyCreationDateValidator });
  }
  Change()
  {
    console.log(this.SelectedDepartmentId)
  }
  getValues(myForm) {
    console.log(this.secondFormGroup.value,'values');
  }

  BulkInsertSurvey(SurveyData)
  {
    this.Loader=true;
    console.log('Bulk Insert Called')
    this.SurveyService.SurveyBulkInsert(SurveyData).subscribe(data=>
      { this.Loader=false;
        this.Alertmanager.openSnackBar("Survey Created SucessFully","OK")
        this.router.navigate(['/Home'])
      },err=>
      { this.Loader=false;
        this.Alertmanager.openSnackBar("Something Went Wrong","OK")
      })
  }
}
export interface QuestionType {
  value: string;
  viewValue: string;
}
export interface OptionMasterType {
   Options: string
}
export const CustomDateValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  // const StartDate = control.get('StartDate');
  // const EndDate = control.get('EndDate');
  //   if (new Date(StartDate.value) > new Date(EndDate.value)) {
      
  //     return { MisMatch: true };
  //   } else {
  //     return null
  //   }
  return null;
}
export const SurveyCreationDateValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const StartDate = control.get('StartDate');
  const EndDate = control.get('EndDate');
    if (new Date(StartDate.value) > new Date(EndDate.value)   ) {
      
      return { MisMatch: true,Msg:'StartDate ShouldNot Exceed EndDate' };
    }
    else if(new Date(StartDate.value)<new Date(Date.now()) )
    {
      return { MisMatch: true,Msg:'StartDate Expired You Cant Set' };
    } 
    else if(new Date(EndDate.value)<new Date(Date.now()))
    {
      return { MisMatch: true,Msg:' Date Expired You cant Extend ' };
    }
    else {
      return null
    }
}