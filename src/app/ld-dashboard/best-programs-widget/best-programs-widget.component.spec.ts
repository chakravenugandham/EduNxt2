import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestProgramsWidgetComponent } from './best-programs-widget.component';

describe('BestProgramsWidgetComponent', () => {
  let component: BestProgramsWidgetComponent;
  let fixture: ComponentFixture<BestProgramsWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestProgramsWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestProgramsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
