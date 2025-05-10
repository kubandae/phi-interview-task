import {
  ChangeDetectionStrategy,
  Component,
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

@Component({
  selector: 'app-booking-summary',
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

  private readonly footerService = inject(FooterService);
  private readonly bookingStepperService = inject(BookingStepperService);
  private readonly bookingAppointmentService = inject(
    BookingAppointmentService
  );
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  personalInfo = this.bookingAppointmentService.personalInfo;
  appointmentSummary = this.bookingAppointmentService.appointmentSummary;

  private readonly formBuilder = inject(FormBuilder);

  readonly form = this.formBuilder.group({
    gdpr: [false, Validators.requiredTrue],
    terms: [false, Validators.requiredTrue],
    marketing: [false],
  });

  ngOnInit(): void {
    this.bookingStepperService.setActiveStep(2);
    this.footerService.set(this.footerContent);
  }

  ngOnDestroy(): void {
    this.footerService.clear();
  }

  completeBookingAndMoveNext(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!this.bookingAppointmentService.selectedTimeSlot()?.id) {
      throw new Error('Missing time slot information.');
    }

    const completeBookingDto: CompleteBookingDto = {
      id: this.bookingAppointmentService.selectedTimeSlot()!.id,
    };

    this.bookingAppointmentService
      .completeBooking(completeBookingDto)
      .subscribe((result) => {
        if (result.success) {
          this.router.navigate(['../thank-you'], {
            relativeTo: this.activatedRoute,
          });
        } else {
          this.bookingAppointmentService.resetBooking();
          this.router.navigate(['../error'], {
            relativeTo: this.activatedRoute,
          });
        }
      });
  }
}
