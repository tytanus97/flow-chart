import { NgFor } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ElementComponent, FlowChartContainerComponent } from '@flow-chart/flow-chart-container'

@Component({
  selector: 'flow-chart-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [FlowChartContainerComponent, ElementComponent, NgFor],
  providers: []
})
export class AppComponent {
  title = 'flow-chart';

  width?: number
  height?: number

  elements = [
    {
      text: '1'
    }, {
      text: '2'
    }, {
      text: '3'
    }, {
      text: '4'
    },
  ]

  @ViewChild('flowChartContainer')
  set flowChartContainer(element: ElementRef<HTMLElement>) {
    if (element) {
      this.width = element.nativeElement.clientWidth
      this.height = element.nativeElement.clientHeight
    }
  }
}
