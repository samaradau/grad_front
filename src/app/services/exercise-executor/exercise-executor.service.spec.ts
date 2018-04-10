import { TestBed, inject } from '@angular/core/testing';

import { ExerciseExecutorService } from './exercise-executor.service';

describe('ExerciseExecutorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExerciseExecutorService]
    });
  });

  it('should be created', inject([ExerciseExecutorService], (service: ExerciseExecutorService) => {
    expect(service).toBeTruthy();
  }));
});
