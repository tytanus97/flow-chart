import { RectangleService } from '../rectangle/rectangle.service';
import { Component, EventEmitter, Input, Output, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Point, DragRef, CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';
import { ConstraintDragPointCalculator } from '../drag-handler/constraintDragPointCalculator.service';
import { ResizeObserverDirective } from '../resize-handler/resizeHandler.directive';
import { DraggableRectangle } from '../rectangle/draggableRectangle';

@Component({
  selector: 'flow-chart-draggable-element',
  standalone: true,
  imports: [CommonModule, DragDropModule, ResizeObserverDirective],
  providers: [ConstraintDragPointCalculator, RectangleService],
  templateUrl: './draggable-element.component.html',
  styleUrls: ['./draggable-element.component.scss']
})
export class DraggableElementComponent extends DraggableRectangle {

  isDragged: boolean

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('id') set rectId(id: string) { this.id = id }
  @Input() zoomScale = 1;
  @Output() dragStart = new EventEmitter<void>();
  @Output() dragEnd = new EventEmitter<void>();

  @ViewChild('draggableRect', { static: true }) viewRectangle: ElementRef<HTMLDivElement>

  constructor(private readonly constraintDragPointCalculator: ConstraintDragPointCalculator) {
    super()
  }

  dragConstrainPoint = (point: Point, dragRef: DragRef) => {
    return this.constraintDragPointCalculator.calculateConstraintPoint(point, dragRef, this.zoomScale)
  };

  endDragging($event: any) {
    this.isDragged = false

    const elementMoving = $event.source.getRootElement();

    const { x, y } = this.constraintDragPointCalculator.calculatePositionAfterDrag(elementMoving, this.zoomScale)

    this.rectangleRef.setPosition({ x, y })

    const cdkDrag = $event.source as CdkDrag;
    cdkDrag.reset();
    this.dragEnd.emit();
  }

  dragStarted() {
    this.isDragged = true
    this.dragStart.emit()
  }
}
