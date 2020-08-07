import { Pipe, PipeTransform, OnInit } from '@angular/core';
import { SurveyService } from '../Modules/survey/Service/survey.service';
import { Departments } from '../Modules/survey/edit-survey/edit-survey.component';

@Pipe({
  name: 'departmentIdConverter',
  pure: false
})
export class DepartmentIdConverterPipe implements PipeTransform,OnInit {

  constructor(private DepartmentService:SurveyService){ }
  deptList:Departments[];
  ngOnInit(): void {
  }
  transform(DepartmentId): string {
    
    return this.DepartmentService.Departments.find(exp=>exp.dM_Id===DepartmentId).dM_Name

  }

}
