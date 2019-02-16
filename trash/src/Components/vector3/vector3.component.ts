import { Component, Input, OnInit } from '@angular/core';
import { AbstractMesh, Mesh, Vector3 } from 'babylonjs';
import { LoggerService } from '../../app/logger.service';
import { SceneStateService } from '../../app/scene-state.service';

@Component({
  selector: 'app-vector3',
  templateUrl: './vector3.component.html',
  styleUrls: ['./vector3.component.css']
})
export class Vector3Component implements OnInit {
  vector: Vector3;
  @Input()
  vectorName: string;

  constructor(private logger: LoggerService) { }
  get X(): number {
    if (this.vector) {
      return this.vector.x;
    }
  }
  set X(value: number) {
    this.vector.x = value;
  }
  get Y(): number {
    if (this.vector) {
      return this.vector.y;
    }
  }

  set Y(value: number) {
    this.vector.y = value;
  }

  get Z(): number {
    if (this.vector) {
      return this.vector.z;
    }
  }
  set Z(value: number) {
    this.vector.z = value;
  }

  ngOnInit() {
  }

}
