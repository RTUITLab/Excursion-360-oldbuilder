import { TransformNode } from 'babylonjs';
import { EditorScene } from './EditorScene';

export abstract class GameObject extends TransformNode {
    static currentUid = 0;

    readonly uid: number = -1;
    name: string;
    enabled: boolean = true;

    public constructor(protected scene: EditorScene, name: string) {
        super(name);
        this.uid = GameObject.currentUid++;
        this.name = name;
    }

    onCreate() { }

    onDestroy() { }

    onUpdate() { }

    onDraw() {}
}
