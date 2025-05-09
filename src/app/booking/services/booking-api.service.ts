import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AvailableSlotsDto } from '../models/dtos/available-slots-dto.model';
import { PersonalInfoDto } from '../models/dtos/personal-info-dto.model';
import { PersonalInfoResponseDto } from '../models/dtos/personal-info-response-dto.model';

@Injectable({ providedIn: 'root' })
export class BookingApiService {
  private httpClient = inject(HttpClient);

  getAvailableSlots(): Observable<AvailableSlotsDto> {
    return this.httpClient.get<AvailableSlotsDto>('/api/available-slots');
    }

  submitPersonalInfo(
    data: PersonalInfoDto
  ): Observable<PersonalInfoResponseDto> {
    return this.httpClient.post<PersonalInfoResponseDto>(
      '/api/save-personal-data',
      data
    );
  }
  }
