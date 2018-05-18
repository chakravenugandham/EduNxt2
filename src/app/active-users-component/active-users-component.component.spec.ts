import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveUsersComponentComponent } from './active-users-component.component';

describe('ActiveUsersComponentComponent', () => {
  let component: ActiveUsersComponentComponent;
  let fixture: ComponentFixture<ActiveUsersComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveUsersComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveUsersComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
