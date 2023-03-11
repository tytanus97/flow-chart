import { ICollidable } from '@flow-chart/draggable-element';
import { Injectable } from "@angular/core";

@Injectable()
export class CollisionResolverService {

    resolveCollision(rectA: ICollidable, rectB: ICollidable) {
        const yDiff = rectA.getCenterPosition().y - rectB.getCenterPosition().y
        const xDiff = rectA.getCenterPosition().x - rectB.getCenterPosition().x

        const yMag = ((rectA.getSize().height / 2) + rectB.getSize().height / 2) - Math.abs(rectA.getCenterPosition().y - rectB.getCenterPosition().y)
        const xMag = ((rectA.getSize().width / 2) + rectB.getSize().width / 2) - Math.abs(rectA.getCenterPosition().x - rectB.getCenterPosition().x)

        console.log('log datra');

        console.log('yDiff', yDiff)
        console.log('xDiff', xDiff)
        console.log('yMag', yMag)
        console.log('xMag', xMag)

    }
}