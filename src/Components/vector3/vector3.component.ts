import { MeshDataService } from '../../app/mesh-data.service';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractMesh, Mesh, Vector3 } from 'babylonjs';

@Component({
  selector: 'app-vector3',
  templateUrl: './vector3.component.html',
  styleUrls: ['./vector3.component.css']
})
export class Vector3Component implements OnInit {
  @Input() param: string;
  private vector: Vector3;
  constructor(private meshStream: MeshDataService) { }

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
    this.meshStream.meshStream.subscribe(M => {
      if (!M) { console.log('nothing'); return; }
      this.vector = M[this.param] as Vector3;
    });
  }

}
