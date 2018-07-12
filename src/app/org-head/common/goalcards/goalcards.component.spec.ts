import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalcardsComponent } from './goalcards.component';

describe('GoalcardsComponent', () => {
  let component: GoalcardsComponent;
  let fixture: ComponentFixture<GoalcardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalcardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
