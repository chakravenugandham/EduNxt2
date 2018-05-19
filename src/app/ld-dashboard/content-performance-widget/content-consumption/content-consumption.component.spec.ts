import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentConsumptionComponent } from './content-consumption.component';

describe('ContentConsumptionComponent', () => {
  let component: ContentConsumptionComponent;
  let fixture: ComponentFixture<ContentConsumptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentConsumptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentConsumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
