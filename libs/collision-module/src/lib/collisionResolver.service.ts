import { BLOCK_MARGIN } from './collisionConsts';
import { Injectable } from "@angular/core";
import { ICollidable } from "./interfaces/ICollidable";

@Injectable()
export class CollisionResolverService {

    resolveCollision(rectA: ICollidable, rectB: ICollidable) {

        const { xDiff, yDiff } = this.centerDifference(rectA, rectB)
        const { xMag, yMag } = this.magnitude(rectA, rectB)
        const transformVector = this.calculateTransformVector(rectA, xMag, yMag, xDiff, yDiff)
        const newPosition = this.transformPosition(rectB, transformVector)
        rectB.setPosition(newPosition)
    }

    private magnitude(rectA: ICollidable, rectB: ICollidable) {
        const yMag = 1 - ((((rectA.getSize().height / 2) + rectB.getSize().height / 2) -
            Math.abs(rectA.getCenterPosition().y - rectB.getCenterPosition().y)) / rectA.getSize().height)
        const xMag = 1 - ((((rectA.getSize().width / 2) + rectB.getSize().width / 2) -
            Math.abs(rectA.getCenterPosition().x - rectB.getCenterPosition().x)) / rectA.getSize().width)

        return { xMag, yMag }
    }

    private centerDifference(rectA: ICollidable, rectB: ICollidable) {
        const yDiff = rectA.getCenterPosition().y - rectB.getCenterPosition().y
        const xDiff = rectA.getCenterPosition().x - rectB.getCenterPosition().x

        return { xDiff, yDiff }
    }

    private transformPosition(rectangle: ICollidable, transformVector: { x: number, y: number }): { x: number, y: number } {
        const { x: rectX, y: rectY } = rectangle.getPosition()
        return {
            x: Math.round(rectX + transformVector.x),
            y: Math.round(rectY + transformVector.y)
        }
    }

    private calculateTransformVector(rectA: ICollidable, xMag: number, yMag: number, xDiff: number, yDiff: number): { x: number, y: number } {
        let xVector = (rectA.getSize().width / 2) * xMag * (xDiff === 0 ? 0 : -Math.sign(xDiff))
        let yVector = (rectA.getSize().height / 2) * yMag * (yDiff === 0 ? 0 : -Math.sign(yDiff))

        if (xMag <= yMag) {
            yVector = ((rectA.getSize().height + (BLOCK_MARGIN / 2)) - Math.abs(yDiff)) * (yDiff === 0 ? 0 : -Math.sign(yDiff))
        }

        if (yMag <= xMag) {
            xVector = ((rectA.getSize().width + (BLOCK_MARGIN / 2)) - Math.abs(xDiff)) * (xDiff === 0 ? 0 : -Math.sign(xDiff))
        }

        return { x: xVector, y: yVector }
    }
}