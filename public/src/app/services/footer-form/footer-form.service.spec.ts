import { TestBed, inject } from '@angular/core/testing';

import { FooterFormService } from './footer-form.service';

describe('FooterFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FooterFormService]
    });
  });

  it('should be created', inject([FooterFormService], (service: FooterFormService) => {
    expect(service).toBeTruthy();
  }));
});
