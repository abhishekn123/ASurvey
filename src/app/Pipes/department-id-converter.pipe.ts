import { Departments } from './../Modules/survey/edit-survey/edit-survey.component';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'departmentIdConverter'
})
export class DepartmentIdConverterPipe implements PipeTransform {

  transform(DepartmentId,DeptList): string {
       
    console.log('pipe Department ID',DepartmentId,'pipe Departments',DeptList)
       for(var dept of DeptList)
       {
           if(dept.dM_Id===DepartmentId)
           {
             return dept.dM_Name;
           }
       }
       return null;

  }

}
