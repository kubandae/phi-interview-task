import { Injectable, inject, computed, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { BookingApiService } from './booking-api.service';
import { AvailableTimeSlotDto } from '../models/dtos/available-time-slot-dto.model';

@Injectable({ providedIn: 'root' })
export class BookingAvailabilityService {
  private readonly api = inject(BookingApiService);

  private readonly rawSlotsMap: Signal<Map<string, AvailableTimeSlotDto[]>> =
    toSignal(
      this.api.getAvailableSlots().pipe(
        map((response) => {
          const result = new Map<string, AvailableTimeSlotDto[]>();
          Object.entries(response.slots).forEach(([key, slots]) => {
            const [day, month, year] = key.split('/').map(Number);
            const iso = new Date(year, month - 1, day)
              .toISOString()
              .split('T')[0];

            // simulated invalid slot for testing purposes
            slots.push({
              id: '65743dad-4ae8-4cf2-a519-e5650c961ecd',
              time: '23:00',
            });
            result.set(iso, slots);
          });
          return result;
        })
      ),
      { initialValue: new Map() }
    );

  readonly availableDates: Signal<Set<string>> = computed(
    () => new Set(this.rawSlotsMap().keys())
  );

  getAvailableTimeSlotsForDate(date: Date | null): AvailableTimeSlotDto[] {
    if (!date) return [];
    const iso = date.toISOString().split('T')[0];
    return this.rawSlotsMap().get(iso) ?? [];
  }
}
