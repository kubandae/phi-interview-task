import { AvailableTimeSlot } from "./available-slots.model";

export interface AvailableSlots {
    slots: Record<string, AvailableTimeSlot[]>;
}