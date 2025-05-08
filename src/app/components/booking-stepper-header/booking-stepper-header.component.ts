import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingStepperService } from 'src/app/services/booking-stepper-service';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-booking-stepper-header',
  imports: [CommonModule, MatStepperModule, MatIconModule],
  templateUrl: './booking-stepper-header.component.html',
  styleUrl: './booking-stepper-header.component.scss',
})
export class BookingStepperHeaderComponent {
  activeStep = inject(BookingStepperService).activeStep;
}
