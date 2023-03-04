import { PanzoomFacade } from './../panzoom-handler/panzoomFacade.service';
import { Component, ContentChildren, ElementRef, Input, QueryList, ViewChild, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { ElementComponent } from '../element/element.component';
import { PanzoomAdapter } from '../panzoom-handler/panzoomAdapter.service';
import { DraggableElementComponent } from "../draggable-element/draggable-element.component";
import { PanzoomEventsService } from '../panzoom-handler/panzoomEvents.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'flow-chart-flow-chart-container',
  standalone: true,
  templateUrl: './flow-chart-container.component.html',
  styleUrls: ['./flow-chart-container.component.scss'],
  providers: [PanzoomAdapter, PanzoomFacade, PanzoomEventsService],
  imports: [CommonModule, ElementComponent, NgFor, DraggableElementComponent]
})
export class FlowChartContainerComponent implements OnInit {
  @Input() width?: number
  @Input() height?: number

  panzoomScale$: Observable<number>

  panzoomConfig = {
    maxZoom: 1.5,
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

  constructor(private readonly panzoomFacade: PanzoomFacade,
    private readonly panzoomEventsService: PanzoomEventsService) {

  }

  ngOnInit(): void {
    this.panzoomScale$ = this.panzoomEventsService.scaleChanged.asObservable()
  }

  onDragStarted() {
    this.panzoomFacade.pausePanzoom()
  }

  onDragEnded() {
    this.panzoomFacade.resumePanzoom()
  }

}