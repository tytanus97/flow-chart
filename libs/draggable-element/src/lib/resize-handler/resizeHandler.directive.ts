import { ElementRef, OnDestroy, OnInit, Output } from "@angular/core";
import { RectangleService } from "../rectangle/rectangle.service";
import { Directive, ChangeDetectorRef, EventEmitter } from '@angular/core';

@Directive({ selector: '[flowChartResizeGuard]', standalone: true })
export class ResizeObserverDirective implements OnDestroy, OnInit {
    private _resizeObserver: ResizeObserver

    @Output() sizeChanged = new EventEmitter()

    constructor(private readonly rectangle: RectangleService,
        private readonly hostElement: ElementRef<HTMLDivElement>,
        private readonly changeDetectorRef: ChangeDetectorRef) {
        this._resizeObserver = new ResizeObserver(this.onSizeChanged.bind(this))
    }
    ngOnInit(): void {
        this._resizeObserver.observe(this.hostElement.nativeElement, { box: 'border-box' })
    }

    private onSizeChanged(entries: ResizeObserverEntry[]) {
        const { inlineSize, blockSize } = entries[0].borderBoxSize[0]
        this.rectangle.setSize({ height: blockSize, width: inlineSize })
        this.changeDetectorRef.detectChanges()
        this.sizeChanged.emit()
    }

    ngOnDestroy(): void {
        this._resizeObserver.unobserve(this.hostElement.nativeElement)
    }
}
