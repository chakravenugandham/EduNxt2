import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseInsightWidgetComponent } from './course-insight-widget.component';

describe('CourseInsightWidgetComponent', () => {
  let component: CourseInsightWidgetComponent;
  let fixture: ComponentFixture<CourseInsightWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseInsightWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseInsightWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
