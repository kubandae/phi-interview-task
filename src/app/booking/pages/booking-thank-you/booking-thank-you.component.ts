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
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './booking-thank-you.component.html',
  styleUrl: './booking-thank-you.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingThankYouComponent implements OnInit {
  private readonly _footerService = inject(FooterService);
  private readonly _topBarSlotService = inject(TopbarSlotService);
  private readonly _bookingStepperService = inject(BookingStepperService);
  private readonly _bookingAppointmentService = inject(
    BookingAppointmentService
  );

  readonly firstName =
    this._bookingAppointmentService.personalInfo()?.firstName;

  ngOnInit(): void {
    this._bookingAppointmentService.resetBooking();
    this._bookingStepperService.resetStep();
    this._topBarSlotService.clearAllContent();
    this._footerService.clear();
  }

  navigateToHospitalPage(): void {
    window.location.href = 'https://www.nemocnicabory.sk';
  }
}
