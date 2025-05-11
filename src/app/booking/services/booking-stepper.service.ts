import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BookingStepperService {
  private _activeStep = signal<number | null>(null);

  readonly activeStep = this._activeStep.asReadonly();
  readonly steps = ['Výber termínu', 'Vaše údaje', 'Zhrnutie'];

  setActiveStep(index: number): void {
    this._activeStep.set(index);
  }

  resetStep(): void {
    this._activeStep.set(null);
  }
}
