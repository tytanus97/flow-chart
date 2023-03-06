import { ICollidable } from './../../../../draggable-element/src/lib/interfaces/ICollidable';
import { DraggableElementsHolderService } from './../../../../collision-module/src/lib/draggable-elements-holder/draggableElementsHolder.service';
import { PanzoomConfigService } from './../panzoom-handler/panzoomConfig.service';
import { PanzoomFacade } from './../panzoom-handler/panzoomFacade.service';
import { Component, ContentChildren, ElementRef, Input, QueryList, ViewChild, OnInit, AfterViewInit, ViewChildren, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { ElementComponent } from '../element/element.component';
import { PanzoomAdapter } from '../panzoom-handler/panzoomAdapter.service';
import { PanzoomEventsService } from '../panzoom-handler/panzoomEvents.service';
import { Observable } from 'rxjs';
import { DraggableElementComponent } from '@flow-chart/draggable-element';

@Component({
  selector: 'flow-chart-flow-chart-container',
  standalone: true,
  templateUrl: './flow-chart-container.component.html',
  styleUrls: ['./flow-chart-container.component.scss'],
  providers: [PanzoomAdapter, PanzoomFacade, PanzoomEventsService, PanzoomConfigService, DraggableElementsHolderService],
  imports: [CommonModule, ElementComponent, NgFor, DraggableElementComponent]
})
export class FlowChartContainerComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() width?: number
  @Input() height?: number

  panzoomScale$: Observable<number>

  @ContentChildren(ElementComponent) flowChartElements: QueryList<ElementComponent>

  @ViewChild('panzoomWrapper', { static: true }) panzoomWrapper: ElementRef<HTMLDivElement>
  @ViewChildren(DraggableElementComponent)
  set draggableElements(draggableElements: QueryList<ICollidable>) {
    this.draggableElementsHolderService.setDraggableRectangles(draggableElements.toArray())
  }

  constructor(private readonly panzoomFacade: PanzoomFacade,
    private readonly panzoomEventsService: PanzoomEventsService,
    private readonly panzoomConfigService: PanzoomConfigService,
    private readonly draggableElementsHolderService: DraggableElementsHolderService) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);

  }
  ngAfterViewInit(): void {
    if (this.panzoomWrapper) {
      this.panzoomFacade.createPanzoom(this.panzoomWrapper.nativeElement, this.panzoomConfigService.getConfig())
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