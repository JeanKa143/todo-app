import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function differentValueAs(otherControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const otherControl = control.parent?.get(otherControlName);
    if (!otherControl) return null;

    if (otherControl.value !== control.value) {
      return { differentValueAs: { value: control.value } };
    }

    return null;
  };
}
