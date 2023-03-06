import { RectangleService } from '../rectangle/rectangle.service';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Point, DragRef, CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';
import { ConstraintDragPointCalculator } from '../drag-handler/constraintDragPointCalculator.service';
import { ResizeObserverDirective } from '../resize-handler/resizeHandler.directive';

@Component({
  selector: 'flow-chart-draggable-element',
  standalone: true,
  imports: [CommonModule, DragDropModule, ResizeObserverDirective],
  providers: [ConstraintDragPointCalculator, RectangleService],
  templateUrl: './draggable-element.component.html',
  styleUrls: ['./draggable-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DraggableElementComponent {

  isDragged: boolean

  @Input() zoomScale = 1;
  @Output() dragStart = new EventEmitter<void>();
  @Output() dragEnd = new EventEmitter<void>();

  @ViewChild('draggableRect', { static: true }) viewRectangle: ElementRef<HTMLDivElement>

  constructor(
    private readonly constraintDragPointCalculator: ConstraintDragPointCalculator,
    public readonly rectangle: RectangleService) {
  }

  dragConstrainPoint = (point: Point, dragRef: DragRef) => {
    return this.constraintDragPointCalculator.calculateConstraintPoint(point, dragRef, this.zoomScale)
  };

  endDragging($event: any) {
    this.isDragged = false

    const elementMoving = $event.source.getRootElement();

    const { x, y } = this.constraintDragPointCalculator.calculatePositionAfterDrag(elementMoving, this.zoomScale)
    this.rectangle.position.x = x
    this.rectangle.position.y = y

    const cdkDrag = $event.source as CdkDrag;
    cdkDrag.reset();
    this.dragEnd.emit();
  }

  dragStarted() {
    this.isDragged = true


    this.dragStart.emit()
  }
}
