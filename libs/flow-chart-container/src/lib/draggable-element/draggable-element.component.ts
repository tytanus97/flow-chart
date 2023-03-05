import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Point, DragRef, CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';
import { ConstraintDragPointCalculator } from '../drag-handler/constraintDragPointCalculator.service';

@Component({
  selector: 'flow-chart-draggable-element',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  providers: [ConstraintDragPointCalculator],
  templateUrl: './draggable-element.component.html',
  styleUrls: ['./draggable-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DraggableElementComponent {
  @Input() zoomScale = 1;
  @Input() pos = { x: 0, y: 0 };

  @Output() dragStart = new EventEmitter<void>();
  @Output() dragEnd = new EventEmitter<void>();

  constructor(private readonly constraintDragPointCalculator: ConstraintDragPointCalculator) {

  }

  dragConstrainPoint = (point: Point, dragRef: DragRef) => {
    return this.constraintDragPointCalculator.calculateConstraintPoint(point, dragRef, this.zoomScale)
  };

  startDragging() {
    console.log('onStart', this.pos)
    this.dragStart.emit();
  }

  endDragging($event: any) {
    console.log('END');
    const elementMoving = $event.source.getRootElement();
    const elementMovingRect = elementMoving.getBoundingClientRect() as DOMRect;
    const elementMovingParentElementRect = elementMoving.parentElement.getBoundingClientRect() as DOMRect;

    this.pos.x =
      (elementMovingRect.left - elementMovingParentElementRect.left) /
      this.zoomScale;
    this.pos.y =
      (elementMovingRect.top - elementMovingParentElementRect.top) /
      this.zoomScale;

    console.log('onEnd', this.pos)


    const cdkDrag = $event.source as CdkDrag;
    cdkDrag.reset();

    this.dragEnd.emit();
  }
}
