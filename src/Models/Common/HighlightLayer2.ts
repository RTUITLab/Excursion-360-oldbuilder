import 'babylonjs';

export class HighlightLayer2 extends BABYLON.HighlightLayer {
    meshes: Array<BABYLON.AbstractMesh> = new Array<BABYLON.AbstractMesh>();

    constructor(name: string, core: BABYLON.Scene, options?: BABYLON.IHighlightLayerOptions) {
        super(name, core, options);
    }

    addMesh(mesh: BABYLON.AbstractMesh, color: BABYLON.Color3, glowEmissiveOnly?: boolean): void {
        super.addMesh(mesh as BABYLON.Mesh, color, glowEmissiveOnly);
        this.meshes.push(mesh);
    }

    removeMesh(mesh: BABYLON.AbstractMesh): void {
        super.removeMesh(mesh as BABYLON.Mesh);
        this.meshes.splice(this.meshes.indexOf(mesh), 1);
    }
}
