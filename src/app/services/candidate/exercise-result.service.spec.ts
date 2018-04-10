import { TestBed, inject } from '@angular/core/testing';

import { ExerciseResultService } from './exercise-result.service';

describe('ExerciseResultService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExerciseResultService]
    });
  });

  it('should be created', inject([ExerciseResultService], (service: ExerciseResultService) => {
    expect(service).toBeTruthy();
  }));
});
