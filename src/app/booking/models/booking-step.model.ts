import { BookingStepKey } from './booking-step-key.enum';

export interface BookingStep {
  key: BookingStepKey;
  label: string;
  showInStepper: boolean;
}
