import { TestBed, inject } from '@angular/core/testing';

import { MeshDataService } from './mesh-data.service';

describe('MeshDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MeshDataService]
    });
  });

  it('should be created', inject([MeshDataService], (service: MeshDataService) => {
    expect(service).toBeTruthy();
  }));
});
