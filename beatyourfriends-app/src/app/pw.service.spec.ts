import { TestBed } from '@angular/core/testing';

import { PwService } from './pw.service';

describe('PwService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PwService = TestBed.get(PwService);
    expect(service).toBeTruthy();
  });
});
