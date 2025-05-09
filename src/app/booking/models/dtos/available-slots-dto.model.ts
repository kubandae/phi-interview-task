import { AvailableTimeSlotDto } from './available-time-slot-dto.model';

export interface AvailableSlotsDto {
  slots: Record<string, AvailableTimeSlotDto[]>;
}
