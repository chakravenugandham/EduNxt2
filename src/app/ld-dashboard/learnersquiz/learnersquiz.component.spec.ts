import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnersquizComponent } from './learnersquiz.component';

describe('LearnersquizComponent', () => {
  let component: LearnersquizComponent;
  let fixture: ComponentFixture<LearnersquizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnersquizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnersquizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
