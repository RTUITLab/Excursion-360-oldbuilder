import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Engine, Scene, Scalar, PointLight, Vector3, FreeCamera, ArcRotateCamera, HemisphericLight, Vector2 } from 'babylonjs';
import { Color3, MeshAssetTask, MeshBuilder, PointerEventTypes } from 'babylonjs';
import { Mesh, AbstractMesh, HighlightLayer } from 'babylonjs';
import { element } from 'protractor';
import { setTimeout } from 'timers';
import { fail } from 'assert';
import { HighlightLayer2 } from '../../Models/Common/HighlightLayer2';
import { LoggerService, Logger } from '../logger.service';
import { SceneStateService } from '../scene-state.service';
import { Type } from '@angular/core';
import 'babylonjs-materials';


@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css']
})
export class SceneComponent implements OnInit {
  @ViewChild('can') canvasRef: ElementRef;

  get canvas(): HTMLCanvasElement {
    console.log(this.canvasRef.nativeElement);
    return this.canvasRef.nativeElement;
  }
  engine: Engine;
  scene: Scene;
  private _selectedMesh: Mesh;
  private logger: Logger;
  h1: HighlightLayer2;
  camera: FreeCamera;
  sphere: Mesh;

  constructor(private sceneState: SceneStateService, private loggerService: LoggerService) {
  }

  private setMesh(mesh: Mesh) {
    if (this._selectedMesh !== mesh) {
      this.sceneState.selectMesh(mesh);
    }
  }

  highlightMesh(mesh: Mesh) {
    if (!mesh) {
      if (!this._selectedMesh) { return; }
      this.h1.removeMesh(this._selectedMesh);
      this._selectedMesh = undefined;
      return;
    }
    if (this._selectedMesh) {
      this.h1.removeMesh(this._selectedMesh);
    }
    this._selectedMesh = mesh;
    this.h1.addMesh(mesh, Color3.Red());
  }

  ngOnInit() {
    this.logger = this.loggerService.getLogger(SceneComponent);
    this.sceneState.selectMeshStream.subscribe(M => {
      this.highlightMesh(M as Mesh);
    });

    this.engine = new Engine(this.canvas, true, { stencil: true });
    const scene = new Scene(this.engine);
    this.scene = scene;
    this.h1 = new HighlightLayer2('hl1', scene);

    const ground = BABYLON.MeshBuilder.CreateGround('ground', {width: 30, height: 30}, scene);
    ground.material = new BABYLON.GridMaterial('groundMaterial', scene);

    // Add a camera to the scene and attach it to the canvas
    const camera = new FreeCamera('Camera', new Vector3(-4, 6, 2), scene);
    camera.attachControl(this.canvas, true);
    this.camera = camera;
    // Add lights to the scene
    const light1 = new HemisphericLight('light1', new Vector3(1, 1, 0), scene);
    const light2 = new PointLight('light2', new Vector3(0, 1, -1), scene);

    // This is where you create and manipulate meshes
    const sphere = MeshBuilder.CreateSphere('sphere', {}, scene);
    this.sphere = sphere;
    const sphere2 = MeshBuilder.CreateSphere('sphere', {}, scene);
    const cube = MeshBuilder.CreateBox('box', { size: 2 }, scene);
    cube.position.z -= 1;
    sphere2.position.x += 1;
    sphere2.parent = sphere;
    cube.parent = sphere2;
    sphere.position.y += 1;
    sphere2.position.y += 1;

    camera.setTarget(this.sphere.position);
    this.engine.runRenderLoop(function () { // Register a render loop to repeatedly render the scene
      scene.render();
    });
    this.sceneState.setScene(scene);

    let mousePos: Vector2 = new Vector2(0, 0);
    this.scene.onPointerObservable.add(E => {
      switch (E.type) {
        case PointerEventTypes.POINTERDOWN:
          this.logger.log('azazaz');
          mousePos = new Vector2(this.scene.pointerX, this.scene.pointerY);
          break;
        case PointerEventTypes.POINTERUP:
          if (!mousePos.equals(new Vector2(this.scene.pointerX, this.scene.pointerY))) {
            return;
          }
          const pickUp = this.scene.pick(this.scene.pointerX, this.scene.pointerY);
          if (pickUp.hit) {
            this.setMesh(E.pickInfo.pickedMesh as Mesh);
            return;
          } else {
            this.setMesh(undefined);
          }

          break;
        case PointerEventTypes.POINTERMOVE:
          const pick = this.scene.pick(this.scene.pointerX, this.scene.pointerY,
            M => M !== this._selectedMesh);
          this.h1.meshes.forEach(M => {
            if (M !== this._selectedMesh) {
              this.h1.removeMesh(M as Mesh);
            }
          });
          if (pick.hit) {
            this.h1.addMesh(pick.pickedMesh as Mesh, Color3.Green());
          }
          break;
      }
    });
    window.addEventListener('resize', () => {
      this.engine.resize();
    });

  }
}
