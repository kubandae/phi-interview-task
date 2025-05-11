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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-booking',
  standalone: true,
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

  private readonly _router = inject(Router);
  private readonly _topBarSlotService = inject(TopbarSlotService);
  private readonly _footerService = inject(FooterService);
  private readonly _bookingStepperService = inject(BookingStepperService);

  constructor() {
    this._router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (
        event instanceof NavigationStart &&
        event.navigationTrigger === 'popstate'
      ) {
        const goingBackTo = event.url;

        if (this.isInvalidBackTarget(goingBackTo)) {
          this._router.navigateByUrl('/', { replaceUrl: true });
        }
      }
    });

    effect(() => {
      const step = this._bookingStepperService.activeStep();
      const middleContentTemplate =
        this._topBarSlotService.middleContentTemplate();
      const rightContentTemplate =
        this._topBarSlotService.rightContentTemplate();

      if (step !== null && !middleContentTemplate && this.stepperHeader) {
        this._topBarSlotService.setMiddleContent(this.stepperHeader);
      }
      if (step !== null && !rightContentTemplate && this.bookingCancelButton) {
        this._topBarSlotService.setRightContent(this.bookingCancelButton);
      }
    });
  }

  ngOnDestroy(): void {
    this._bookingStepperService.resetStep();
    this._topBarSlotService.clearAllContent();
    this._footerService.clear();
  }

  private isInvalidBackTarget(url: string): boolean {
    const step = url.replace('/booking/', '').split('?')[0].replace('/', '');
    return ['personal-info', 'summary', 'thank-you'].includes(step);
  }
}
