import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-booking-cancel-button',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './booking-cancel-button.component.html',
  styleUrl: './booking-cancel-button.component.scss',
})
export class BookingCancelButtonComponent {}
