import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AbstractMesh, Scene } from 'babylonjs';

@Injectable()
export class SceneStateService {

  constructor() { }
  private _selectedMeshes = new BehaviorSubject<AbstractMesh>(undefined);
  public selectMeshStream = this._selectedMeshes.asObservable();

  private _currentScenes = new BehaviorSubject<Scene>(undefined);
  public currentSceneStream = this._currentScenes.asObservable();

  public selectMesh(mesh: AbstractMesh): void {
    this._selectedMeshes.next(mesh);
  }
  public setScene(scene: Scene): void {
    this._currentScenes.next(scene);
  }
}
