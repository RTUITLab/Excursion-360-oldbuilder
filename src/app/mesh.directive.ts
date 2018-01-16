import { Directive, ViewContainerRef } from '@angular/core';
import { ViewChild } from '@angular/core';

@Directive({
  selector: '[appMesh]'
})
export class MeshDirective {
  @ViewChild(MeshDirective) adHost: MeshDirective;
  constructor(public viewContainerRef: ViewContainerRef) { }
}
