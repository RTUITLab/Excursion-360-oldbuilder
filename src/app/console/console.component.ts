import { Component, OnInit } from '@angular/core';
import { setInterval } from 'timers';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent implements OnInit {

  constructor() { }

  log: string = '';

  ngOnInit() {
    setInterval(() => this.log += '||||||||||||||||||||||||||||||||||||', 500);
  }

}
