import { TestBed } from '@angular/core/testing';

import { CompanyApplicationService } from './company-application.service';

describe('CompanyApplicationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompanyApplicationService = TestBed.get(CompanyApplicationService);
    expect(service).toBeTruthy();
  });
});
