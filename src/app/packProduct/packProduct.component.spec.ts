/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PackProductComponent } from './packProduct.component';

describe('PackProductComponent', () => {
  let component: PackProductComponent;
  let fixture: ComponentFixture<PackProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
