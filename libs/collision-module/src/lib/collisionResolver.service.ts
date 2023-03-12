import { BLOCK_MARGIN } from './collisionConsts';
import { Injectable } from "@angular/core";
import { ICollidable } from "./interfaces/ICollidable";
import { Vector2d } from '@flow-chart/shared';

@Injectable()
export class CollisionResolverService {

    resolveCollision(rectA: ICollidable, rectB: ICollidable) {

        const centerDiffVector = this.centerDifference(rectA, rectB)
        const overlapVector = this.overlapDifference(rectA, rectB, centerDiffVector)
        const magVector = this.magnitude(rectA, rectB)
        const directionVector: Vector2d = this.calculateDirectionVector(centerDiffVector)
        const transformVector = this.calculateTransformVector(rectA, magVector, directionVector, overlapVector)

        const newPosition = this.transformPosition(rectB, transformVector)
        rectB.setPosition(newPosition)
    }

    private calculateDirectionVector(centerDiffVector: Vector2d): Vector2d {
        const directionVector = {
            x: centerDiffVector.x === 0 ? 0 : -Math.sign(centerDiffVector.x),
            y: centerDiffVector.y === 0 ? 0 : -Math.sign(centerDiffVector.y)
        }

        if (directionVector.x === 0 && directionVector.y === 0) {
            directionVector.y = 1
        }

        return directionVector
    }
    private magnitude(rectA: ICollidable, rectB: ICollidable): Vector2d {
        const yMag = Math.min(1, (((rectA.getSize().height / 2) + rectB.getSize().height / 2) -
            Math.abs(rectA.getCenterPosition().y - rectB.getCenterPosition().y)) / rectA.getSize().height)
        const xMag = Math.min(1, (((rectA.getSize().width / 2) + rectB.getSize().width / 2) -
            Math.abs(rectA.getCenterPosition().x - rectB.getCenterPosition().x)) / rectA.getSize().width)
        return { x: xMag, y: yMag }
    }

    private centerDifference(rectA: ICollidable, rectB: ICollidable): Vector2d {
        const yDiff = rectA.getCenterPosition().y - rectB.getCenterPosition().y
        const xDiff = rectA.getCenterPosition().x - rectB.getCenterPosition().x

        return { x: xDiff, y: yDiff }
    }

    private overlapDifference(rectA: ICollidable, rectB: ICollidable, centerDiff: Vector2d
    ): Vector2d {

        const halfWidthSum = (rectA.getSize().width + rectB.getSize().width) / 2
        const halfHeightSum = (rectA.getSize().height + rectB.getSize().height) / 2


        const xOverlapDiff = halfWidthSum - Math.abs(centerDiff.x)
        const yOverlapDiff = halfHeightSum - Math.abs(centerDiff.y)


        return { x: xOverlapDiff, y: yOverlapDiff }
    }

    private transformPosition(rectangle: ICollidable, transformVector: Vector2d): Vector2d {
        const { x: rectX, y: rectY } = rectangle.getPosition()
        return {
            x: Math.round(rectX + transformVector.x),
            y: Math.round(rectY + transformVector.y)
        }
    }

    private calculateTransformVector(rectA: ICollidable, magVector: Vector2d, dirVector: Vector2d, overlapVector: Vector2d): Vector2d {
        const xVector = magVector.y < magVector.x ? 0 : overlapVector.x
        const yVector = magVector.x < magVector.y ? 0 : overlapVector.y
        return { x: (xVector + BLOCK_MARGIN / 2) * dirVector.x, y: (yVector + BLOCK_MARGIN / 2) * dirVector.y }
    }
}