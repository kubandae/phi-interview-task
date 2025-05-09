import { ValidatorFn, AbstractControl } from '@angular/forms';

export function mustBeAdultPerson(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const raw = (control.value || '').trim();
    const normalized = raw.replace('/', '');

    // 9 or 10 digits after removing slash
    if (!/^\d{9,10}$/.test(normalized))
      return { invalidBirthNumberFormat: true };

    // checking YYMMDD format
    const yy = parseInt(normalized.substring(0, 2), 10);
    let mm = parseInt(normalized.substring(2, 4), 10);
    const dd = parseInt(normalized.substring(4, 6), 10);

    if (isNaN(yy) || isNaN(mm) || isNaN(dd))
      return { invalidBirthNumberFormat: true };

    // female months
    if (mm > 50) mm -= 50;
    if (mm < 1 || mm > 12) return { mustBeAdultPerson: true };

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentYY = currentYear % 100;
    const fullYear = yy <= currentYY ? 2000 + yy : 1900 + yy;

    const birthDate = new Date(fullYear, mm - 1, dd);
    if (
      birthDate.getFullYear() !== fullYear ||
      birthDate.getMonth() !== mm - 1 ||
      birthDate.getDate() !== dd
    )
      return { mustBeAdultPerson: true };

    // 18+ check
    const minDate = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );

    return birthDate <= minDate ? null : { mustBeAdultPerson: true };
  };
}
