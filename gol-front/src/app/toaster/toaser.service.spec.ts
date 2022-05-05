import { TestBed } from '@angular/core/testing';

import { ToaserService } from './toaser.service';

describe('ToaserService', () => {
  let service: ToaserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToaserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
