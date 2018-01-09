import { Component, OnInit } from '@angular/core';
import { MeshDataService } from '../mesh-data.service';


@Component({
  selector: 'app-mesh-params',
  templateUrl: './mesh-params.component.html',
  styleUrls: ['./mesh-params.component.css']
})
export class MeshParamsComponent implements OnInit {

  params: Array<string>;

  constructor(private meshData: MeshDataService) { }

  ngOnInit() {
    //  this.meshData.goal.subscribe(r => this.params = r);
    this.meshData.meshStream.subscribe(M => {
      if (!M) {
        return;
      }
      this.params = [
        `X: ${M.position.x}`,
        `Y: ${M.position.y}`,
        `Z: ${M.position.z}`,
        `Rotation X: ${M.rotation.x}`
      ];
    });
  }

}
