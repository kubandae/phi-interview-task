import { computed, Injectable, signal } from '@angular/core';
import { BOOKING_STEPS } from '../booking-steps.config';
import { BookingStepKey } from '../models/booking-step-key.enum';

@Injectable({ providedIn: 'root' })
export class BookingStepperService {
  private readonly _activeStep = signal<BookingStepKey | null>(null);

  readonly steps = BOOKING_STEPS.filter((s) => s.showInStepper);
  readonly activeStep = this._activeStep.asReadonly();
  readonly activeStepIndex = computed(() =>
    this._activeStep() !== null
      ? this.steps.findIndex((s) => s.key === this._activeStep())
      : -1
  );

  setActiveStep(step: BookingStepKey): void {
    this._activeStep.set(step);
  }

  resetStep(): void {
    this._activeStep.set(null);
  }
}
