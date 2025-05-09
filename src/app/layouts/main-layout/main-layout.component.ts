import { Component, inject } from '@angular/core';
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
  private readonly topbarSlotService = inject(TopbarSlotService);
  readonly topbarMiddleContent = this.topbarSlotService.middleContentTemplate;
  readonly topbarRightContent = this.topbarSlotService.rightContentTemplate;
}
