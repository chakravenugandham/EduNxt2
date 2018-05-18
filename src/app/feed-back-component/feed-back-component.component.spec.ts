import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedBackComponentComponent } from './feed-back-component.component';

describe('FeedBackComponentComponent', () => {
  let component: FeedBackComponentComponent;
  let fixture: ComponentFixture<FeedBackComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedBackComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedBackComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
