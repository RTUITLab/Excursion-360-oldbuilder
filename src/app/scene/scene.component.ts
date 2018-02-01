import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EditorSceneManager } from '../../Models/Common/EditorSceneManager';
import { LoggerService } from '../logger.service';
import { MapEditorScene } from '../../Models/Editor/MapEditorScene';
import { SceneStateService } from '../scene-state.service';


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

  engine: BABYLON.Engine;
  sceneManager: EditorSceneManager;

  constructor(private sceneState: SceneStateService, private loggerService: LoggerService) {
  }

  ngOnInit() {
    this.engine = new BABYLON.Engine(this.canvas, true, { stencil: true });
    const core = new BABYLON.Scene(this.engine);
    const logger = this.loggerService.getLogger(SceneComponent);

    this.sceneManager = new EditorSceneManager(core, this.sceneState, logger);

    this.sceneManager.push(MapEditorScene);

    this.engine.runRenderLoop(() => {
      if (this.sceneManager.currentScene != null) {
        this.sceneManager.currentScene.onGui();
        this.sceneManager.currentScene.onUpdate();
        this.sceneManager.currentScene.onDraw();
      }

      core.render();
    });

    window.addEventListener('resize', () => {
      this.engine.resize();
    });
  }
}
