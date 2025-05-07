import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class BookingStepGuard implements CanActivate {
  private readonly stepOrder = [
    'slot',
    'personal-info',
    'summary',
    'thank-you'
  ];

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const target = route.routeConfig?.path;
    if (!target) return false;

    if (target === 'slot') return true;

    const currentUrl = this.router.url.split('?')[0].replace('/booking/', '');
    const targetIndex = this.stepOrder.indexOf(target);
    const prevStep = this.stepOrder[targetIndex - 1];

    if (currentUrl === prevStep) return true;

    this.router.navigateByUrl('/booking/slot', { replaceUrl: true });
    return false;
  }
}