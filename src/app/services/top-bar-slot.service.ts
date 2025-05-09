import { Injectable, TemplateRef, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TopbarSlotService {
  private _middleContentTemplate = signal<TemplateRef<unknown> | null>(null);
  readonly middleContentTemplate = this._middleContentTemplate.asReadonly();

  private _rightContentTemplate = signal<TemplateRef<unknown> | null>(null);
  readonly rightContentTemplate = this._rightContentTemplate.asReadonly();

  setMiddleContent(template: TemplateRef<unknown>) {
    this._middleContentTemplate.set(template);
  }

  clearMiddleContent() {
    this._middleContentTemplate.set(null);
  }

  setRightContent(template: TemplateRef<unknown>) {
    this._rightContentTemplate.set(template);
  }

  clearRightContent() {
    this._rightContentTemplate.set(null);
  }

  clearAllContent() {
    this._middleContentTemplate.set(null);
    this._rightContentTemplate.set(null);
  }
}
