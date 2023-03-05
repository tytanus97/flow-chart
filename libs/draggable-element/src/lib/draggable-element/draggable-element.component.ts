import { OnDestroy } from '@angular/core';
import { Rectangle } from '../models/rectangle';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, AfterViewInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Point, DragRef, CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';
import { ConstraintDragPointCalculator } from '../drag-handler/constraintDragPointCalculator.service';
import { INITIAL_POSITION } from '../drag-handler/draggableElementConstraints';

@Component({
  selector: 'flow-chart-draggable-element',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  providers: [ConstraintDragPointCalculator, Rectangle],
  templateUrl: './draggable-element.component.html',
  styleUrls: ['./draggable-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DraggableElementComponent implements AfterViewInit, OnDestroy {

  @Input() zoomScale = 1;
  @Output() dragStart = new EventEmitter<void>();
  @Output() dragEnd = new EventEmitter<void>();

  @ViewChild('draggableRect', { static: true }) viewRectangle: ElementRef<HTMLDivElement>

  constructor(
    private readonly constraintDragPointCalculator: ConstraintDragPointCalculator,
    private readonly cdr: ChangeDetectorRef,
    public readonly rectangle: Rectangle) {
  }


  ngOnDestroy(): void {

  }

  ngAfterViewInit(): void {
    this.rectangle.setSize(
      {
        height: this.viewRectangle.nativeElement.clientHeight,
        width: this.viewRectangle.nativeElement.clientWidth
      })
  }

  dragConstrainPoint = (point: Point, dragRef: DragRef) => {
    return this.constraintDragPointCalculator.calculateConstraintPoint(point, dragRef, this.zoomScale)
  };

  startDragging() {
    this.dragStart.emit();
  }

  endDragging($event: any) {
    const elementMoving = $event.source.getRootElement();

    const { x, y } = this.constraintDragPointCalculator.calculatePositionAfterDrag(elementMoving, this.zoomScale)
    this.rectangle.position.x = x
    this.rectangle.position.y = y

    const cdkDrag = $event.source as CdkDrag;
    cdkDrag.reset();
    this.dragEnd.emit();
  }
}
