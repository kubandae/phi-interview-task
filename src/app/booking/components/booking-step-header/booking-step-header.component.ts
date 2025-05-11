import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-step-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-step-header.component.html',
  styleUrl: './booking-step-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingStepHeaderComponent {
  title = input.required<string>();
  description = input<string | null>(null);
}
