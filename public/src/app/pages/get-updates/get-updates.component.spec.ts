import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetUpdatesComponent } from './get-updates.component';

describe('GetUpdatesComponent', () => {
  let component: GetUpdatesComponent;
  let fixture: ComponentFixture<GetUpdatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetUpdatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetUpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
