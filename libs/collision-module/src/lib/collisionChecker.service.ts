import { Injectable } from '@angular/core';
import { CollisionDetectionService, ICollidable } from '@flow-chart/collision-module';
import { CollisionResolverService } from "./collisionResolver.service"
import { CollidableElementsHolderService } from "./draggableElementsHolder.service"

@Injectable()
export class CollisionCheckerService {

    constructor(private readonly draggableElementsHolderService: CollidableElementsHolderService,
        private readonly collisionResolverService: CollisionResolverService,
        private readonly collisionDetectionService: CollisionDetectionService) { }

    checkCollisions(collidable: ICollidable) {
        const collidables = this.draggableElementsHolderService.collidableElements
        // check collision first for origin
        const origin = collidable

        this.checkCollisionForCollidable(origin, collidables)

    }

    private checkCollisionForCollidable(origin: ICollidable, allCollidables: ICollidable[]) {
        console.log('check')
        for (let i = 0; i < allCollidables.length; i++) {
            const secondCollidable = allCollidables[i]

            if (origin === secondCollidable) continue

            if (this.collisionDetectionService.collidesWith(origin, secondCollidable)) {
                this.collisionResolverService.resolveCollision(origin, secondCollidable)
                this.checkCollisionForCollidable(secondCollidable, allCollidables)
            }
        }
    }
}