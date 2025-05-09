import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { AvailableTimeSlotDto } from '../models/dtos/available-time-slot-dto.model';
import { PersonalInfoDto } from '../models/dtos/personal-info-dto.model';
import { BookingApiService } from './booking-api.service';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { GenericSubmitResult } from '../models/generic-submit-result.model';
import { PersonalInfo } from '../models/personal-info.model';
import { PersonalInfoResponseDto } from '../models/dtos/personal-info-response-dto.model';

@Injectable({ providedIn: 'root' })
export class BookingAppointmentService {
  readonly bookingApiService = inject(BookingApiService);
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

  private readonly _personalInfo = signal<PersonalInfo | null>(null);
  readonly personalInfo = this._personalInfo.asReadonly();

  private readonly _personalInfoResponse =
    signal<PersonalInfoResponseDto | null>(null);
  readonly personalInfoResponse = this._personalInfoResponse.asReadonly();

    setSelectedDate(date: Date | null): void {
        this._selectedDate.set(date);
        this._selectedTimeSlot.set(null);
    }

  setSelectedTimeSlot(slot: AvailableTimeSlotDto): void {
        this._selectedTimeSlot.set(slot);
    }

  submitPersonalInfo(data: PersonalInfo): Observable<GenericSubmitResult> {
    const personalInfoDto: PersonalInfoDto = {
      firstName: data.firstName,
      lastName: data.lastName,
      birthNumber: data.birthNumber,
      countryId: data.countryId,
      cityId: data.cityId,
      email: data.email,
    };

    return this.bookingApiService.submitPersonalInfo(personalInfoDto).pipe(
      tap((res: PersonalInfoResponseDto) => {
        this._personalInfo.set(data);
        this._personalInfoResponse.set(res);
      }),
      map(
        (res): GenericSubmitResult => ({
          success: true,
          message: res.message,
        })
      ),
      catchError((err) => {
        const message = err?.error?.message;
        return of({ success: false, message });
      })
    );
  }
}
