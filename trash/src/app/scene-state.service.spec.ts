import { TestBed, inject } from '@angular/core/testing';

import { SceneStateService } from './scene-state.service';

describe('SceneStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SceneStateService]
    });
  });

  it('should be created', inject([SceneStateService], (service: SceneStateService) => {
    expect(service).toBeTruthy();
  }));
});
