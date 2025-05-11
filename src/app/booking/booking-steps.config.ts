import { BookingStepKey } from './models/booking-step-key.enum';
import { BookingStep } from './models/booking-step.model';

export const BOOKING_STEPS: BookingStep[] = [
  { key: BookingStepKey.Slot, label: 'Výber termínu', showInStepper: true },
  {
    key: BookingStepKey.PersonalInfo,
    label: 'Vaše údaje',
    showInStepper: true,
  },
  { key: BookingStepKey.Summary, label: 'Zhrnutie', showInStepper: true },
  { key: BookingStepKey.ThankYou, label: '', showInStepper: false },
  { key: BookingStepKey.Error, label: '', showInStepper: false },
];

export const BOOKING_STEP_TRANSITIONS: Record<
  BookingStepKey,
  BookingStepKey[]
> = {
  [BookingStepKey.Slot]: [BookingStepKey.PersonalInfo],
  [BookingStepKey.PersonalInfo]: [BookingStepKey.Summary],
  [BookingStepKey.Summary]: [BookingStepKey.ThankYou, BookingStepKey.Error],
  [BookingStepKey.ThankYou]: [],
  [BookingStepKey.Error]: [],
};
