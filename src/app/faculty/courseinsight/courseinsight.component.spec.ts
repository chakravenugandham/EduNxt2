import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseinsightComponent } from './courseinsight.component';

describe('CourseinsightComponent', () => {
  let component: CourseinsightComponent;
  let fixture: ComponentFixture<CourseinsightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseinsightComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseinsightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
