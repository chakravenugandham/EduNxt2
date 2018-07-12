import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentoverviewComponent } from './assignmentoverview.component';

describe('AssignmentoverviewComponent', () => {
  let component: AssignmentoverviewComponent;
  let fixture: ComponentFixture<AssignmentoverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentoverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
