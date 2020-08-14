import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertManagerService } from 'src/app/Helpers/alert-manager.service';
import { SurveyService } from '../Service/survey.service';

@Component({
  selector: 'app-delete-option',
  templateUrl: './delete-option.component.html',
  styleUrls: ['./delete-option.component.css']
})
export class DeleteOptionComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data,private SurveyService:SurveyService,private Alert:AlertManagerService,private dialogRef: MatDialogRef<DeleteOptionComponent>) { }

  ngOnInit(): void {
  }
  DeleteOption()
  {
    
    this.SurveyService.RemoveOption({"OM_Id":this.data.OptionId,"QM_Id":this.data.QuestionId,"QuestionMaster":null,"Options":""}).subscribe(data=>
      {
        console.log(data);
      },err=>
      {
        console.log(err);
      })
  }
  closeDialog()
  {
  
  }

}
