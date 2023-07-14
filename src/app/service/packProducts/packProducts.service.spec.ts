/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PackProductsService } from './packProducts.service';

describe('Service: PackProducts', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PackProductsService]
    });
  });

  it('should ...', inject([PackProductsService], (service: PackProductsService) => {
    expect(service).toBeTruthy();
  }));
});
