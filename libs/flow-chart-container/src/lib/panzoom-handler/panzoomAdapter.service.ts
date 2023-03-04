import { Injectable } from "@angular/core";
import panzoom, { PanZoom, PanZoomOptions } from 'panzoom'
@Injectable()
export class PanzoomAdapter {
    private _panzoom = panzoom
    createPanzoom(hostElement: HTMLElement, panzoomConfigOptions: PanZoomOptions): PanZoom {
        return this._panzoom(hostElement, panzoomConfigOptions)
    }

}