import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Point, DragRef, CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'flow-chart-draggable-element',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './draggable-element.component.html',
  styleUrls: ['./draggable-element.component.scss'],
})
export class DraggableElementComponent {
  @Input() zoomScale = 1;
  @Input() pos = { x: 0, y: 0 };

  @Output() dragStart = new EventEmitter<any>();
  @Output() dragEnd = new EventEmitter<any>();

  dragConstrainPoint = (point: Point, dragRef: DragRef) => {


    let zoomMoveXDifference = 0;
    let zoomMoveYDifference = 0;

    if (this.zoomScale != 1) {
      zoomMoveXDifference =
        (1 - this.zoomScale) * dragRef.getFreeDragPosition().x;
      zoomMoveYDifference =
        (1 - this.zoomScale) * dragRef.getFreeDragPosition().y;
    }



    return {
      x: point.x + zoomMoveXDifference,
      y: point.y + zoomMoveYDifference,
    };
  };

  startDragging($event: any) {
    console.log('START');
    this.dragStart.emit();
  }

  endDragging($event: any) {
    console.log('END');
    const elementMoving = $event.source.getRootElement();
    const elementMovingRect = elementMoving.getBoundingClientRect() as DOMRect;
    const elementMovingParentElementRect = elementMoving.parentElement.getBoundingClientRect() as DOMRect;
    /* The getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
    This method returns a DOMRect object with eight properties: left, top, right, bottom, x, y, width, height. https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_element_getboundingclientrect*/

    this.pos.x =
      (elementMovingRect.left - elementMovingParentElementRect.left) /
      this.zoomScale;
    this.pos.y =
      (elementMovingRect.top - elementMovingParentElementRect.top) /
      this.zoomScale;

    const cdkDrag = $event.source as CdkDrag;
    cdkDrag.reset();

    this.dragEnd.emit();
  }
}
