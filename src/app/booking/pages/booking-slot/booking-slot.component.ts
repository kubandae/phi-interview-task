import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { BookingFooterComponent } from '../../components/booking-footer/booking-footer.component';
import { BookingStepperService } from '../../services/booking-stepper-service';

@Component({
  selector: 'app-booking-slot',
  imports: [CommonModule, RouterModule, BookingFooterComponent, MatButtonModule],
  templateUrl: './booking-slot.component.html',
  styleUrl: './booking-slot.component.scss',
})
export class BookingSlotComponent implements OnInit {
  bookingStepperService = inject(BookingStepperService);

  ngOnInit(): void {
    this.bookingStepperService.setActiveStep(0);
  }
}
