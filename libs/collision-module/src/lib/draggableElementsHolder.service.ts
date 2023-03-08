import { CollisionDetectionService } from './collisionDetection.service';
import { Injectable } from '@angular/core';
import { ICollidable } from '@flow-chart/draggable-element';
@Injectable()
export class DraggableElementsHolderService {
    private _draggableElements: ICollidable[]

    set draggableElements(draggableElements: ICollidable[]) {
        this._draggableElements = draggableElements
    }

    get draggableElements(): ICollidable[] {
        return this._draggableElements
    }
}