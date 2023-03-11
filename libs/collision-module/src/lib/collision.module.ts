import { NgModule } from '@angular/core';
import { CollisionDetectionService } from './collisionDetection.service';
import { CollisionResolverService } from './collisionResolver.service';
import { CollidableElementsHolderService } from './draggableElementsHolder.service';
import { CollisionCheckerService } from './collisionChecker.service';


@NgModule({
    imports: [],
    exports: [],
    providers: [
        CollisionCheckerService,
        CollisionDetectionService,
        CollisionResolverService,
        CollidableElementsHolderService,
    ],
})
export class CollisionModule { }
