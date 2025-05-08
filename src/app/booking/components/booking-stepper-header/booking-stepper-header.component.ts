import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { BookingStepperService } from '../../services/booking-stepper-service';

@Component({
  selector: 'app-booking-stepper-header',
  imports: [CommonModule, MatStepperModule, MatIconModule],
  templateUrl: './booking-stepper-header.component.html',
  styleUrl: './booking-stepper-header.component.scss',
})
export class BookingStepperHeaderComponent {
  activeStep = inject(BookingStepperService).activeStep;
}
