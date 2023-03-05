import { PanzoomFacade } from './../panzoom-handler/panzoomFacade.service';
import { Component, ContentChildren, ElementRef, Input, QueryList, ViewChild, OnInit, AfterViewInit } from '@angular/core';
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
export class FlowChartContainerComponent implements OnInit, AfterViewInit {
  @Input() width?: number
  @Input() height?: number

  panzoomScale$: Observable<number>

  panzoomConfig = {
    maxZoom: 1.5,
    minZoom: 0.1,
    initialX: 0,
    initialY: 0,
  }

  @ContentChildren(ElementComponent) flowChartElements: QueryList<ElementComponent>

  @ViewChild('panzoomWrapper', { static: true }) panzoomWrapper: ElementRef<HTMLDivElement>

  constructor(private readonly panzoomFacade: PanzoomFacade,
    private readonly panzoomEventsService: PanzoomEventsService) {

  }
  ngAfterViewInit(): void {
    if (this.panzoomWrapper) {
      this.panzoomFacade.createPanzoom(this.panzoomWrapper.nativeElement, this.panzoomConfig)
    }
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

  trackByFn(index: number, element: ElementComponent) {
    return element.id
  }

}