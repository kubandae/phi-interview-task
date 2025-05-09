import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { BookingCancelDialogComponent } from '../booking-cancel-dialog/booking-cancel-dialog.component';

@Component({
  selector: 'app-booking-cancel-button',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './booking-cancel-button.component.html',
  styleUrl: './booking-cancel-button.component.scss',
})
export class BookingCancelButtonComponent {
  readonly dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(BookingCancelDialogComponent, { disableClose: true });
  }
}
