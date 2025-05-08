import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookingStepperService } from 'src/app/services/booking-stepper-service';
import { BookingFooterComponent } from 'src/app/components/booking-footer/booking-footer.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-booking-summary',
  imports: [CommonModule, RouterModule, BookingFooterComponent, MatButtonModule],
  templateUrl: './booking-summary.component.html',
  styleUrl: './booking-summary.component.scss',
})
export class BookingSummaryComponent implements OnInit {
  bookingStepperService = inject(BookingStepperService);

  ngOnInit(): void {
    this.bookingStepperService.setActiveStep(2);
  }
}
