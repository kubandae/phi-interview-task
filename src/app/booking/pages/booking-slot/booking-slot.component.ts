import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { BookingStepFooterComponent } from '../../components/booking-step-footer/booking-step-footer.component';
import { BookingStepperService } from '../../services/booking-stepper.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { AvailableTimeSlotDto } from '../../models/dtos/available-time-slot-dto.model';
import { BookingAvailabilityService } from '../../services/booking-availability.service';
import { BookingAppointmentService } from '../../services/booking-appointment.service';
import { BookingStepHeaderComponent } from '../../components/booking-step-header/booking-step-header.component';

@Component({
  selector: 'app-booking-slot',
  imports: [
    CommonModule,
    RouterModule,
    BookingStepHeaderComponent,
    BookingStepFooterComponent,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDividerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './booking-slot.component.html',
  styleUrl: './booking-slot.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingSlotComponent implements OnInit {
  private bookingStepperService = inject(BookingStepperService);
  private bookingAvailabilityService = inject(BookingAvailabilityService);
  private bookingAppointmentService = inject(BookingAppointmentService);

  readonly availableDates = this.bookingAvailabilityService.availableDates;
  readonly availableTimeSlots = computed(() =>
    this.bookingAvailabilityService.getAvailableTimeSlotsForDate(
      this.selectedDate()
    )
  );

  readonly selectedDate = this.bookingAppointmentService.selectedDate;
  readonly selectedTimeSlot = this.bookingAppointmentService.selectedTimeSlot;
  readonly calendarStartDate = computed(() => {
    const selected = this.bookingAppointmentService.selectedDate();
    if (selected) return selected;

    const sorted = Array.from(this.bookingAvailabilityService.availableDates())
      .map((str) => new Date(str))
      .filter((d) => !isNaN(d.getTime()))
      .sort((a, b) => a.getTime() - b.getTime());

    return sorted[0] ?? null;
  });
  readonly isStepCompleted = computed(() => {
    return this.selectedDate() && this.selectedTimeSlot();
  });

  ngOnInit(): void {
    this.bookingStepperService.setActiveStep(0);
  }

  onDateSelected(date: Date | null) {
    this.bookingAppointmentService.setSelectedDate(date);
  }

  onTimeSlotSelected(slot: AvailableTimeSlotDto) {
    this.bookingAppointmentService.setSelectedTimeSlot(slot);
  }

  isDateAvailable = (date: Date): boolean => {
    const iso = date.toISOString().split('T')[0];
    return this.availableDates().has(iso);
  };

  dateClass = (date: Date): string => {
    return this.isDateAvailable(date) ? 'has-availability' : '';
  };
}
