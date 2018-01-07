import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mesh-params',
  templateUrl: './mesh-params.component.html',
  styleUrls: ['./mesh-params.component.css']
})
export class MeshParamsComponent implements OnInit {

  params: Array<string>;

  constructor() { }

  ngOnInit() {
    this.params = ['lol', 'lol2'];
  }

}
