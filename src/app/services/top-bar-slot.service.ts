import { Injectable, TemplateRef, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TopbarSlotService {
    private _template = signal<TemplateRef<unknown> | null>(null);
    readonly template = this._template.asReadonly();

    set(template: TemplateRef<unknown>) {
        this._template.set(template);
    }

    clear() {
        this._template.set(null);
    }
}