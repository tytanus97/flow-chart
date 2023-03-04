import { PanzoomFacade } from './../panzoom-handler/panzoomFacade.service';
import { Component, ContentChildren, ElementRef, Input, QueryList, ViewChild } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { ElementComponent } from '../element/element.component';
import { CdkDrag, DragDropModule, DragRef, Point } from '@angular/cdk/drag-drop';
import { PanzoomAdapter } from '../panzoom-handler/panzoomAdapter.service';

@Component({
  selector: 'flow-chart-flow-chart-container',
  standalone: true,
  imports: [CommonModule, ElementComponent, DragDropModule, NgFor],
  templateUrl: './flow-chart-container.component.html',
  styleUrls: ['./flow-chart-container.component.scss'],
  providers: [PanzoomAdapter, PanzoomFacade]
})
export class FlowChartContainerComponent {
  @Input() width?: number
  @Input() height?: number

  dragConstrainPointMethod = this.dragConstrainPoint.bind(this)

  panzoomConfig = {
    maxZoom: 1,
    minZoom: 0.1,
  }


  private _flowChartElements: QueryList<ElementComponent>

  @ContentChildren(ElementComponent)
  set flowChartElements(elements: QueryList<ElementComponent>) {
    this._flowChartElements = elements
  }

  get flowChartElements(): QueryList<ElementComponent> {
    return this._flowChartElements
  }

  @ViewChild('panzoomWrapper')
  set panzoomWrapper(panzoomWrapper: ElementRef<HTMLDivElement>) {
    if (panzoomWrapper) {
      this.panzoomFacade.createPanzoom(panzoomWrapper.nativeElement, this.panzoomConfig)
    }
  }

  constructor(private readonly panzoomFacade: PanzoomFacade) {

  }

  onDragStarted() {
    this.panzoomFacade.pausePanzoom()
  }

  onDragEnded(event: any) {
    const cdkDrag = event.source as CdkDrag;
    cdkDrag.reset();
    this.panzoomFacade.resumePanzoom()

  }

  dragConstrainPoint(point: Point, dragRef: DragRef) {
    const zoomScale = this.panzoomFacade.getScale()
    let zoomMoveXDifference = 0;
    let zoomMoveYDifference = 0;
    console.log(
      'freeDragPosition dragRef: ' +
      Math.round(dragRef.getFreeDragPosition().x) +
      ' / ' +
      Math.round(dragRef.getFreeDragPosition().y)
    );

    if (zoomScale != 1) {
      zoomMoveXDifference =
        (1 - zoomScale) * dragRef.getFreeDragPosition().x;
      zoomMoveYDifference =
        (1 - zoomScale) * dragRef.getFreeDragPosition().y;
    }
    console.log(
      'zoomMoveXDifference x/y: ' +
      Math.round(zoomMoveXDifference) +
      ' / ' +
      Math.round(zoomMoveYDifference)
    );
    console.log(
      'Point x/y: ' + Math.round(point.x) + ' / ' + Math.round(point.y)
    );
    console.log(
      'Sum x/y: ' +
      Math.round(point.x + zoomMoveXDifference) +
      ' / ' +
      Math.round(point.y + zoomMoveYDifference)
    );

    return {
      x: point.x + zoomMoveXDifference,
      y: point.y + zoomMoveYDifference,
    };
  }


}
