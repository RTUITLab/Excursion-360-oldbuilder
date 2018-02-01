import { Component, OnInit } from '@angular/core';
import { ITreeOptions, ITreeNode } from 'angular-tree-component/dist/defs/api';
import { SceneStateService } from '../scene-state.service';
import { LoggerService, Logger } from '../logger.service';
// import { read } from 'fs';
import { ViewChild } from '@angular/core';
import { TreeModel } from 'angular-tree-component';
import { Scene, Node } from 'babylonjs';

@Component({
  selector: 'app-hierarchy-bar',
  templateUrl: './hierarchy-bar.component.html',
  styleUrls: ['./hierarchy-bar.component.css']
})
export class HierarchyBarComponent implements OnInit {
  private logger: Logger;
  private currentScene: Scene;
  nodes: TreeNode[];
  options: ITreeOptions = {
    allowDrag: true,
    allowDrop: true
  };
  @ViewChild('myTree') treeHtml;
  private tree: TreeModel;
  constructor(private sceneState: SceneStateService, private loggerService: LoggerService) {
  }

  ngOnInit() {
    this.logger = this.loggerService.getLogger(HierarchyBarComponent);
    this.tree = this.treeHtml.treeModel;
    this.sceneState.currentSceneStream.subscribe(S => {
      this.nodes = [];
      if (!S) { return; }
      this.currentScene = S;
      S.meshes.filter(M => M.parent === undefined).forEach(M => {
        this.nodes.push(this.handleBabylonNode(M));
      });
    });
    this.sceneState.selectMeshStream.subscribe(M => {
      if (!M) {
        this.tree.activeNodes.forEach((N: ITreeNode) => {
          N.setIsActive(false);
          N.blur();
        });
        return;
      }
      const someNode = this.tree.getNodeById(M.uniqueId) as ITreeNode;
      if (!someNode.isActive) {
        someNode.setIsActive(true);
      }
      if (!someNode.isExpanded) {
        let n = someNode;
        while (n) {
          n.expand();
          n = n.parent;
        }
      }
    });
  }
  onActivate(val) {
    const selectedNode: ITreeNode = val.node;
    const selectedMesh = this.currentScene.getMeshByUniqueID(selectedNode.id as number);
    this.sceneState.selectMesh(selectedMesh);
  }

  onMove(val) {
    const movedNode = val.node as ITreeNode;
    const parentNode = val.to.parent as ITreeNode;
    const movedObject = this.currentScene.getMeshByUniqueID(movedNode.id as number);
    if (parentNode.isRoot) {
      movedObject.parent = undefined;
      return;
    }
    const newParent = this.currentScene.getMeshByUniqueID(parentNode.id as number);
    movedObject.parent = newParent;
  }

  handleBabylonNode(babNode: Node): TreeNode {
    const node: TreeNode = {
      id: babNode.uniqueId,
      name: babNode.name,
      children: []
    };
    babNode.getChildren().forEach(C => {
      node.children.push(this.handleBabylonNode(C));
    });
    return node;
  }
}
interface TreeNode {
  id: number;
  name: string;
  children?: TreeNode[];
}
