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
        const collisionMap: Map<string, string[]> = new Map()

        const firstCollidable = collidable
        collisionMap.set(firstCollidable.getId(), collisionMap.get(firstCollidable.getId()) || [])

        this.checkCollisionForCollidable(firstCollidable, collidables, collisionMap)

    }

    private checkCollisionForCollidable(firstCollidable: ICollidable, allCollidables: ICollidable[], collisionMap: Map<string, string[]>) {
        for (let i = 0; i < allCollidables.length; i++) {
            const secondCollidable = allCollidables[i]
            if (firstCollidable === secondCollidable) continue

            collisionMap.set(secondCollidable.getId(), collisionMap.get(secondCollidable.getId()) || [])

            const firstCollisionArr = collisionMap.get(firstCollidable.getId())
            const secondCollisionArr = collisionMap.get(secondCollidable.getId())
            // if is the same rect

            if (!this.collisionAlreadyChecked(firstCollidable.getId(), secondCollidable.getId(), firstCollisionArr, secondCollisionArr)) {

                firstCollisionArr.push(secondCollidable.getId())
                secondCollisionArr.push(firstCollidable.getId())

                const collides = this.collisionDetectionService.collidesWith(firstCollidable, secondCollidable)
                if (collides) {
                    this.collisionResolverService.resolveCollision(firstCollidable, secondCollidable)
                }
            }
            collisionMap.set(firstCollidable.getId(), firstCollisionArr)
            collisionMap.set(secondCollidable.getId(), secondCollisionArr)
        }
    }

    private collisionAlreadyChecked(firstId: string, secondId: string, firstCollisionArr: string[], secondCollisionArr: string[]): boolean {
        return (firstCollisionArr.includes(secondId) && secondCollisionArr.includes(firstId))
    }
}