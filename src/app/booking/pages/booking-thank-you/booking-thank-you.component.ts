import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarSlotService } from 'src/app/services/top-bar-slot.service';
import { BookingStepperService } from '../../services/booking-stepper.service';
import { MatButtonModule } from '@angular/material/button';
import { BookingAppointmentService } from '../../services/booking-appointment.service';
import { FooterService } from 'src/app/services/footer.service';

@Component({
  selector: 'app-booking-thank-you',
  imports: [CommonModule, MatButtonModule],
  templateUrl: './booking-thank-you.component.html',
  styleUrl: './booking-thank-you.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingThankYouComponent implements OnInit {
  private readonly footerService = inject(FooterService);
  private readonly topBarSlotService = inject(TopbarSlotService);
  private readonly bookingStepperService = inject(BookingStepperService);
  private readonly bookingAppointmentService = inject(
    BookingAppointmentService
  );
  readonly firstName = this.bookingAppointmentService.personalInfo()?.firstName;

  ngOnInit(): void {
    this.bookingAppointmentService.resetBooking();
    this.bookingStepperService.resetStep();
    this.topBarSlotService.clearAllContent();
    this.footerService.clear();
  }

  navigateToHospital(): void {
    window.location.href = 'https://www.nemocnicabory.sk';
  }
}
