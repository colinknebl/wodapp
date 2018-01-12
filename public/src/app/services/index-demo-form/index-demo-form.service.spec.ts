import { TestBed, inject } from '@angular/core/testing';

import { IndexDemoFormService } from './index-demo-form.service';

describe('IndexDemoFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IndexDemoFormService]
    });
  });

  it('should be created', inject([IndexDemoFormService], (service: IndexDemoFormService) => {
    expect(service).toBeTruthy();
  }));
});
