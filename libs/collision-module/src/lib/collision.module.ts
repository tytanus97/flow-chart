import { NgModule } from '@angular/core';
import { CollisionDetectionService } from './collisionDetection.service';
import { CollisionResolverService } from './collisionResolver.service';
import { CollidableElementsHolderService } from './draggableElementsHolder.service';


@NgModule({
    imports: [],
    exports: [],
    providers: [CollisionDetectionService, CollisionResolverService, CollidableElementsHolderService],
})
export class CollisionModule { }
