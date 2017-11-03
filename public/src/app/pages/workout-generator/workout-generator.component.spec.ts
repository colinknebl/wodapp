import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutGeneratorComponent } from './workout-generator.component';

describe('WorkoutGeneratorComponent', () => {
  let component: WorkoutGeneratorComponent;
  let fixture: ComponentFixture<WorkoutGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
