import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskValidationComponent } from './task-validation.component';

describe('TaskValidationComponent', () => {
  let component: TaskValidationComponent;
  let fixture: ComponentFixture<TaskValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
