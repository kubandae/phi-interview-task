import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { AvailableTimeSlotDto } from '../models/dtos/available-time-slot-dto.model';
import { PersonalInfoDto } from '../models/dtos/personal-info-dto.model';
import { BookingApiService } from './booking-api.service';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { GenericSubmitResult } from '../models/generic-submit-result.model';
import { PersonalInfo } from '../models/personal-info.model';
import { PersonalInfoResponseDto } from '../models/dtos/personal-info-response-dto.model';
import { CompleteBookingDto } from '../models/dtos/complete-booking-dto.model';
import { CompleteBookingResponseDto } from '../models/dtos/complete-booking-response-dto';

@Injectable({ providedIn: 'root' })
export class BookingAppointmentService {
  private readonly _bookingApiService = inject(BookingApiService);
  private readonly _state = signal<{
    selectedDate: Date | null;
    selectedTimeSlot: AvailableTimeSlotDto | null;
    personalInfo: PersonalInfo | null;
    personalInfoResponse: PersonalInfoResponseDto | null;
    bookingResponse: CompleteBookingResponseDto | null;
  }>({
    selectedDate: null,
    selectedTimeSlot: null,
    personalInfo: null,
    personalInfoResponse: null,
    bookingResponse: null,
  });

  readonly selectedDate = computed(() => this._state().selectedDate);
  readonly selectedTimeSlot = computed(() => this._state().selectedTimeSlot);
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
  readonly personalInfo = computed(() => this._state().personalInfo);
  readonly personalInfoResponse = computed(
    () => this._state().personalInfoResponse
  );
  readonly bookingResponse = computed(() => this._state().bookingResponse);

  setSelectedDate(date: Date | null): void {
    this._state.update((s) => ({
      ...s,
      selectedDate: date,
      selectedTimeSlot: null,
    }));
  }

  setSelectedTimeSlot(slot: AvailableTimeSlotDto): void {
    this._state.update((s) => ({
      ...s,
      selectedTimeSlot: slot,
    }));
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

    return this._bookingApiService.submitPersonalInfo(personalInfoDto).pipe(
      tap((res: PersonalInfoResponseDto) => {
        this._state.update((s) => ({
          ...s,
          personalInfo: data,
          personalInfoResponse: res,
        }));
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

  completeBooking(data: CompleteBookingDto): Observable<GenericSubmitResult> {
    return this._bookingApiService.completeBooking(data).pipe(
      tap((res: CompleteBookingResponseDto) => {
        this._state.update((s) => ({
          ...s,
          bookingResponse: res,
        }));
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

  resetBooking(): void {
    this._state.set({
      selectedDate: null,
      selectedTimeSlot: null,
      personalInfo: null,
      personalInfoResponse: null,
      bookingResponse: null,
    });
  }
}
