import { TestBed, inject } from '@angular/core/testing';

import { LdDashboardService } from './ld-dashboard.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('LdDashboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LdDashboardService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([LdDashboardService], (service: LdDashboardService) => {
    expect(service).toBeTruthy();
  }));
});
