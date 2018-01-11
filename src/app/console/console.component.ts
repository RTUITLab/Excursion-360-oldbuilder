import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { setInterval, setTimeout } from 'timers';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent implements OnInit {

  constructor(private _logger: LoggerService) { }

  @ViewChild('logDiv') divs: ElementRef;
  // TODO Do selector from rows to public
  private logrows: Array<string> = [];
  publicLogs: Array<string> = [];

  ngOnInit() {
    const div = this.divs.nativeElement as HTMLDivElement;
    this._logger.logs.subscribe(L => {
      this.publicLogs.push(L);
    });
  }

}
