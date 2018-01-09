import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Engine, Scene, Scalar, PointLight, Vector3, FreeCamera, ArcRotateCamera, HemisphericLight, MeshBuilder, Color3 } from 'babylonjs';
import { Mesh, AbstractMesh, HighlightLayer } from 'babylonjs';
import { element } from 'protractor';
import { MeshDataService } from '../mesh-data.service';
import { setTimeout } from 'timers';
import { fail } from 'assert';

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
  value: string = '';
  log: string;
  engine: Engine;
  scene: Scene;
  debug: Mesh;
  selectedMesh: AbstractMesh;
  h1: HighlightLayer;
  goals = [];
  constructor(private meshData: MeshDataService) {
  }
  sendMeshData() {
    // this.meshData.setMeshDatas(['lol', 'lol1']);
  }

  ngOnInit() {
    this.engine = new Engine(this.canvas, true, { stencil: true });
    const scene = new Scene(this.engine);
    this.h1 = new HighlightLayer('hl1', scene);
    // Add a camera to the scene and attach it to the canvas
    const camera = new ArcRotateCamera('Camera', Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), scene);
    camera.attachControl(this.canvas, true);

    // Add lights to the scene
    const light1 = new HemisphericLight('light1', new Vector3(1, 1, 0), scene);
    const light2 = new PointLight('light2', new Vector3(0, 1, -1), scene);

    // This is where you create and manipulate meshes
    const sphere = MeshBuilder.CreateSphere('sphere', {}, scene);
    this.value += sphere.isPickable;
    const sphere2 = MeshBuilder.CreateSphere('sphere', {}, scene);
    sphere2.position.x += 1;

    sphere.position.y += 1;
    sphere2.position.y += 1;


    const debug = MeshBuilder.CreateBox('box', { size: 0.1 });
    debug.position.y += 2;
    this.debug = debug;
    camera.setTarget(sphere.position);
    this.engine.runRenderLoop(function () { // Register a render loop to repeatedly render the scene
      scene.render();
    });


    window.addEventListener('mousemove', () => {
      const selected = scene.pick(scene.pointerX, scene.pointerY, m => m.name !== 'box');
      if (selected.hit) {
        this.log = JSON.stringify(selected.pickedMesh.position);
        if (this.selectedMesh !== undefined && this.selectedMesh !== selected.pickedMesh) {
          this.h1.removeMesh(this.selectedMesh as Mesh);
        }
        this.h1.addMesh(selected.pickedMesh as Mesh, Color3.Green());
        this.selectedMesh = selected.pickedMesh;
        this.debug.position = selected.pickedPoint;
        this.meshData.setMesh(selected.pickedMesh);
      } else {
        if (this.selectedMesh) {
          this.h1.removeMesh(this.selectedMesh as Mesh);
        }
      }

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
