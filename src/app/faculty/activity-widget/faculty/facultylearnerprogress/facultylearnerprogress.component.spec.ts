import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultylearnerprogressComponent } from './facultylearnerprogress.component';

describe('FacultylearnerprogressComponent', () => {
  let component: FacultylearnerprogressComponent;
  let fixture: ComponentFixture<FacultylearnerprogressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultylearnerprogressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultylearnerprogressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
