import { inject, Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { BookingStepKey } from '../models/booking-step-key.enum';
import { BOOKING_STEP_TRANSITIONS } from '../booking-steps.config';

@Injectable({ providedIn: 'root' })
export class BookingStepGuard implements CanActivate {
  private readonly _router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const target = route.routeConfig?.path as BookingStepKey | undefined;
    if (!target) return false;

    if (target === BookingStepKey.Slot) return true;

    const currentPath = this._router.url
      .split('?')[0]
      .replace('/booking/', '') as BookingStepKey;
    const allowedNextSteps = BOOKING_STEP_TRANSITIONS[currentPath] ?? [];

    if (allowedNextSteps.includes(target)) {
      return true;
    }

    this._router.navigateByUrl('/booking/slot', { replaceUrl: true });
    return false;
  }
}
