import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentConsumptionFullviewComponent } from './content-consumption-fullview.component';

describe('ContentConsumptionFullviewComponent', () => {
  let component: ContentConsumptionFullviewComponent;
  let fixture: ComponentFixture<ContentConsumptionFullviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentConsumptionFullviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentConsumptionFullviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
