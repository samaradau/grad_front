import { TestBed, inject } from '@angular/core/testing';

import { ExerciseListService } from './exercise-list.service';

describe('ExerciseListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExerciseListService]
    });
  });

  it('should be created', inject([ExerciseListService], (service: ExerciseListService) => {
    expect(service).toBeTruthy();
  }));
});
