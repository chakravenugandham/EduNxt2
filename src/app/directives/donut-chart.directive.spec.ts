import { DonutChartDirective } from './donut-chart.directive';
import { ElementRef } from '@angular/core';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'ht-test-component',
  template: `<div appDonutChart [data]='values'></div>`
})
class TestComponent {
  values = [];
}

describe('DonutChartDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let input: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, DonutChartDirective]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    input = fixture.debugElement.query(By.directive(DonutChartDirective));
  });

  it('should create an instance', () => {
    //const directive = new DonutChartDirective();
    expect(component).toBeTruthy();
  });
});
