import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly _snackBar = inject(MatSnackBar);

  showError(message: string): void {
    this._snackBar.open(message, 'Zavrieť', {
      duration: 5000,
    });
  }
}
