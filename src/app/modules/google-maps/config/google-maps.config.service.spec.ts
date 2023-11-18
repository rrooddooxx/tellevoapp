import { TestBed } from '@angular/core/testing';

import { GoogleMapsConfigService } from './google-maps.config.service';

describe('GoogleMapsConfigService', () => {
  let service: GoogleMapsConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleMapsConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
