import { TestBed } from '@angular/core/testing';

import { CompanyListServiceService } from './company-list-service.service';

describe('CompanyListServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompanyListServiceService = TestBed.get(CompanyListServiceService);
    expect(service).toBeTruthy();
  });
});
