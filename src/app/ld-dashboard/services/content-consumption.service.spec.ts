import { TestBed, inject } from '@angular/core/testing';

import { ContentConsumptionService } from './content-consumption.service';

describe('ContentConsumptionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContentConsumptionService]
    });
  });

  it('should be created', inject([ContentConsumptionService], (service: ContentConsumptionService) => {
    expect(service).toBeTruthy();
  }));
});
