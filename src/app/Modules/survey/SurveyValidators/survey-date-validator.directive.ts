import { Directive } from '@angular/core';
import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appSurveyDateValidator]'
})
export class SurveyDateValidatorDirective {

  constructor() { }

}
