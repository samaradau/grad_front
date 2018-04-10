import { TestBed, inject } from '@angular/core/testing';

import { ExerciseManagementService } from './exercise-management.service';

describe('ExerciseManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExerciseManagementService]
    });
  });

  it('should be created', inject([ExerciseManagementService], (service: ExerciseManagementService) => {
    expect(service).toBeTruthy();
  }));
});
