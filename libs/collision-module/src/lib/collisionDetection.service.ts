import { ICollidable } from '@flow-chart/draggable-element';
import { Injectable } from '@angular/core';
import { DraggableElementsHolderService } from './draggableElementsHolder.service';
import { BLOCK_MARGIN } from './collisionConsts';
@Injectable()
export class CollisionDetectionService {
    constructor(private readonly draggableElementsHolderService: DraggableElementsHolderService) { }

    checkCollisions() {
        const rectangles = this.draggableElementsHolderService.draggableElements
        for (let i = 0; i < rectangles.length; i++) {
            let collides = false
            for (let j = 0; j < rectangles.length; j++) {
                if (rectangles[i] === rectangles[j]) continue
                collides = collides || this.collidesWith(rectangles[i], rectangles[j])
            }
            rectangles[i].isColliding = collides
        }
    }

    private collidesWith(firstRect: ICollidable, secondRect: ICollidable): boolean {
        return this.collidesHorizontally(firstRect, secondRect) &&
            this.collidesVertically(firstRect, secondRect)
    }

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