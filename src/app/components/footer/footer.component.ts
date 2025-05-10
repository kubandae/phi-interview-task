import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterService } from 'src/app/services/footer.service';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  private readonly footerService = inject(FooterService);
  readonly showFooter = this.footerService.showFooter;
  readonly footerContent = this.footerService.template;
}
