import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BookingStepperService {
  readonly steps = ['Výber termínu', 'Vaše údaje', 'Zhrnutie'];

  private _activeStep = signal<number | null>(null);
  readonly activeStep = this._activeStep.asReadonly();

  setActiveStep(index: number) {
    this._activeStep.set(index);
  }

  resetStep() {
    this._activeStep.set(null);
  }
}
