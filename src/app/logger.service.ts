import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { setInterval } from 'timers';

@Injectable()
export class LoggerService {

  private _logs = new BehaviorSubject<string>('init message');
  public logs = this._logs.asObservable();
  constructor() {
    // setInterval(() => this.log('sd'), 1000);
  }


  public log(message: string): void {
    const date = new Date();
    this._logs.next(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} - ${message}`);
  }
}
