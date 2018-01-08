import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AbstractMesh } from 'babylonjs';
@Injectable()
export class MeshDataService {



  private meshes = new BehaviorSubject<AbstractMesh>(undefined);
  meshStream = this.meshes.asObservable();
  constructor() {
  }

  setMesh(mesh: AbstractMesh) {
    this.meshes.next(mesh);
  }
}
