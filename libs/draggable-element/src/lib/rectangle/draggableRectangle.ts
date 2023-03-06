import { inject } from '@angular/core';
import { RectangleService } from './rectangle.service';
import { ICollidable } from '../interfaces/ICollidable';
import { Point } from '@angular/cdk/drag-drop';
import { Size } from '../models/size';
export class DraggableRectangle extends ICollidable {
    restangleRef: RectangleService = inject(RectangleService)

    override getPosition(): Point {
        return this.restangleRef.position
    }
    override getCenterPosition(): Point {
        return this.restangleRef.centerPosition
    }
    override getSize(): Size {
        return this.restangleRef.size
    }

    override setPosition(point: Point): Point {
        this.restangleRef.setPosition(point)
        return point
    }

}