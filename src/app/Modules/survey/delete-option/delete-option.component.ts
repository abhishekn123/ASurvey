import { OptionMaster } from './../Models/OptionCreateModel';
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

  constructor(@Inject(MAT_DIALOG_DATA) public data:OptionMaster[],private SurveyService:SurveyService,private Alert:AlertManagerService,private dialogRef: MatDialogRef<DeleteOptionComponent>) { }

  ngOnInit(): void {
  }
  DeleteOption()
  {
    console.log(this.data);
    this.dialogRef.close(true); 
    this.SurveyService.RemoveOption(this.data).subscribe(data=>
      {
        this.Alert.openSnackBar('Deleted Successfully','ok');
      },err=>
      {
        this.Alert.openSnackBar('Something Went Wrong','ok');
      })
  }
  closeDialog()
  {
    this.dialogRef.close(false);
  }

}
