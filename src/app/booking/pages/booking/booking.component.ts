import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnDestroy,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationStart, Router, RouterModule } from '@angular/router';
import { BookingStepperHeaderComponent } from '../../components/booking-stepper-header/booking-stepper-header.component';
import { BookingStepperService } from '../../services/booking-stepper.service';
import { TopbarSlotService } from 'src/app/services/top-bar-slot.service';

@Component({
  selector: 'app-booking',
  imports: [CommonModule, RouterModule, BookingStepperHeaderComponent],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingComponent implements OnDestroy {
  @ViewChild('stepperHeader', { static: true })
  stepperHeader!: TemplateRef<BookingStepperHeaderComponent>;

  private router = inject(Router);
  private topBarSlotService = inject(TopbarSlotService);
  private bookingStepperService = inject(BookingStepperService);

  constructor() {
    this.router.events.subscribe((event) => {
      if (
        event instanceof NavigationStart &&
        event.navigationTrigger === 'popstate'
      ) {
        const goingBackTo = event.url;

        if (this.isInvalidBackTarget(goingBackTo)) {
          this.router.navigateByUrl('/', { replaceUrl: true });
        }
      }
    });

    effect(() => {
      const step = this.bookingStepperService.activeStep();
      const template = this.topBarSlotService.template();

      if (step !== null && !template && this.stepperHeader) {
        this.topBarSlotService.set(this.stepperHeader);
      }
    });
  }

  ngOnDestroy(): void {
    this.bookingStepperService.resetStep();
    this.topBarSlotService.clear();
  }

  private isInvalidBackTarget(url: string): boolean {
    const step = url.replace('/booking/', '').split('?')[0].replace('/', '');
    return ['personal-info', 'summary', 'thank-you'].includes(step);
  }
}
