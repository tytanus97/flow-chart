import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'flow-chart-element',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss'],
})
export class ElementComponent {
  @Input() id: string
  @ViewChild(TemplateRef) template: TemplateRef<HTMLElement>
}
