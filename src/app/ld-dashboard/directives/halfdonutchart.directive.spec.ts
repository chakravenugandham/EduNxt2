import { HalfdonutchartDirective } from './halfdonutchart.directive';
import { ElementRef } from '@angular/core';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'ht-test-component',
  template: `<div appHalfdonutchart [data]="values"></div>`
})
class TestComponent {
  values = {};
}

describe('HalfdonutchartDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let input: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, HalfdonutchartDirective]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    input = fixture.debugElement.query(By.directive(HalfdonutchartDirective));
  });


  it('should create an instance', () => {
    //const directive = new HalfdonutchartDirective();
    expect(component).toBeTruthy();
  });
});
