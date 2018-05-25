import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserstrainedComponent } from './userstrained.component';

describe('UserstrainedComponent', () => {
  let component: UserstrainedComponent;
  let fixture: ComponentFixture<UserstrainedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserstrainedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserstrainedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
