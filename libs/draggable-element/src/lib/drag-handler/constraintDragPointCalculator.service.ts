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
            x: Math.round(point.x + zoomMoveXDifference),
            y: Math.round(point.y + zoomMoveYDifference),
        };
    }

    calculatePositionAfterDrag(elementMoving: any, zoomScale: number): Point {
        const elementMovingRect = elementMoving.getBoundingClientRect() as DOMRect;
        const elementMovingParentElementRect = elementMoving.parentElement.getBoundingClientRect() as DOMRect

        return {
            x: Math.round((elementMovingRect.left - elementMovingParentElementRect.left) / zoomScale),
            y: Math.round((elementMovingRect.top - elementMovingParentElementRect.top) / zoomScale)
        }
    }
}