import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LdDashboardComponent } from './ld-dashboard.component';

describe('LdDashboardComponent', () => {
  let component: LdDashboardComponent;
  let fixture: ComponentFixture<LdDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LdDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LdDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
