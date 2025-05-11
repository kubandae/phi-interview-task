import { Injectable, TemplateRef, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TopbarSlotService {
  private _middleContentTemplate = signal<TemplateRef<unknown> | null>(null);
  private _rightContentTemplate = signal<TemplateRef<unknown> | null>(null);

  readonly middleContentTemplate = this._middleContentTemplate.asReadonly();
  readonly rightContentTemplate = this._rightContentTemplate.asReadonly();

  setMiddleContent(template: TemplateRef<unknown>): void {
    this._middleContentTemplate.set(template);
  }

  clearMiddleContent(): void {
    this._middleContentTemplate.set(null);
  }

  setRightContent(template: TemplateRef<unknown>): void {
    this._rightContentTemplate.set(template);
  }

  clearRightContent(): void {
    this._rightContentTemplate.set(null);
  }

  clearAllContent(): void {
    this.clearMiddleContent();
    this.clearRightContent();
  }
}
