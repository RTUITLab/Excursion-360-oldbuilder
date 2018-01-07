import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Engine, Scene, Scalar, PointLight, Vector3, FreeCamera, ArcRotateCamera, HemisphericLight, MeshBuilder } from 'babylonjs';
// import { MeshDataService } from '../mesh-data.service';
@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css']
})
export class SceneComponent implements OnInit {
  @ViewChild('can') canvasRef: ElementRef;

  get canvas(): HTMLCanvasElement{
    this.value = 5;
    console.log(this.canvasRef.nativeElement);
    return this.canvasRef.nativeElement;
  }
  value: number;
  engine: Engine;
  scene: Scene;
  constructor(/*private meshData: MeshDataService*/) {
  }


  sendMeshData() {
    // this.meshData.setMeshDatas(['lol', 'lol1']);
  }

  ngOnInit() {

    this.engine = new Engine(this.canvas);
    const scene = new Scene(this.engine);

    // Add a camera to the scene and attach it to the canvas
    const camera = new ArcRotateCamera('Camera', Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), scene);
    camera.attachControl(this.canvas, true);

    // Add lights to the scene
    const light1 = new HemisphericLight('light1', new Vector3(1, 1, 0), scene);
    const light2 = new PointLight('light2', new Vector3(0, 1, -1), scene);

    // This is where you create and manipulate meshes
    const sphere = MeshBuilder.CreateSphere('sphere', {}, scene);

    this.engine.runRenderLoop(function () { // Register a render loop to repeatedly render the scene
      scene.render();
    });
  }

}
