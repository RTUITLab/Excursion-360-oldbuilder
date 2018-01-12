import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { setInterval } from 'timers';

@Injectable()
export class LoggerService {

  private _logs = new BehaviorSubject<string>('init message');
  public logs = this._logs.asObservable();
  constructor() {}


  public log(message: string): void {
    this._logs.next(`${new Date().toLocaleTimeString()} - ${message}`);
  }
}
