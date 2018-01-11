import { LoggerService } from '../logger.service';
import { Component, OnInit } from '@angular/core';
import { MeshDataService } from '../mesh-data.service';


@Component({
  selector: 'app-mesh-params',
  templateUrl: './mesh-params.component.html',
  styleUrls: ['./mesh-params.component.css']
})
export class MeshParamsComponent implements OnInit {
  constructor(private _logger: LoggerService) { }

  ngOnInit() {
    this._logger.log('init');
  }

}
