import { FullDonutDirective } from './full-donut.directive';
import { ElementRef } from '@angular/core';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'ht-test-component',
  template: `<div appFullDonut [data]="values"></div>`
})

class TestComponent {
  values = {};
}

describe('FullDonutDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let input: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, FullDonutDirective]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    input = fixture.debugElement.query(By.directive(FullDonutDirective));
  });


  it('should create an instance', () => {
    //const directive = new FullDonutDirective();
    expect(component).toBeTruthy();
  });
});
