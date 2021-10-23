import { TestBed } from '@angular/core/testing';

import { MagentoApiServiceService } from './api-service.service';

describe('ApiServiceService', () => {
  let service: MagentoApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MagentoApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
