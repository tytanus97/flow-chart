import { ICollidable } from '@flow-chart/draggable-element';
import { Injectable } from '@angular/core';
@Injectable()
export class CollisionDetectionService {

    collidesWith(firstRect: ICollidable, secondRect: ICollidable): boolean {
        return this.collidesHorizontally(firstRect, secondRect) &&
            this.collidesVertically(firstRect, secondRect)
    }

    // TODO write it simpler i.e more abstract
    private collidesHorizontally(firstRect: ICollidable, secondRect: ICollidable): boolean {
        const { x: firstRectX } = firstRect.getPosition()
        const { width: firstRectWidth } = firstRect.getSize()

        const { x: secondRectX } = secondRect.getPosition()
        const { width: secondRectWidth } = secondRect.getSize()

        return this.collides(firstRectX, firstRectWidth, secondRectX, secondRectWidth)
    }

    private collidesVertically(firstRect: ICollidable, secondRect: ICollidable): boolean {
        const { y: firstRectY } = firstRect.getPosition()
        const { height: firstRectHeight } = firstRect.getSize()

        const { y: secondRectY } = secondRect.getPosition()
        const { height: secondRectHeight } = secondRect.getSize()

        return this.collides(firstRectY, firstRectHeight, secondRectY, secondRectHeight)
    }

    private collides(firstPos: number, firstSize: number, secondPos: number, secondSize: number) {
        return (firstPos <= secondPos + secondSize) &&
            (firstPos + firstSize) >= secondPos
    }
}