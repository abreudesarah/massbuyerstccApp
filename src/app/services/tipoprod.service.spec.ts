import { TestBed } from '@angular/core/testing';

import { TipoprodService } from './tipoprod.service';

describe('TipoprodService', () => {
  let service: TipoprodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoprodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
