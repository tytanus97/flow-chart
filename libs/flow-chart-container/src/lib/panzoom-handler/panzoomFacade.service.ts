import { PanzoomEventsService } from './panzoomEvents.service';
import { PanZoom, PanZoomOptions } from 'panzoom';
import { PanzoomAdapter } from './panzoomAdapter.service';
import { Injectable, OnDestroy } from "@angular/core";

@Injectable()
export class PanzoomFacade implements IPanzoomFacade, OnDestroy {
    private _panzoomInstance: PanZoom

    constructor(
        private readonly panzoomAdapter: PanzoomAdapter,
        private readonly panzoomEventsService: PanzoomEventsService) {
    }

    ngOnDestroy(): void {
        if (this._panzoomInstance) {
            this._panzoomInstance.dispose()
        }
    }
    createPanzoom(element: HTMLElement, options: PanZoomOptions) {
        console.log('create panzoom')
        this._panzoomInstance = this.panzoomAdapter.createPanzoom(element, options)

        this._panzoomInstance.on('transform', (event: any) => {
            console.log(event.getTransform())
            this.panzoomEventsService.scaleChanged.next(this.getScale())
        })
    }
    pausePanzoom(): void {
        if (this._panzoomInstance) {
            console.log('panzoom stop')
            this._panzoomInstance.pause()
        }
    }
    resumePanzoom(): void {
        if (this._panzoomInstance) {
            console.log('panzoom start')
            this._panzoomInstance.resume()
        }
    }

    getScale() {
        return this._panzoomInstance.getTransform().scale
    }
}

export interface IPanzoomFacade {
    createPanzoom(element: HTMLElement, options: PanZoomOptions): void
    pausePanzoom(): void
    resumePanzoom(): void
    getScale(): number
}