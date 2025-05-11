import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { BookingAppointmentService } from '../../services/booking-appointment.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-booking-cancel-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './booking-cancel-dialog.component.html',
  styleUrl: './booking-cancel-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingCancelDialogComponent {
  private readonly _dialogRef = inject(
    MatDialogRef<BookingCancelDialogComponent>
  );
  private readonly _router = inject(Router);
  private readonly _bookingAppointmentService = inject(
    BookingAppointmentService
  );

  cancelBooking(): void {
    this._bookingAppointmentService.resetBooking();
    this._dialogRef.close();
    this._router.navigateByUrl('/booking/slot', { replaceUrl: true });
  }
}
