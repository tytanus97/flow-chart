import { Component, ContentChildren, Input, QueryList, TemplateRef } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { ElementComponent } from '../element/element.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
@Component({
  selector: 'flow-chart-flow-chart-container',
  standalone: true,
  imports: [CommonModule, ElementComponent, DragDropModule, NgFor],
  templateUrl: './flow-chart-container.component.html',
  styleUrls: ['./flow-chart-container.component.scss'],
  providers: []
})
export class FlowChartContainerComponent {
  @Input() width?: number
  @Input() height?: number

  @ContentChildren(ElementComponent) flowChartElements?: QueryList<ElementComponent>
}
