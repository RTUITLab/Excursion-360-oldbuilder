import { EditorScene } from '../Common/EditorScene';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HighlightLayer2 } from '../../../../excursion-builder/src/app/models/SelectHighlightLayer';
import 'babylonjs-materials';

export class MapEditorScene extends EditorScene {
    private highlightLayer: HighlightLayer2;
    private selectedMesh: BABYLON.AbstractMesh;

    private ground: BABYLON.Mesh;

    onStart() {
        this.state.selectMeshStream.subscribe(mesh => {
            this.highlightMesh(mesh);
        });

        this.highlightLayer = new HighlightLayer2('highlight_layer', this.core);

        this.mainCamera = new BABYLON.FreeCamera('Camera', new BABYLON.Vector3(-4, 6, 2), this.core);
        this.mainCamera.attachControl(this.core.getEngine().getRenderingCanvas(), true);

        this.ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 30, height: 30 }, this.core);
        this.ground.material = new BABYLON.GridMaterial('groundMaterial', this.core);

        const light1 = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1, 1, 0), this.core);
        const light2 = new BABYLON.PointLight('light2', new BABYLON.Vector3(0, 1, -1), this.core);

        const sphere1 = BABYLON.MeshBuilder.CreateSphere('sphere', {}, this.core);
        const sphere2 = BABYLON.MeshBuilder.CreateSphere('sphere', {}, this.core);
        const cube = BABYLON.MeshBuilder.CreateBox('box', { size: 2 }, this.core);

        sphere2.parent = sphere1;
        cube.parent = sphere2;

        cube.position.z -= 1;
        sphere2.position.x += 1;
        sphere1.position.y += 1;
        sphere2.position.y += 1;

        this.mainCamera.setTarget(sphere1.position);


        let mousePosition: BABYLON.Vector2 = new BABYLON.Vector2(0, 0);
        this.core.onPointerObservable.add(E => {
            switch (E.type) {
                case BABYLON.PointerEventTypes.POINTERDOWN:
                    this.logger.log('azazaz');
                    mousePosition = new BABYLON.Vector2(this.core.pointerX, this.core.pointerY);
                    break;
                case BABYLON.PointerEventTypes.POINTERUP:
                    if (!mousePosition.equals(new BABYLON.Vector2(this.core.pointerX, this.core.pointerY))) {
                        return;
                    }
                    const pickUp = this.core.pick(this.core.pointerX, this.core.pointerY);
                    if (pickUp.hit) {
                        this.state.selectMesh(E.pickInfo.pickedMesh);
                        return;
                    } else {
                        this.state.selectMesh(undefined);
                    }
                    break;

                case BABYLON.PointerEventTypes.POINTERMOVE:
                    const pick = this.core.pick(this.core.pointerX, this.core.pointerY, mesh => mesh !== this.selectedMesh);

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

    onClose() {

    }

    onUpdate() {

    }


    private highlightMesh(mesh: BABYLON.AbstractMesh) {
        if (mesh == this.selectedMesh) { return; }

        if (this.selectedMesh) {
            this.highlightLayer.removeMesh(this.selectedMesh);
        }

        this.selectedMesh = mesh;
        if (mesh != null) {
            this.highlightLayer.addMesh(mesh, BABYLON.Color3.Red());
        }
    }
}
