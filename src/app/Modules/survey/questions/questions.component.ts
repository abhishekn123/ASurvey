import { AlertManagerService } from './../../../Helpers/alert-manager.service';
import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
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

  constructor(public dialog: MatDialog,private Alert:AlertManagerService) { }

  ngOnInit(): void {
  }
  openDialog():void
  {
    const dialogRef = this.dialog.open(QuestionModal, {
    
    });
  }

}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'QuestionModal.html',
})
export class  QuestionModal{

  constructor(
    public dialogRef: MatDialogRef<QuestionModal>,
    @Inject(MAT_DIALOG_DATA) public data: QuestionData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
