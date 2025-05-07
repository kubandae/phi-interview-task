import { Route } from '@angular/router';

export const bookingRoutes: Route[] = [
    {
        path: '',
        loadComponent: () =>
            import('./booking/booking.component').then((c) => c.BookingComponent),
        children: [
            {
                path: '',
                redirectTo: 'slot',
                pathMatch: 'full',
            },
            {
                path: 'slot',
                loadComponent: () =>
                    import('./booking-slot/booking-slot.component').then(
                        (c) => c.BookingSlotComponent
                    ),
            },
            {
                path: 'personal-info',
                loadComponent: () =>
                    import('./booking-personal-info/booking-personal-info.component').then(
                        (c) => c.BookingPersonalInfoComponent
                    ),
            },
            {
                path: 'summary',
                loadComponent: () =>
                    import('./booking-summary/booking-summary.component').then(
                        (c) => c.BookingSummaryComponent
                    ),
            },
            {
                path: 'thank-you',
                loadComponent: () =>
                    import('./booking-thank-you/booking-thank-you.component').then(
                        (c) => c.BookingThankYouComponent
                    ),
            },
        ],
    },
];