import { Injectable, inject, computed, signal, Signal, WritableSignal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { map } from "rxjs";
import { BookingApiService } from "./booking-api.service";
import { AvailableTimeSlot } from "../models/available-slots.model";

@Injectable({ providedIn: 'root' })
export class BookingAvailabilityService {
    private readonly api = inject(BookingApiService);

    private readonly rawSlotsMap: Signal<Map<string, AvailableTimeSlot[]>> = toSignal(
        this.api.getAvailableSlots().pipe(
            map((response) => {
                const result = new Map<string, AvailableTimeSlot[]>();
                Object.entries(response.slots).forEach(([key, slots]) => {
                    const [day, month, year] = key.split('/').map(Number);
                    const iso = new Date(year, month - 1, day).toISOString().split('T')[0];
                    result.set(iso, slots);
                });
                return result;
            })
        ),
        { initialValue: new Map() }
    );

    readonly availableDates: Signal<Set<string>> = computed(() => new Set(this.rawSlotsMap().keys()));

    getAvailableTimeSlotsForDate(date: Date | null): AvailableTimeSlot[] {
        if (!date) return [];
        const iso = date.toISOString().split('T')[0];
        return this.rawSlotsMap().get(iso) ?? [];
    }
}