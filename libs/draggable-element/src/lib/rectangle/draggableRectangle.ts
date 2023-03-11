import { inject } from '@angular/core';
import { RectangleService } from './rectangle.service';
import { Point } from '@angular/cdk/drag-drop';
import { ICollidable } from '@flow-chart/collision-module';
import { Size } from '@flow-chart/shared';
export class DraggableRectangle extends ICollidable {

    rectangleRef: RectangleService = inject(RectangleService)
    id: string

    override getPosition(): Point {
        return this.rectangleRef.position
    }
    override getCenterPosition(): Point {
        return this.rectangleRef.centerPosition
    }
    override getSize(): Size {
        return this.rectangleRef.size
    }

    override setPosition(point: Point): Point {
        this.rectangleRef.setPosition(point)
        return point
    }
    override getId(): string {
        return this.id
    }
}