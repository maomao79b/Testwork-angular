/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AcceptProductService } from './acceptProduct.service';

describe('Service: AcceptProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AcceptProductService]
    });
  });

  it('should ...', inject([AcceptProductService], (service: AcceptProductService) => {
    expect(service).toBeTruthy();
  }));
});
