import { Point } from "@angular/cdk/drag-drop";
import { Size } from "@flow-chart/shared";

export abstract class ICollidable {

    isColliding = false

    abstract getPosition(): Point
    abstract getCenterPosition(): Point
    abstract getSize(): Size
    abstract setPosition(point: Point): Point
    abstract getId(): string
}