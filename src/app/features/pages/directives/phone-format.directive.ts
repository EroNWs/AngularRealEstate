// src/app/shared/directives/phone-format.directive.ts
import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
    selector: '[phoneFormat]'
})
export class PhoneFormatDirective {
    constructor(private el: ElementRef) {}

    @HostListener('blur') onBlur() {
        let value: string = this.el.nativeElement.value;
        value = this.formatPhoneNumber(value);
        this.el.nativeElement.value = value;
    }

    private formatPhoneNumber(value: string): string {

        const numbers = value.replace(/\D/g, '');

        if (numbers.length === 10) {
            return `(${numbers.substr(0, 3)}) ${numbers.substr(3, 3)}-${numbers.substr(6)}`;
        }

        return value;
    }
}
