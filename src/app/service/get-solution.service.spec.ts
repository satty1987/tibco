import { TestBed } from '@angular/core/testing';

import { GetSolutionService } from './get-solution.service';

describe('GetSolutionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetSolutionService = TestBed.get(GetSolutionService);
    expect(service).toBeTruthy();
  });
});
