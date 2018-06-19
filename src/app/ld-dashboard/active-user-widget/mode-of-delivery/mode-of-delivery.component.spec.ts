import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { ModeOfDeliveryComponent } from './mode-of-delivery.component';

fdescribe('ModeOfDeliveryComponent', () => {
  let component: ModeOfDeliveryComponent;
  let fixture: ComponentFixture<ModeOfDeliveryComponent>;
  let inputEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModeOfDeliveryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeOfDeliveryComponent);
    component = fixture.componentInstance;
    component.usersData = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
