import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtaBarComponent } from './cta-bar.component';

describe('CtaBarComponent', () => {
  let component: CtaBarComponent;
  let fixture: ComponentFixture<CtaBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtaBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtaBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
