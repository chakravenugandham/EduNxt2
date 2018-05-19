import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentPerformanceComponent } from './content-performance.component';

describe('ContentPerformanceComponent', () => {
  let component: ContentPerformanceComponent;
  let fixture: ComponentFixture<ContentPerformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentPerformanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
