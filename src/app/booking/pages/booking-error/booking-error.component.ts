import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { TopbarSlotService } from 'src/app/services/top-bar-slot.service';
import { BookingStepperService } from '../../services/booking-stepper.service';

@Component({
  selector: 'app-booking-error',
  imports: [CommonModule, RouterModule, MatButtonModule],
  templateUrl: './booking-error.component.html',
  styleUrl: './booking-error.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingErrorComponent implements OnInit {
  readonly topBarSlotService = inject(TopbarSlotService);
  readonly bookingStepperService = inject(BookingStepperService);

  ngOnInit(): void {
    this.bookingStepperService.resetStep();
    this.topBarSlotService.clear();
  }
}
