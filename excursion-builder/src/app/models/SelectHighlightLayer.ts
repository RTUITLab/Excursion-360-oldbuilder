import 'babylonjs';
import { HighlightLayer, IHighlightLayerOptions, Color3 } from 'babylonjs';
import { AbstractMesh } from 'babylonjs/Meshes/abstractMesh';
import { Scene } from 'babylonjs/scene';
import { Mesh } from 'babylonjs/Meshes/mesh';

export class SelectHighlightLayer extends HighlightLayer {
    meshes: Array<AbstractMesh> = new Array<AbstractMesh>();

    constructor(name: string, core: Scene, options?: IHighlightLayerOptions) {
        super(name, core, options);
    }

    addMesh(mesh: AbstractMesh, color: Color3, glowEmissiveOnly?: boolean): void {
        super.addMesh(mesh as Mesh, color, glowEmissiveOnly);
        this.meshes.push(mesh);
    }

    removeMesh(mesh: AbstractMesh): void {
        super.removeMesh(mesh as Mesh);
        this.meshes.splice(this.meshes.indexOf(mesh), 1);
    }
}
