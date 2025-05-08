import { Route } from '@angular/router';
import { BookingStepGuard } from './guards/booking-step.guard';

export const bookingRoutes: Route[] = [
    {
        path: '',
        loadComponent: () =>
            import('./pages/booking/booking.component').then((c) => c.BookingComponent),
        children: [
            {
                path: '',
                redirectTo: 'slot',
                pathMatch: 'full',
            },
            {
                path: 'slot',
                loadComponent: () =>
                    import('./pages/booking-slot/booking-slot.component').then(
                        (c) => c.BookingSlotComponent
                    ),
            },
            {
                path: 'personal-info',
                canActivate: [BookingStepGuard],
                loadComponent: () =>
                    import('./pages/booking-personal-info/booking-personal-info.component').then(
                        (c) => c.BookingPersonalInfoComponent
                    ),
            },
            {
                path: 'summary',
                canActivate: [BookingStepGuard],
                loadComponent: () =>
                    import('./pages/booking-summary/booking-summary.component').then(
                        (c) => c.BookingSummaryComponent
                    ),
            },
            {
                path: 'thank-you',
                canActivate: [BookingStepGuard],
                loadComponent: () =>
                    import('./pages/booking-thank-you/booking-thank-you.component').then(
                        (c) => c.BookingThankYouComponent
                    ),
            },
        ],
    },
];