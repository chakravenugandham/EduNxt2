import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttentionNeedWidgetComponent } from './attention-need-widget.component';

describe('AttentionNeedWidgetComponent', () => {
  let component: AttentionNeedWidgetComponent;
  let fixture: ComponentFixture<AttentionNeedWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AttentionNeedWidgetComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttentionNeedWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create removeWidget', () => {
    let i;
    component.removeWidget(i);
    expect(component.removeWidget).toBeTruthy();
  });


});
