import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Point, DragRef, CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';
import { ConstraintDragPointCalculator } from '../drag-handler/constraintDragPointCalculator.service';
import { INITIAL_POSITION } from '../drag-handler/draggableElementConstraints';

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

  pos = { ...INITIAL_POSITION }

  @Output() dragStart = new EventEmitter<void>();
  @Output() dragEnd = new EventEmitter<void>();

  constructor(private readonly constraintDragPointCalculator: ConstraintDragPointCalculator) {
  }

  dragConstrainPoint = (point: Point, dragRef: DragRef) => {
    return this.constraintDragPointCalculator.calculateConstraintPoint(point, dragRef, this.zoomScale)
  };

  startDragging() {
    this.dragStart.emit();
  }

  endDragging($event: any) {
    console.log('END');
    const elementMoving = $event.source.getRootElement();
    const elementMovingRect = elementMoving.getBoundingClientRect() as DOMRect;
    const elementMovingParentElementRect = elementMoving.parentElement.getBoundingClientRect() as DOMRect;

    const { x, y } = this.constraintDragPointCalculator.calculatePositionAfterDrag(elementMovingRect, elementMovingParentElementRect, this.zoomScale)
    this.pos.x = x
    this.pos.y = y

    const cdkDrag = $event.source as CdkDrag;
    cdkDrag.reset();
    this.dragEnd.emit();
  }
}
