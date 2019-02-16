import { LoggerService } from '../logger.service';
import { Component, OnInit } from '@angular/core';
import { SceneStateService } from '../scene-state.service';
import { Vector3, AbstractMesh } from 'babylonjs';
import { ComponentFactoryResolver } from '@angular/core';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Vector3Component } from '../../Components/vector3/vector3.component';
import { Type } from '@angular/core';
import { MeshDirective } from '../mesh.directive';
import { ViewChild } from '@angular/core';
import { ComponentFactory } from '@angular/core/src/linker/component_factory';
import { ViewContainerRef } from '@angular/core/src/linker/view_container_ref';


@Component({
  selector: 'app-mesh-params',
  templateUrl: './mesh-params.component.html',
  styleUrls: ['./mesh-params.component.css']
})
export class MeshParamsComponent implements AfterViewInit {
  constructor(
    private _logger: LoggerService,
    private _sceneState: SceneStateService,
    private _componentFactoryResolver: ComponentFactoryResolver
  ) {
  }
  @ViewChild(MeshDirective) paramsHost: MeshDirective;
  pairs: Array<Vector3Pair> = [];
  haveObject: boolean = false;

  ngAfterViewInit(): void {
    this._sceneState.selectMeshStream.subscribe(M => {
      if (!M) {
        this.pairs = [];
        this.updateComponents();
        return;
      }
      this.pairs = [
        new Vector3Pair('position', M),
        new Vector3Pair('rotation', M)
      ];
      this.updateComponents();
    });
  }
  updateComponents() {
    const viewContainerRef = this.paramsHost.viewContainerRef;
    viewContainerRef.clear();
    this.pairs.forEach(P => {
      const componentFactory = this._componentFactoryResolver.resolveComponentFactory(Vector3Component);
      const componentRef = viewContainerRef.createComponent(componentFactory);
      componentRef.instance.vectorName = P.paramName;
      componentRef.instance.vector = P.param;
    });
  }

}
class Vector3Pair {
  public component: Type<Vector3Component> = Vector3Component;
  public param: Vector3;
  constructor(
    public paramName: string,
    mesh: AbstractMesh) {
    this.param = mesh[paramName];
  }
}
