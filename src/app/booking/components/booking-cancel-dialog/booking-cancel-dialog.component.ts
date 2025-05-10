import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { BookingAppointmentService } from '../../services/booking-appointment.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-booking-cancel-dialog',
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './booking-cancel-dialog.component.html',
  styleUrl: './booking-cancel-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingCancelDialogComponent {
  private readonly dialogRef = inject(
    MatDialogRef<BookingCancelDialogComponent>
  );
  private readonly router = inject(Router);
  private readonly bookingAppointmentService = inject(
    BookingAppointmentService
  );

  cancelBooking(): void {
    this.bookingAppointmentService.resetBooking();
    this.dialogRef.close();
    this.router.navigateByUrl('/booking/slot', { replaceUrl: true });
  }
}
