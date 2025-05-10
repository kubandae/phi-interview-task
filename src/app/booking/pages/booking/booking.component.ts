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
import { BookingCancelButtonComponent } from '../../components/booking-cancel-button/booking-cancel-button.component';
import { FooterService } from 'src/app/services/footer.service';

@Component({
  selector: 'app-booking',
  imports: [
    CommonModule,
    RouterModule,
    BookingStepperHeaderComponent,
    BookingCancelButtonComponent,
  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingComponent implements OnDestroy {
  @ViewChild('stepperHeader', { static: true })
  stepperHeader!: TemplateRef<BookingStepperHeaderComponent>;

  @ViewChild('bookingCancelButton', { static: true })
  bookingCancelButton!: TemplateRef<BookingCancelButtonComponent>;

  private readonly router = inject(Router);
  private readonly topBarSlotService = inject(TopbarSlotService);
  private readonly footerService = inject(FooterService);
  private readonly bookingStepperService = inject(BookingStepperService);

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
      const middleContentTemplate =
        this.topBarSlotService.middleContentTemplate();
      const rightContentTemplate =
        this.topBarSlotService.rightContentTemplate();

      if (step !== null && !middleContentTemplate && this.stepperHeader) {
        this.topBarSlotService.setMiddleContent(this.stepperHeader);
      }
      if (step !== null && !rightContentTemplate && this.bookingCancelButton) {
        this.topBarSlotService.setRightContent(this.bookingCancelButton);
      }
    });
  }

  ngOnDestroy(): void {
    this.bookingStepperService.resetStep();
    this.topBarSlotService.clearAllContent();
    this.footerService.clear();
  }

  private isInvalidBackTarget(url: string): boolean {
    const step = url.replace('/booking/', '').split('?')[0].replace('/', '');
    return ['personal-info', 'summary', 'thank-you'].includes(step);
  }
}
