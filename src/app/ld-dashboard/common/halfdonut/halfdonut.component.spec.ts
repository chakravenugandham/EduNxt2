import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HalfdonutComponent } from './halfdonut.component';

describe('HalfdonutComponent', () => {
  let component: HalfdonutComponent;
  let fixture: ComponentFixture<HalfdonutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HalfdonutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HalfdonutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
