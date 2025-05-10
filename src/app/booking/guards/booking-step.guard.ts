import { inject, Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class BookingStepGuard implements CanActivate {
  private readonly router = inject(Router);

  private readonly stepMap: Record<string, number> = {
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

    const currentPath = this.router.url.split('?')[0].replace('/booking/', '');
    const currentOrder = this.stepMap[currentPath];
    const targetOrder = this.stepMap[target];

    if (
      currentOrder !== undefined &&
      targetOrder !== undefined &&
      targetOrder === currentOrder + 1
    ) {
      return true;
    }

    this.router.navigateByUrl('/booking/slot', { replaceUrl: true });
    return false;
  }
}
