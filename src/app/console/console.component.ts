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

  // TODO Do selector from rows to public
  private logrows: Array<string> = [];
  publicLogs: Array<string> = [];
  @ViewChild('scroller') scrollerRef: ElementRef;
  scroller: HTMLElement;
  ngOnInit() {
    this.scroller = this.scrollerRef.nativeElement;
    const observer = new MutationObserver(M => this.handleMutation());
    observer.observe(this.scroller, { attributes: true, childList: true });

    this._logger.allLogs.forEach(L => this.publicLogs.push(L));
    this._logger.logs.subscribe(L => {
      this.publicLogs.push(L);
    });
  }
  handleMutation() {
    if (this.needScroll()) {
      this.scroller.scrollTop = this.scroller.scrollHeight;
    }
  }
  private needScroll(): boolean {
    return ((this.scroller.scrollHeight - this.scroller.clientHeight) - this.scroller.scrollTop) <= 50;
  }

}
