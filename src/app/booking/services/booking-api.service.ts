import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AvailableSlotsDto } from '../models/dtos/available-slots-dto.model';

@Injectable({ providedIn: 'root' })
export class BookingApiService {
  private httpClient = inject(HttpClient);

  getAvailableSlots(): Observable<AvailableSlotsDto> {
    return this.httpClient.get<AvailableSlotsDto>('/api/available-slots');
    }
}