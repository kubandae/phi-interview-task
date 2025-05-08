import { Route } from '@angular/router';
import { bookingRoutes } from './booking/booking.routes';

export const appRoutes: Route[] = [{
    path: '',
    loadComponent: () => import('./layouts/main-layout/main-layout.component').then(c => c.MainLayoutComponent),
    children: [
        {
            path: '',
            pathMatch: 'full',
            redirectTo: 'booking',
        },
        {
            path: 'booking',
            children: bookingRoutes
        },
    ]
}];
