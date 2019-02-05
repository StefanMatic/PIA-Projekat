import { TestBed } from '@angular/core/testing';

import { CompanyOfferService } from './company-offer.service';

describe('CompanyOfferService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompanyOfferService = TestBed.get(CompanyOfferService);
    expect(service).toBeTruthy();
  });
});
