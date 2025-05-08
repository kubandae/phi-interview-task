import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TopbarSlotService } from 'src/app/services/top-bar-slot.service';

@Component({
  selector: 'app-main-layout',
  imports: [CommonModule, RouterModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  topbarContent = inject(TopbarSlotService).template;
  topbarActions = signal(null);
}
