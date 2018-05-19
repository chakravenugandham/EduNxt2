import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaceComponent } from './pace.component';

describe('PaceComponent', () => {
  let component: PaceComponent;
  let fixture: ComponentFixture<PaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
