import { Injectable } from "@angular/core";

@Injectable()
export class PanzoomConfigService {
    getConfig() {
        return {
            maxZoom: 1.5,
            minZoom: 0.1,
            initialX: 0,
            initialY: 0,
            step: 0.1
        }
    }
}