import { TestBed } from '@angular/core/testing';

import { BookTripService } from './book-trip.service';

describe('BookTripService', () => {
  let service: BookTripService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookTripService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
