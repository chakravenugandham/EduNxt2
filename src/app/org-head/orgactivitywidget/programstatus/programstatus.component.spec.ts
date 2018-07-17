import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramstatusComponent } from './programstatus.component';

describe('ProgramstatusComponent', () => {
  let component: ProgramstatusComponent;
  let fixture: ComponentFixture<ProgramstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
