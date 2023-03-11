import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowChartContainerComponent } from './flow-chart-container.component';

describe('FlowChartContainerComponent', () => {
  let component: FlowChartContainerComponent;
  let fixture: ComponentFixture<FlowChartContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlowChartContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlowChartContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
