import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { AvailableTimeSlotDto } from '../models/dtos/available-time-slot-dto.model';

@Injectable({ providedIn: 'root' })
export class BookingAppointmentService {
    private readonly _selectedDate = signal<Date | null>(null);
  private readonly _selectedTimeSlot = signal<AvailableTimeSlotDto | null>(
    null
  );

    readonly selectedDate = this._selectedDate.asReadonly();
    readonly selectedTimeSlot = this._selectedTimeSlot.asReadonly();
    readonly appointmentSummary: Signal<string | null> = computed(() => {
        const date = this.selectedDate();
        const slot = this.selectedTimeSlot();
        if (!date || !slot) return null;

        const formatter = new Intl.DateTimeFormat('sk-SK', {
            day: 'numeric',
            month: 'long',
      year: 'numeric',
        });

        return `${formatter.format(date)} o ${slot.time}`;
    });

    setSelectedDate(date: Date | null): void {
        this._selectedDate.set(date);
        this._selectedTimeSlot.set(null);
    }

  setSelectedTimeSlot(slot: AvailableTimeSlotDto): void {
        this._selectedTimeSlot.set(slot);
    }
}
