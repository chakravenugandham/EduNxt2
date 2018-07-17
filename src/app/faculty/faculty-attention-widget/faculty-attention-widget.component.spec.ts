import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyAttentionWidgetComponent } from './faculty-attention-widget.component';

describe('FacultyAttentionWidgetComponent', () => {
  let component: FacultyAttentionWidgetComponent;
  let fixture: ComponentFixture<FacultyAttentionWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultyAttentionWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyAttentionWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
