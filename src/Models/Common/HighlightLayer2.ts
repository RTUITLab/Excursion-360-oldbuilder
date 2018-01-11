import { HighlightLayer, Color3, Mesh, IHighlightLayerOptions, Scene } from 'babylonjs';

export class HighlightLayer2 extends HighlightLayer {

    meshes: Array<Mesh> = new Array<Mesh>();
    /**
     *
     */
    constructor(name: string, scene: Scene, options?: IHighlightLayerOptions) {
        super(name, scene, options);
    }
    addMesh(mesh: Mesh, color: Color3, glowEmissiveOnly?: boolean): void {
        super.addMesh(mesh, color, glowEmissiveOnly);
        this.meshes.push(mesh);
    }
    removeMesh(mesh: Mesh): void {
        super.removeMesh(mesh);
        this.meshes.splice(this.meshes.indexOf(mesh), 1); 
    }
}
