import { Component, OnInit } from '@angular/core';
import { ITreeOptions, ITreeNode } from 'angular-tree-component/dist/defs/api';
import { SceneStateService } from '../scene-state.service';
import { LoggerService, Logger } from '../logger.service';
import { read } from 'fs';
import { ViewChild } from '@angular/core';
import { TreeModel } from 'angular-tree-component';
import { Scene } from 'babylonjs';

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
    this.sceneState.currentSceneStram.subscribe(S => {
      this.nodes = [];
      if (!S) { return; }
      this.currentScene = S;
      S.meshes.filter(M => M.parent === undefined).forEach(M => {
        this.nodes.push({ id: M.uniqueId, name: M.name, });
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
      someNode.setIsActive(true);
    });
  }
  onEvent(val) {
    const selectedNode: ITreeNode = val.node;
    const selectedMesh = this.currentScene.getMeshByUniqueID(selectedNode.id as number);
    this.sceneState.selectMesh(selectedMesh);
  }
}
interface TreeNode {
  id: number;
  name: string;
  children?: TreeNode[];
}
