import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestprogramsfullviewComponent } from './bestprogramsfullview.component';

describe('BestprogramsfullviewComponent', () => {
  let component: BestprogramsfullviewComponent;
  let fixture: ComponentFixture<BestprogramsfullviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestprogramsfullviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestprogramsfullviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
