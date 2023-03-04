import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ElementComponent, FlowChartContainerComponent } from '@flow-chart/flow-chart-container'

@Component({
  selector: 'flow-chart-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [FlowChartContainerComponent, ElementComponent, CommonModule],
  providers: []
})
export class AppComponent {

  colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
  title = 'flow-chart';

  width?: number
  height?: number

  elements = [
    {
      text: '1',
      width: 100,
      height: 100,
      color: 'red'
    }, {
      text: '2',
      width: 100,
      height: 100,
      color: 'blue'
    }, {
      text: '3',
      width: 100,
      height: 100,
      color: 'green'
    }, {
      text: '4',
      width: 100,
      height: 100,
      color: 'purple'
    },
  ]

  @ViewChild('flowChartContainer')
  set flowChartContainer(element: ElementRef<HTMLElement>) {
    if (element) {
      this.width = element.nativeElement.clientWidth
      this.height = element.nativeElement.clientHeight
    }
  }


  addNewBlock() {
    this.elements.push({
      color: this.getRandomColor(),
      height: 100,
      width: 100,
      text: Math.round((Math.random() * 10)).toString()
    })
  }

  getRandomColor(): string {
    const range = this.colorArray.length
    const randomIndex = Math.round((Math.random() * range)) - 1

    return this.colorArray[randomIndex]
  }


}