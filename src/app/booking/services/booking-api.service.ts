import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AvailableSlots } from '../models/available-time-slot';

@Injectable({ providedIn: 'root' })
export class BookingApiService {
    constructor(private http: HttpClient) { }

    getAvailableSlots(): Observable<AvailableSlots> {
        return this.http.get<AvailableSlots>('/api/available-slots');
    }
}