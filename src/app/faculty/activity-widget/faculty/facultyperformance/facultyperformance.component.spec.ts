import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyperformanceComponent } from './facultyperformance.component';

describe('FacultyperformanceComponent', () => {
  let component: FacultyperformanceComponent;
  let fixture: ComponentFixture<FacultyperformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultyperformanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyperformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
