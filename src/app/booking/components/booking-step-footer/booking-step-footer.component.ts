import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-step-footer',
  imports: [CommonModule],
  templateUrl: './booking-step-footer.component.html',
  styleUrl: './booking-step-footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingStepFooterComponent {}
