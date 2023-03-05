import { DragRef, Point } from "@angular/cdk/drag-drop";
import { Injectable } from "@angular/core";

@Injectable()
export class ConstraintDragPointCalculator {


    calculateConstraintPoint(point: Point, dragRef: DragRef, zoomScale: number): Point {
        let zoomMoveXDifference = 0;
        let zoomMoveYDifference = 0;

        if (zoomScale != 1) {
            zoomMoveXDifference =
                (1 - zoomScale) * dragRef.getFreeDragPosition().x;
            zoomMoveYDifference =
                (1 - zoomScale) * dragRef.getFreeDragPosition().y;
        }

        return {
            x: point.x + zoomMoveXDifference,
            y: point.y + zoomMoveYDifference,
        };
    }
}