import { TestBed } from '@angular/core/testing';

import { Firebase2Service } from './firebase2.service';

describe('Firebase2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Firebase2Service = TestBed.get(Firebase2Service);
    expect(service).toBeTruthy();
  });
});
