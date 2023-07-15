/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SalePageComponent } from './salePage.component';

describe('SalePageComponent', () => {
  let component: SalePageComponent;
  let fixture: ComponentFixture<SalePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
