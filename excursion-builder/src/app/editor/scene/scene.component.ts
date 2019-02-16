import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight} from 'babylonjs';
import { PointLight, MeshBuilder, AbstractMesh } from 'babylonjs';
import { SelectHighlightLayer } from 'src/app/models/SelectHighlightLayer';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss']
})
export class SceneComponent implements OnInit {
  @ViewChild('renderCanvas') canvasRef: ElementRef;
  get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private engine: Engine;
  private highlightLayer: SelectHighlightLayer;
  selectedMesh: AbstractMesh;

  constructor() { }

  ngOnInit() {
    this.engine = new Engine(this.canvas, true, { stencil: true });
    const scene = new Scene(this.engine);
    this.highlightLayer = new SelectHighlightLayer('select layer', scene);

    const camera = new ArcRotateCamera('Camera', Math.PI / 2, Math.PI / 2, 2, new Vector3(0, 0, 5), scene);
    camera.attachControl(this.canvas, true);

    const light1 = new HemisphericLight('light1', new Vector3(1, 1, 0), scene);
    const light2 = new PointLight('light2', new Vector3(0, 1, -1), scene);

    const sphere = MeshBuilder.CreateSphere('sphere', { diameter: 2 }, scene);
    this.engine.runRenderLoop(() => {
      scene.render();
    });

    window.addEventListener('resize', () => {
      this.engine.resize();
    });

    scene.onPointerObservable.add(e => {
      switch (e.type) {
        case BABYLON.PointerEventTypes.POINTERMOVE:
          const pick = scene.pick(scene.pointerX, scene.pointerY);
          this.highlightLayer.meshes.forEach(mesh => {
            if (mesh !== this.selectedMesh) {
              this.highlightLayer.removeMesh(mesh);
            }
          });

          if (pick.hit) {
            this.highlightLayer.addMesh(pick.pickedMesh, BABYLON.Color3.Green());
          }
          break;
      }
    });

  }

}
