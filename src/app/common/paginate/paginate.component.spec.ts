import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginateComponent } from './paginate.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

describe('PaginateComponent', () => {
  let component: PaginateComponent;
  let fixture: ComponentFixture<PaginateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaginateComponent],
      imports: [NgbModule.forRoot(), FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginateComponent);
    component = fixture.componentInstance;
    component.pageInfo = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create loadPage', () => {
    component.loadPage(event);
    expect(component.loadPage).toBeTruthy();
  });

  xit('should create blockSpecialChar', () => {
    let e;
    component.blockSpecialChar(e);
    expect(component.blockSpecialChar).toBeTruthy();
  });


});
