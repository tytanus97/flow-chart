import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementComponent } from '../element/element.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
@Component({
  selector: 'flow-chart-flow-chart-container',
  standalone: true,
  imports: [CommonModule, ElementComponent, DragDropModule],
  templateUrl: './flow-chart-container.component.html',
  styleUrls: ['./flow-chart-container.component.scss'],
})
export class FlowChartContainerComponent {
  @Input() width?: number
  @Input() height?: number
}
