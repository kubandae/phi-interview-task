import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { TopbarSlotService } from 'src/app/services/top-bar-slot.service';
import { BookingStepperService } from '../../services/booking-stepper.service';
import { FooterService } from 'src/app/services/footer.service';
import { BookingAppointmentService } from '../../services/booking-appointment.service';

@Component({
  selector: 'app-booking-error',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule],
  templateUrl: './booking-error.component.html',
  styleUrl: './booking-error.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingErrorComponent implements OnInit {
  private readonly _footerService = inject(FooterService);
  private readonly _topBarSlotService = inject(TopbarSlotService);
  private readonly _bookingStepperService = inject(BookingStepperService);
  private readonly _bookingAppointmentService = inject(
    BookingAppointmentService
  );

  ngOnInit(): void {
    this._bookingAppointmentService.resetBooking();
    this._bookingStepperService.resetStep();
    this._topBarSlotService.clearAllContent();
    this._footerService.clear();
  }
}
