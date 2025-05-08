import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarSlotService } from 'src/app/services/top-bar-slot.service';
import { BookingStepperService } from '../../services/booking-stepper-service';

@Component({
  selector: 'app-booking-thank-you',
  imports: [CommonModule],
  templateUrl: './booking-thank-you.component.html',
  styleUrl: './booking-thank-you.component.scss',
})
export class BookingThankYouComponent implements OnInit {
  topBarSlotService = inject(TopbarSlotService);
  bookingStepperService = inject(BookingStepperService);

  ngOnInit(): void {
    this.bookingStepperService.resetStep();
    this.topBarSlotService.clear();
  }
}
