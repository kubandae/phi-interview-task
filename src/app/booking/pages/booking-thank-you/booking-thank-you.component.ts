import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarSlotService } from 'src/app/services/top-bar-slot.service';
import { BookingStepperService } from '../../services/booking-stepper.service';
import { MatButtonModule } from '@angular/material/button';
import { BookingAppointmentService } from '../../services/booking-appointment.service';

@Component({
  selector: 'app-booking-thank-you',
  imports: [CommonModule, MatButtonModule],
  templateUrl: './booking-thank-you.component.html',
  styleUrl: './booking-thank-you.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingThankYouComponent implements OnInit {
  readonly topBarSlotService = inject(TopbarSlotService);
  readonly bookingStepperService = inject(BookingStepperService);
  readonly bookingAppointmentService = inject(BookingAppointmentService);
  readonly firstName = this.bookingAppointmentService.personalInfo()?.firstName;

  ngOnInit(): void {
    this.bookingAppointmentService.resetBooking();
    this.bookingStepperService.resetStep();
    this.topBarSlotService.clear();
  }

  navigateToHospital() {
    window.location.href = 'https://www.nemocnicabory.sk';
  }
}
