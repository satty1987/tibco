import { TestBed, async, inject } from '@angular/core/testing';

import { AcoountGuard } from './acoount.guard';

describe('AcoountGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AcoountGuard]
    });
  });

  it('should ...', inject([AcoountGuard], (guard: AcoountGuard) => {
    expect(guard).toBeTruthy();
  }));
});
