import { Injectable } from '@angular/core';
import { ICollidable } from '@flow-chart/draggable-element';
@Injectable()
export class CollidableElementsHolderService {
    private _collidableElements: ICollidable[]

    set collidableElements(collidableElements: ICollidable[]) {
        this._collidableElements = collidableElements
    }

    get collidableElements(): ICollidable[] {
        return this._collidableElements
    }
}