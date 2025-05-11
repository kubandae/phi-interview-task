import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { BookingStepperService } from '../../services/booking-stepper.service';
import { BookingAppointmentService } from '../../services/booking-appointment.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { CompleteBookingDto } from '../../models/dtos/complete-booking-dto.model';
import { BookingStepHeaderComponent } from '../../components/booking-step-header/booking-step-header.component';
import { MatIconModule } from '@angular/material/icon';
import { BookingSummaryFieldComponent } from '../../components/booking-summary-field/booking-summary-field.component';
import { FooterService } from 'src/app/services/footer.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-booking-summary',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    BookingStepHeaderComponent,
    BookingSummaryFieldComponent,
    MatButtonModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './booking-summary.component.html',
  styleUrl: './booking-summary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingSummaryComponent implements OnInit, OnDestroy {
  @ViewChild('footerContent', { static: true })
  footerContent!: TemplateRef<unknown>;

  private readonly _footerService = inject(FooterService);
  private readonly _bookingStepperService = inject(BookingStepperService);
  private readonly _bookingAppointmentService = inject(
    BookingAppointmentService
  );
  private readonly _router = inject(Router);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _destroyRef = inject(DestroyRef);

  readonly form = this._formBuilder.group({
    gdpr: [false, Validators.requiredTrue],
    terms: [false, Validators.requiredTrue],
    marketing: [false],
  });

  personalInfo = this._bookingAppointmentService.personalInfo;
  appointmentSummary = this._bookingAppointmentService.appointmentSummary;

  ngOnInit(): void {
    this._bookingStepperService.setActiveStep(2);
    this._footerService.set(this.footerContent);
  }

  ngOnDestroy(): void {
    this._footerService.clear();
  }

  completeBookingAndMoveNext(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!this._bookingAppointmentService.selectedTimeSlot()?.id) {
      throw new Error('Missing time slot information.');
    }

    const completeBookingDto: CompleteBookingDto = {
      id: this._bookingAppointmentService.selectedTimeSlot()!.id,
    };

    this._bookingAppointmentService
      .completeBooking(completeBookingDto)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((result) => {
        if (result.success) {
          this._router.navigate(['../thank-you'], {
            relativeTo: this._activatedRoute,
          });
        } else {
          this._bookingAppointmentService.resetBooking();
          this._router.navigate(['../error'], {
            relativeTo: this._activatedRoute,
          });
        }
      });
  }
}
