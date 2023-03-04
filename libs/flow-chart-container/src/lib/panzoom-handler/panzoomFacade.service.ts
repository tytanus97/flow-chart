import { PanzoomEventsService } from './panzoomEvents.service';
import { PanZoom, PanZoomOptions } from 'panzoom';
import { PanzoomAdapter } from './panzoomAdapter.service';
import { Injectable } from "@angular/core";

@Injectable()
export class PanzoomFacade implements IPanzoomFacade {
    private _panzoomInstance: PanZoom

    constructor(
        private readonly panzoomAdapter: PanzoomAdapter,
        private readonly panzoomEventsService: PanzoomEventsService) {
    }
    createPanzoom(element: HTMLElement, options: PanZoomOptions) {
        this._panzoomInstance = this.panzoomAdapter.createPanzoom(element, options)

        this._panzoomInstance.on('transform', (event) => {
            this.panzoomEventsService.scaleChanged.next(this.getScale())
        })

    }
    pausePanzoom(): void {
        if (this._panzoomInstance) {
            this._panzoomInstance.pause()
        }
    }
    resumePanzoom(): void {
        if (this._panzoomInstance) {
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