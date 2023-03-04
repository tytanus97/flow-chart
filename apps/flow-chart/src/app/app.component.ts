import { Component, ElementRef, ViewChild } from '@angular/core';
import { FlowChartContainerComponent } from '@flow-chart/flow-chart-container'

@Component({
  selector: 'flow-chart-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [FlowChartContainerComponent],
  providers: []
})
export class AppComponent {
  title = 'flow-chart';

  width?: number
  height?: number

  @ViewChild('flowChartContainer')
  set flowChartContainer(element: ElementRef<HTMLElement>) {
    if (element) {
      this.width = element.nativeElement.clientWidth
      this.height = element.nativeElement.clientHeight
    }
  }
}
