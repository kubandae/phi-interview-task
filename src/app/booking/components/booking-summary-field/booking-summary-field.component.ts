import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-summary-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-summary-field.component.html',
  styleUrl: './booking-summary-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingSummaryFieldComponent {
  label = input.required<string>();
}
