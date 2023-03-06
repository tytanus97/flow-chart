import { inject } from '@angular/core';
import { RectangleService } from './rectangle.service';
export class DraggableRectangle {

    restangleRef: RectangleService = inject(RectangleService)

}