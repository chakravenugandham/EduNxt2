import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyactivitywidgetComponent } from './facultyactivitywidget.component';

describe('FacultyactivitywidgetComponent', () => {
  let component: FacultyactivitywidgetComponent;
  let fixture: ComponentFixture<FacultyactivitywidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultyactivitywidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyactivitywidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
