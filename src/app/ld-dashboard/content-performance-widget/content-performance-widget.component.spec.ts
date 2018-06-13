import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentPerformanceWidgetComponent } from './content-performance-widget.component';

describe('ContentPerformanceComponent', () => {
  let component: ContentPerformanceWidgetComponent;
  let fixture: ComponentFixture<ContentPerformanceWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContentPerformanceWidgetComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentPerformanceWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
