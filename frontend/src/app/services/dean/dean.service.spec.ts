import { TestBed } from '@angular/core/testing';

import { DeanService } from './dean.service';

describe('DeanService', () => {
  let service: DeanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
