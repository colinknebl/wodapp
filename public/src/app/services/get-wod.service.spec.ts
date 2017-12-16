import { TestBed, inject } from '@angular/core/testing';

import { GetWodService } from './get-wod.service';

describe('GetWodService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetWodService]
    });
  });

  it('should be created', inject([GetWodService], (service: GetWodService) => {
    expect(service).toBeTruthy();
  }));
});
