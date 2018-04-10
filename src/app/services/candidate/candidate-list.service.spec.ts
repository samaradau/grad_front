import { TestBed, inject } from '@angular/core/testing';

import { CandidateListService } from './candidate-list.service';

describe('CandidateListServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CandidateListService]
    });
  });

  it('should be created', inject([CandidateListService], (service: CandidateListService) => {
    expect(service).toBeTruthy();
  }));
});
