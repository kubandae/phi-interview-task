import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private snackBar = inject(MatSnackBar);

  showError(message: string): void {
    this.snackBar.open(message, 'Zavrieť', {
      duration: 5000,
    });
  }
}
