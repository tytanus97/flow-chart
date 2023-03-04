import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'flow-chart-element',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss'],
})
export class ElementComponent {
  @ViewChild(TemplateRef) template!: TemplateRef<any>
}