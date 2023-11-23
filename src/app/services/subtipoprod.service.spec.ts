import { TestBed } from '@angular/core/testing';

import { SubtipoprodService } from './subtipoprod.service';

describe('SubtipoprodService', () => {
  let service: SubtipoprodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubtipoprodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
