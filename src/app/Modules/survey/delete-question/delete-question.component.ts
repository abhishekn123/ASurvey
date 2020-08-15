import { QuestionViewModel } from './../Models/QuestionModel';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertManagerService } from 'src/app/Helpers/alert-manager.service';
import { SurveyService } from '../Service/survey.service';

@Component({
  selector: 'app-delete-question',
  templateUrl: './delete-question.component.html',
  styleUrls: ['./delete-question.component.css']
})
export class DeleteQuestionComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:QuestionViewModel,private SurveyService:SurveyService,private Alert:AlertManagerService,private dialogRef: MatDialogRef<DeleteQuestionComponent>) { }

  ngOnInit(): void {
  }
  DeleteQuestion()
  {
    console.log('called',this.data);
    this.dialogRef.close(true);
   this.SurveyService.RemoveQuestion(this.data).subscribe(data=>
    {
      this.Alert.openSnackBar("Deleted SuccessFully","Ok")
    },err=>
    {
      this.Alert.openSnackBar("Something Went Wrong","Ok")
    })
  }
  closeDialog():void
  {
    this.dialogRef.close(false);
  }
}
