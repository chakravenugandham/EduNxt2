import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeenRespondedComponent } from './seen-responded.component';

describe('SeenRespondedComponent', () => {
  let component: SeenRespondedComponent;
  let fixture: ComponentFixture<SeenRespondedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeenRespondedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeenRespondedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
