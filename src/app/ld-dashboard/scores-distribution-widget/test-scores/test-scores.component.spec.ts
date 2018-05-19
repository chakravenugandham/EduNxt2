import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestScoresComponent } from './test-scores.component';

describe('TestScoresComponent', () => {
  let component: TestScoresComponent;
  let fixture: ComponentFixture<TestScoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestScoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
