import { TestBed } from '@angular/core/testing';

import { PwnedService } from './pwned.service';

describe('PwnedService', () => {
  let service: PwnedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PwnedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
