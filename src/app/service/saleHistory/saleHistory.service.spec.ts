/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SaleHistoryService } from './saleHistory.service';

describe('Service: SaleHistory', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SaleHistoryService]
    });
  });

  it('should ...', inject([SaleHistoryService], (service: SaleHistoryService) => {
    expect(service).toBeTruthy();
  }));
});
