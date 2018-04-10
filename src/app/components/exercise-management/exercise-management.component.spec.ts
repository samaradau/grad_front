import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseManagementComponent } from './exercise-management.component';

describe('ExerciseManagementComponent', () => {
  let component: ExerciseManagementComponent;
  let fixture: ComponentFixture<ExerciseManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciseManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
