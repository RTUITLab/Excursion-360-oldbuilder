import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AbstractMesh } from 'babylonjs';
@Injectable()
export class MeshDataService {



  private meshes = new BehaviorSubject<AbstractMesh>(undefined);
  meshStream = this.meshes.asObservable();
  private logs = new BehaviorSubject<string>('empty');
  logsStream = this.logs.asObservable();
  constructor() {
  }

  setLog(log: string) {
    this.logs.next(log);
  }

  setMesh(mesh: AbstractMesh) {
    this.meshes.next(mesh);
  }
}
