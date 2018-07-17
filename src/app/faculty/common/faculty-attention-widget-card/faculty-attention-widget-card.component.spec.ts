import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyAttentionWidgetCardComponent } from './faculty-attention-widget-card.component';

describe('FacultyAttentionWidgetCardComponent', () => {
  let component: FacultyAttentionWidgetCardComponent;
  let fixture: ComponentFixture<FacultyAttentionWidgetCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultyAttentionWidgetCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyAttentionWidgetCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
