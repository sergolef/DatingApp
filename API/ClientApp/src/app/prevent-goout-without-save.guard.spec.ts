import { TestBed } from '@angular/core/testing';

import { PreventGooutWithoutSaveGuard } from './guards/prevent-goout-without-save.guard';

describe('PreventGooutWithoutSaveGuard', () => {
  let guard: PreventGooutWithoutSaveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PreventGooutWithoutSaveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
