import { GameObject } from './GameObject';
import { Logger } from '../../app/logger.service';
import { SceneStateService } from '../../app/scene-state.service';

export abstract class EditorScene {
    readonly core: BABYLON.Scene;
    readonly logger: Logger;
    readonly state: SceneStateService;

    public gameObjects: Map<number, GameObject>;
    public mainCamera: BABYLON.FreeCamera;

    public constructor(core: BABYLON.Scene, state: SceneStateService, logger: Logger) {
        this.core = core;
        this.state = state;
        this.logger = logger;
        this.gameObjects = new Map<number, GameObject>();
    }

    // is called when scene is pushed to stack
    onStart(): void {}

    // is called when scene is popped out of stack
    onClose(): void {}

    // is called when new scene if pushed over this scene
    onLeave(): void {}

    // is called when it becames the head of stack
    onReturn(): void {}


    // is called every frame before onUpdate
    onGui(): void {}

    // is called every frame before onDraw
    onUpdate(): void {}

    // is called every frame
    onDraw(): void {}

    // is called just before onUpdate
    preUpdate() {
        this.gameObjects.forEach(object => {
            if (object.enabled) {
                object.onUpdate();
            }
        });
    }


    spawnObject(object: GameObject) {
        this.gameObjects.set(object.uid, object);
        object.onCreate();
    }

    deleteObject(object: GameObject) {
        object.onDestroy();
        this.gameObjects.delete(object.uid);
        object.dispose();
    }
}
