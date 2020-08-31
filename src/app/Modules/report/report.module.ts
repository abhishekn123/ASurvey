import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ReportService } from './Services/report.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserResponseReportComponent } from './user-response-report/user-response-report.component';
import { MaterialModule } from '../../material/material.module';



@NgModule({
  declarations: [UserResponseReportComponent],
  imports: [
    CommonModule,MaterialModule,HttpClientModule,ReactiveFormsModule,FormsModule
  ],providers:[ReportService]
})
export class ReportModule { }
