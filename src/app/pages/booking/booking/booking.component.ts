import { Component, effect, inject, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationStart, Router, RouterModule } from '@angular/router';
import { BookingStepperHeaderComponent } from 'src/app/components/booking-stepper-header/booking-stepper-header.component';
import { TopbarSlotService } from 'src/app/services/top-bar-slot.service';
import { BookingStepperService } from 'src/app/services/booking-stepper-service';

@Component({
  selector: 'app-booking',
  imports: [CommonModule, RouterModule, BookingStepperHeaderComponent],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
})
export class BookingComponent {

  @ViewChild('stepperHeader', { static: true }) stepperHeader!: TemplateRef<BookingStepperHeaderComponent>;

  private topbarSlotService = inject(TopbarSlotService);
  private bookingStepperService = inject(BookingStepperService);

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart && event.navigationTrigger === 'popstate') {
        const goingBackTo = event.url;

        if (this.isInvalidBackTarget(goingBackTo)) {
          this.router.navigateByUrl('/', { replaceUrl: true });
        }
      }
    });

    effect(() => {
      const step = this.bookingStepperService.activeStep();
      const template = this.topbarSlotService.template();

      if (step !== null && !template && this.stepperHeader) {
        this.topbarSlotService.set(this.stepperHeader);
      }
    });
  }

  private isInvalidBackTarget(url: string): boolean {
    const step = url.replace('/booking/', '').split('?')[0].replace('/', '');
    return ['personal-info', 'summary', 'thank-you'].includes(step);
  }
}
