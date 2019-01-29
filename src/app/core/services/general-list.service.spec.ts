import { TestBed } from '@angular/core/testing';

import { GeneralListService } from './general-list.service';

describe('GeneralListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeneralListService = TestBed.get(GeneralListService);
    expect(service).toBeTruthy();
  });
});
