import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { BookingFooterComponent } from '../../components/booking-footer/booking-footer.component';
import { BookingStepperService } from '../../services/booking-stepper-service';

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
