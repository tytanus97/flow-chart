import { AfterViewInit, ChangeDetectorRef, Component, ContentChildren, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from "@angular/core"
import { PanzoomAdapter } from "../../panzoom-handler/panzoomAdapter.service"
import { PanzoomFacade } from "../../panzoom-handler/panzoomFacade.service"
import { PanzoomEventsService } from "../../panzoom-handler/panzoomEvents.service"
import { PanzoomConfigService } from "../../panzoom-handler/panzoomConfig.service"
import { CommonModule, NgFor } from "@angular/common"
import { ElementComponent } from "../element/element.component"
import { DraggableElementComponent, DraggableRectangle } from "@flow-chart/draggable-element"
import { CollidableElementsHolderService, CollisionCheckerService, CollisionModule } from "@flow-chart/collision-module"
import { Observable } from "rxjs"
import { OutsideCallStackRunnerService } from "@flow-chart/shared"

@Component({
  selector: 'flow-chart-flow-chart-container',
  standalone: true,
  templateUrl: './flow-chart-container.component.html',
  styleUrls: ['./flow-chart-container.component.scss'],
  providers: [PanzoomAdapter, PanzoomFacade, PanzoomEventsService, PanzoomConfigService],
  imports: [CommonModule, ElementComponent, NgFor, DraggableElementComponent, CollisionModule]
})
export class FlowChartContainerComponent implements OnInit, AfterViewInit {
  @Input() width?: number
  @Input() height?: number

  panzoomScale$: Observable<number>

  @ContentChildren(ElementComponent) flowChartElements: QueryList<ElementComponent>

  @ViewChild('panzoomWrapper', { static: true }) panzoomWrapper: ElementRef<HTMLDivElement>
  @ViewChildren(DraggableElementComponent)
  set draggableElements(draggableElements: QueryList<DraggableRectangle>) {
    this.collidableElementsHolderService.collidableElements = draggableElements.toArray()

    OutsideCallStackRunnerService.execute(() => {
      this.collisionChecker.checkCollisions()
      this.cdRef.detectChanges()
    })

  }

  constructor(private readonly panzoomFacade: PanzoomFacade,
    private readonly panzoomEventsService: PanzoomEventsService,
    private readonly panzoomConfigService: PanzoomConfigService,
    private readonly collidableElementsHolderService: CollidableElementsHolderService,
    private readonly collisionChecker: CollisionCheckerService,
    private readonly cdRef: ChangeDetectorRef
  ) {
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

  onDragEnded(draggableElementComponent: DraggableElementComponent) {
    this.panzoomFacade.resumePanzoom()
    this.collisionChecker.checkCollisions(draggableElementComponent)
    this.cdRef.detectChanges()
  }

  onDraggableElementSizeChanged(draggableElementComponent: DraggableElementComponent) {
    this.collisionChecker.checkCollisions(draggableElementComponent)
    this.cdRef.detectChanges()
  }

  onMouseDown() {
    this.panzoomFacade.pausePanzoom()
  }

  onMouseUp() {
    this.panzoomFacade.resumePanzoom()
  }

  trackByFn(index: number, element: ElementComponent) {
    return element.id
  }

}