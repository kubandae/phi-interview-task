import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { BookingStepperService } from '../../services/booking-stepper.service';

@Component({
  selector: 'app-booking-stepper-header',
  standalone: true,
  imports: [CommonModule, MatStepperModule, MatIconModule],
  templateUrl: './booking-stepper-header.component.html',
  styleUrl: './booking-stepper-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingStepperHeaderComponent {
  readonly bookingStepperService = inject(BookingStepperService);
  readonly activeStep = this.bookingStepperService.activeStep;
  readonly steps = this.bookingStepperService.steps;
}
