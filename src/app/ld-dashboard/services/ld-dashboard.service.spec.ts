import { TestBed, inject } from '@angular/core/testing';

import { LdDashboardService } from './ld-dashboard.service';

describe('LdDashboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LdDashboardService]
    });
  });

  it('should be created', inject([LdDashboardService], (service: LdDashboardService) => {
    expect(service).toBeTruthy();
  }));
});
