import { Injectable, inject, computed, Signal, signal } from '@angular/core';
import { BookingApiService } from './booking-api.service';
import { AvailableTimeSlotDto } from '../models/dtos/available-time-slot-dto.model';

@Injectable({ providedIn: 'root' })
export class BookingAvailabilityService {
  private readonly _bookingApiService = inject(BookingApiService);
  private readonly _rawSlotsMap = signal<Map<string, AvailableTimeSlotDto[]>>(
    new Map()
  );
  private readonly _availableDates = computed(
    () => new Set(this._rawSlotsMap().keys())
  );

  getAvailableDates(): Signal<Set<string>> {
    this.fetch();
    return this._availableDates;
  }

  getAvailableTimeSlotsForDate(date: Date | null): AvailableTimeSlotDto[] {
    if (!date) return [];
    const iso = date.toISOString().split('T')[0];
    return this._rawSlotsMap().get(iso) ?? [];
  }

  private fetch(): void {
    this._bookingApiService.getAvailableSlots().subscribe((response) => {
      const result = new Map<string, AvailableTimeSlotDto[]>();
      Object.entries(response.slots ?? {}).forEach(([key, slots]) => {
        const [day, month, year] = key.split('/').map(Number);
        const iso = new Date(year, month - 1, day).toISOString().split('T')[0];

        // simulated invalid slot for testing purposes
        slots.push({
          id: '65743dad-4ae8-4cf2-a519-e5650c961ecd',
          time: '23:00',
        });
        result.set(iso, slots);
      });

      this._rawSlotsMap.set(result);
    });
  }
}
