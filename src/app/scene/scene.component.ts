import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Engine, Scene, Scalar, PointLight, Vector3, FreeCamera, ArcRotateCamera, HemisphericLight } from 'babylonjs';
import { Color3, MeshAssetTask, MeshBuilder, PointerEventTypes } from 'babylonjs';
import { Mesh, AbstractMesh, HighlightLayer } from 'babylonjs';
import { element } from 'protractor';
import { MeshDataService } from '../mesh-data.service';
import { setTimeout } from 'timers';
import { fail } from 'assert';
import { HighlightLayer2 } from '../../Models/Common/HighlightLayer2';

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
  get selectedMesh(): Mesh {
    return this._selectedMesh;
  }
  set selectedMesh(value: Mesh) {
    if (!value) {
      if (!this._selectedMesh) { return; }
      this.h1.removeMesh(this._selectedMesh);
      this._selectedMesh = undefined;
      this.meshData.setMesh(undefined);
      return;
    }
    if (this._selectedMesh) {
      this.h1.removeMesh(this._selectedMesh);
    }
    this._selectedMesh = value;
    this.meshData.setMesh(value);
    this.h1.addMesh(value, Color3.Red());
  }
  h1: HighlightLayer2;
  camera: FreeCamera;
  sphere: Mesh;
  constructor(private meshData: MeshDataService) {
  }


  ngOnInit() {
    this.engine = new Engine(this.canvas, true, { stencil: true });
    const scene = new Scene(this.engine);
    this.scene = scene;
    this.h1 = new HighlightLayer2('hl1', scene);
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
    sphere2.position.x += 1;
    // sphere2.isVisible = false;
    sphere.position.y += 1;
    sphere2.position.y += 1;

    camera.setTarget(this.sphere.position);
    this.engine.runRenderLoop(function () { // Register a render loop to repeatedly render the scene
      scene.render();
    });



    this.scene.onPointerObservable.add(E => {
      switch (E.type) {
        case PointerEventTypes.POINTERPICK:
          break;
        case PointerEventTypes.POINTERDOWN:
          console.log('down');
          const pickUp = this.scene.pick(this.scene.pointerX, this.scene.pointerY);
          if (pickUp.hit) {
            this.selectedMesh = E.pickInfo.pickedMesh as Mesh;
            return;
          }
          if (!pickUp.hit || pickUp.pickedMesh !== this.selectedMesh) {
            const x = this.scene.pointerX;
            const y = this.scene.pointerY;
            setTimeout(() => {
              if (this.scene.pointerX === x && this.scene.pointerY === y) {
                this.selectedMesh = undefined;
              }
            }, 50);
          }
          break;
        case PointerEventTypes.POINTERMOVE:
          const pick = this.scene.pick(this.scene.pointerX, this.scene.pointerY);
          this.h1.meshes.forEach(M => {
            if (M !== this.selectedMesh) {
              this.h1.removeMesh(M as Mesh);
            }
          });
          if (pick.hit && pick.pickedMesh !== this.selectedMesh) {
            this.h1.addMesh(pick.pickedMesh as Mesh, Color3.Green());
          }
          break;
      }
      // const selected = scene.pick(scene.pointerX, scene.pointerY, m => m.name !== 'box');
      // if (selected.hit) {
      //  this.selectMesh(selected.pickedMesh);
      // }
    });
    let lastTime: number;
    let timeout = false;
    const delta = 500;
    const resizeFunc = () => {
      if ((Date.now() - lastTime) < delta) {
        setTimeout(resizeFunc, delta);
      } else {
        timeout = false;
        this.engine.resize();
      }
    };
    window.addEventListener('resize', () => {
      lastTime = new Date().getMilliseconds();
      if (timeout === false) {
        timeout = true;
        setTimeout(resizeFunc, delta);
      }
    });

  }
}
