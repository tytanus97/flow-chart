import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'flow-chart-custom-element',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-element.component.html',
  styleUrls: ['./custom-element.component.scss'],
})
export class CustomElementComponent {
  text = 'some text'

  addMoreText(event: Event) {
    event.preventDefault()
    this.text = this.text.concat(' some more textsome more textsome more text')
  }
}
