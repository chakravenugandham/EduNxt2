import { TestBed, inject } from '@angular/core/testing';

import { OrgInterestService } from './org-interest.service';

describe('OrgInterestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrgInterestService]
    });
  });

  it('should be created', inject([OrgInterestService], (service: OrgInterestService) => {
    expect(service).toBeTruthy();
  }));
});
