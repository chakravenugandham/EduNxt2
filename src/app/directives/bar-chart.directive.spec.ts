import { BarChartDirective } from './bar-chart.directive';
import { ElementRef } from '@angular/core';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'ht-test-component',
  template: `<div appBarChart [data]='values'></div>`
})
class TestComponent {
  values = [];
}

describe('BarChartDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let input: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, BarChartDirective]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    input = fixture.debugElement.query(By.directive(BarChartDirective));
  });


  it('should create an instance', () => {
    //const directive = new BarChartDirective();
    expect(component).toBeTruthy();
  });
});
