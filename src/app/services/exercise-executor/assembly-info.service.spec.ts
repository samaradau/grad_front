import { TestBed, inject } from '@angular/core/testing';

import { AssemblyInfoService } from './assembly-info.service';

describe('AssemblyInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssemblyInfoService]
    });
  });

  it('should be created', inject([AssemblyInfoService], (service: AssemblyInfoService) => {
    expect(service).toBeTruthy();
  }));
});
