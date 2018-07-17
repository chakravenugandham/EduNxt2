import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramcardComponent } from './programcard.component';

describe('ProgramcardComponent', () => {
  let component: ProgramcardComponent;
  let fixture: ComponentFixture<ProgramcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
