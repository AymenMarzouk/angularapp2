import { TestBed } from '@angular/core/testing';

import { UtilisateurTestService } from './utilisateur-test.service';

describe('UtilisateurTestService', () => {
  let service: UtilisateurTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilisateurTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
