import { TestBed, inject } from '@angular/core/testing';

import { ActiveUsersService } from './active-users.service';

describe('ActiveUsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActiveUsersService]
    });
  });

  it('should be created', inject([ActiveUsersService], (service: ActiveUsersService) => {
    expect(service).toBeTruthy();
  }));
});
