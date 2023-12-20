import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[appHighlight]',
})
export class HighlightDirective implements OnInit {
    @Input() color: string = 'yellow';

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngOnInit(): void {
        this.renderer.setStyle(
            this.el.nativeElement,
            'backgroundColor',
            this.color
        );
    }
}
