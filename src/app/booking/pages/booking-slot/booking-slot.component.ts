import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { BookingStepperService } from '../../services/booking-stepper.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { AvailableTimeSlotDto } from '../../models/dtos/available-time-slot-dto.model';
import { BookingAppointmentService } from '../../services/booking-appointment.service';
import { BookingStepHeaderComponent } from '../../components/booking-step-header/booking-step-header.component';
import { FooterService } from 'src/app/services/footer.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastService } from 'src/app/services/toast.service';
import { BookingStepKey } from '../../models/booking-step-key.enum';

@Component({
  selector: 'app-booking-slot',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    BookingStepHeaderComponent,
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
export class BookingSlotComponent implements OnInit, OnDestroy {
  @ViewChild('footerContent', { static: true })
  footerContent!: TemplateRef<unknown>;

  private readonly _footerService = inject(FooterService);
  private readonly _bookingStepperService = inject(BookingStepperService);
  private readonly _bookingAppointmentService = inject(
    BookingAppointmentService
  );
  private readonly _toastService = inject(ToastService);
  private readonly _destroyRef = inject(DestroyRef);

  readonly isLoaded = signal<boolean>(false);
  readonly availableDates = signal<Map<string, AvailableTimeSlotDto[]>>(
    new Map()
  );
  readonly availableTimeSlots = computed(() => {
    const date = this.selectedDate();
    const availableDates = this.availableDates();
    if (!date || !availableDates) return [];

    const isoDate = date.toISOString().split('T')[0];
    return availableDates.get(isoDate) ?? [];
  });
  readonly selectedDate = this._bookingAppointmentService.selectedDate;
  readonly selectedTimeSlot = this._bookingAppointmentService.selectedTimeSlot;
  readonly calendarStartDate = computed(() => {
    const selected = this._bookingAppointmentService.selectedDate();
    if (selected) return selected;

    const availableDates = this.availableDates();
    const sorted = Array.from(availableDates.keys())
      .map((str) => new Date(str))
      .filter((d) => !isNaN(d.getTime()))
      .sort((a, b) => a.getTime() - b.getTime());

    return sorted[0] ?? new Date();
  });
  readonly isStepCompleted = computed(() => {
    return this.selectedDate() && this.selectedTimeSlot();
  });

  ngOnInit(): void {
    this.isLoaded.set(false);
    this._bookingStepperService.setActiveStep(BookingStepKey.Slot);
    this._footerService.set(this.footerContent);
    this._bookingAppointmentService
      .getAvailableDates()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (data) => {
          this.availableDates.set(data);
        },
        error: () => {
          this._toastService.showError('Nepodarilo sa načítať dáta.');
          this.isLoaded.set(true);
        },
        complete: () => {
          this.isLoaded.set(true);
        },
      });
  }

  ngOnDestroy(): void {
    this._footerService.clear();
  }

  onDateSelected(date: Date | null): void {
    this._bookingAppointmentService.setSelectedDate(date);
  }

  onTimeSlotSelected(slot: AvailableTimeSlotDto): void {
    this._bookingAppointmentService.setSelectedTimeSlot(slot);
  }

  isDateAvailable = (date: Date): boolean => {
    const iso = date.toISOString().split('T')[0];
    return this.availableDates().has(iso);
  };

  dateClass = (date: Date): string => {
    return this.isDateAvailable(date) ? 'has-availability' : '';
  };
}
