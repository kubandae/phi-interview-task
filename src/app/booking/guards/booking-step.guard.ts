import { inject, Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class BookingStepGuard implements CanActivate {
  private readonly _router = inject(Router);
  private readonly _stepMap: Record<string, number> = {
    slot: 0,
    'personal-info': 1,
    summary: 2,
    'thank-you': 3,
    error: 3,
  };

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const target = route.routeConfig?.path;
    if (!target) return false;

    if (target === 'slot') return true;

    const currentPath = this._router.url.split('?')[0].replace('/booking/', '');
    const currentOrder = this._stepMap[currentPath];
    const targetOrder = this._stepMap[target];

    if (
      currentOrder !== undefined &&
      targetOrder !== undefined &&
      targetOrder === currentOrder + 1
    ) {
      return true;
    }

    this._router.navigateByUrl('/booking/slot', { replaceUrl: true });
    return false;
  }
}
