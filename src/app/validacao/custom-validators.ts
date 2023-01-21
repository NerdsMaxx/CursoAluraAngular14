import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static lowerCase(control: AbstractControl): ValidationErrors | null {
    const str = control.value as string;

    return str !== str?.toLowerCase() ? { ['lowerCase']: true } : null;
  }
}
