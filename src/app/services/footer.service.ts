import { computed, Injectable, signal, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FooterService {
  private _template = signal<TemplateRef<unknown> | null>(null);
  readonly template = this._template.asReadonly();

  readonly showFooter = computed(() => {
    return !!this.template();
  });

  set(template: TemplateRef<unknown>): void {
    this._template.set(template);
  }

  clear(): void {
    this._template.set(null);
  }
}
