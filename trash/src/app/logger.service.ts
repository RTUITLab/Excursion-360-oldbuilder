import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { setInterval } from 'timers';
import { Type } from '@angular/core';

@Injectable()
export class LoggerService {
  private _logs = new BehaviorSubject<string>(undefined);
  public allLogs: Array<string> = [];
  public logs = this._logs.asObservable();
  constructor() {
    this.allLogs.push('Logger initialize');
  }
  getLogger(invokerType: Type<any>) {
    return new Logger(invokerType, (A) => {
      this.allLogs.push(A);
      this._logs.next(A);
    });
  }
}

export class Logger {
  constructor(private invokerType: Type<any>, private logFunc: any) { }
  public log(message: string): void {
    this.logFunc(`${new Date().toLocaleTimeString()} [${this.invokerType.name}] - ${message}`);
  }
}
