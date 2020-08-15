import { CreateOptionModel } from './../Models/OptionCreateModel';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertManagerService } from 'src/app/Helpers/alert-manager.service';
import { SurveyService } from '../Service/survey.service';
import { OptionServerData } from '../questions/questions.component';

@Component({
  selector: 'app-create-option',
  templateUrl: './create-option.component.html',
  styleUrls: ['./create-option.component.css']
})
export class CreateOptionComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:CreateOptionModel,private SurveyService:SurveyService,private Alert:AlertManagerService,private dialogRef: MatDialogRef<CreateOptionComponent>) { }
  Option:FormGroup = new FormGroup({})
  ngOnInit(): void {
    this.Option.registerControl("OptionValue",new FormControl('',Validators.required));
  }
  CreateOption()
  {
    this.dialogRef.close(true);
    console.log(this.data)
    this.data.OptionMaster.options=this.Option.get('OptionValue').value;
    this.SurveyService.CreateOption(this.data).subscribe(data=>
      {
        this.Alert.openSnackBar("OptionCreated Sucessfully","ok");
      },err=>
      {
        this.Alert.openSnackBar("Something WentWrong","OK");
      })
    console.log(this.Option.get('OptionValue').value,this.data);
  }

}
