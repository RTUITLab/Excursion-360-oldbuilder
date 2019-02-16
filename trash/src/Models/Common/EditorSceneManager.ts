import { EditorScene } from './EditorScene';
import { Logger } from '../../app/logger.service';
import { SceneStateService } from '../../app/scene-state.service';

export class EditorSceneManager {
    private scenes: Array<EditorScene>;

    constructor(private core: BABYLON.Scene, private sceneState: SceneStateService, private logger: Logger) {
        this.scenes = new Array<EditorScene>();
    }

    get currentScene() {
        const sceneCount = this.scenes.length;

        if (sceneCount === 0) {
            return null;
        } else {
            return this.scenes[sceneCount - 1];
        }
    }

    push<T extends EditorScene>(ctor: { new (core: BABYLON.Scene, state: SceneStateService, logger: Logger): T }) {
        if (this.currentScene != null) {
            this.currentScene.onLeave();
        }

        const nextScene = new ctor(this.core, this.sceneState, this.logger);
        this.scenes.push(nextScene);
        nextScene.onStart();
    }

    pop() {
        if (this.currentScene != null) {
            this.currentScene.onClose();
            this.scenes.pop();
        }

        if (this.currentScene != null) {
            this.currentScene.onReturn();
        }
    }

    change<T extends EditorScene>(ctor: { new (core: BABYLON.Scene, state: SceneStateService, logger: Logger): T }) {
        this.pop();
        this.push(ctor);
    }
}
