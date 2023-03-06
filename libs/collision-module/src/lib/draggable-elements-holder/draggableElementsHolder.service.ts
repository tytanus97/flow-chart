import { Injectable } from '@angular/core';
import { ICollidable } from '@flow-chart/draggable-element';
@Injectable()
export class DraggableElementsHolderService {
    private _draggableElements: ICollidable[]

    constructor() {

        setInterval(() => {
            if (this._draggableElements) {
                this._draggableElements.forEach(el => {
                    const newPosition = el.getPosition()
                    newPosition.x++;
                    newPosition.y++;
                    const pos = el.setPosition(newPosition)
                    console.log('new pos', pos);

                })
            }
        }, 100)

    }

    setDraggableRectangles(rects: ICollidable[]) {
        this._draggableElements = rects
        console.log(rects)
    }
}