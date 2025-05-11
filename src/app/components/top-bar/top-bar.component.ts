import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarSlotService } from 'src/app/services/top-bar-slot.service';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent {
  private readonly _topbarSlotService = inject(TopbarSlotService);

  readonly topbarMiddleContent = this._topbarSlotService.middleContentTemplate;
  readonly topbarRightContent = this._topbarSlotService.rightContentTemplate;
  readonly hasContent = computed(() => {
    return !!this.topbarMiddleContent() || !!this.topbarRightContent();
  });
}
