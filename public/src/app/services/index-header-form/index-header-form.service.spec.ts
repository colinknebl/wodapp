import { TestBed, inject } from '@angular/core/testing';

import { IndexHeaderFormService } from './index-header-form.service';

describe('IndexHeaderFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IndexHeaderFormService]
    });
  });

  it('should be created', inject([IndexHeaderFormService], (service: IndexHeaderFormService) => {
    expect(service).toBeTruthy();
  }));
});
