import { TestBed } from '@angular/core/testing';

import { ChoixUserService } from './choix-user.service';

describe('ChoixUserService', () => {
  let service: ChoixUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChoixUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
