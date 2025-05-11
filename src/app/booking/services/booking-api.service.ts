import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AvailableSlotsDto } from '../models/dtos/available-slots-dto.model';
import { PersonalInfoDto } from '../models/dtos/personal-info-dto.model';
import { PersonalInfoResponseDto } from '../models/dtos/personal-info-response-dto.model';
import { CompleteBookingDto } from '../models/dtos/complete-booking-dto.model';
import { CompleteBookingResponseDto } from '../models/dtos/complete-booking-response-dto';

@Injectable({ providedIn: 'root' })
export class BookingApiService {
  private readonly _httpClient = inject(HttpClient);

  getAvailableSlots(): Observable<AvailableSlotsDto> {
    return this._httpClient.get<AvailableSlotsDto>('/api/available-slots');
  }

  submitPersonalInfo(
    data: PersonalInfoDto
  ): Observable<PersonalInfoResponseDto> {
    return this._httpClient.post<PersonalInfoResponseDto>(
      '/api/save-personal-data',
      data
    );
  }

  completeBooking(
    data: CompleteBookingDto
  ): Observable<CompleteBookingResponseDto> {
    return this._httpClient.post<CompleteBookingResponseDto>(
      '/api/complete',
      data
    );
  }
}
