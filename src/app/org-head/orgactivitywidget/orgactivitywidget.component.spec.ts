import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgactivitywidgetComponent } from './orgactivitywidget.component';

describe('OrgactivitywidgetComponent', () => {
  let component: OrgactivitywidgetComponent;
  let fixture: ComponentFixture<OrgactivitywidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgactivitywidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgactivitywidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
