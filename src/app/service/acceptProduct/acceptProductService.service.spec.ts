/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AcceptProductServiceService } from './acceptProductService.service';

describe('Service: AcceptProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AcceptProductServiceService]
    });
  });

  it('should ...', inject([AcceptProductServiceService], (service: AcceptProductServiceService) => {
    expect(service).toBeTruthy();
  }));
});
