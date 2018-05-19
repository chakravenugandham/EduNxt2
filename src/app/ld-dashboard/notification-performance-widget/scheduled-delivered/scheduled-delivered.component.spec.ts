import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledDeliveredComponent } from './scheduled-delivered.component';

describe('ScheduledDeliveredComponent', () => {
  let component: ScheduledDeliveredComponent;
  let fixture: ComponentFixture<ScheduledDeliveredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduledDeliveredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduledDeliveredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
