import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveUserWidgetComponent } from './active-user-widget.component';

describe('ActiveUserWidgetComponent', () => {
  let component: ActiveUserWidgetComponent;
  let fixture: ComponentFixture<ActiveUserWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveUserWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveUserWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
