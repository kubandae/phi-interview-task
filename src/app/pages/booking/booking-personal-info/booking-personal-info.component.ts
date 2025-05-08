import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookingStepperService } from 'src/app/services/booking-stepper-service';
import { BookingFooterComponent } from 'src/app/components/booking-footer/booking-footer.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-booking-personal-info',
  imports: [CommonModule, RouterModule, BookingFooterComponent, MatButtonModule],
  templateUrl: './booking-personal-info.component.html',
  styleUrl: './booking-personal-info.component.scss',
})
export class BookingPersonalInfoComponent implements OnInit {
  bookingStepperService = inject(BookingStepperService);

  ngOnInit(): void {
    this.bookingStepperService.setActiveStep(1);
  }
}
