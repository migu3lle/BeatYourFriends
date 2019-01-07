import { TestBed } from '@angular/core/testing';

import { BrowserStorageService } from './storage.service';

describe('StorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BrowserStorageService = TestBed.get(BrowserStorageService);
    expect(service).toBeTruthy();
  });
});
