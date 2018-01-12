import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hierarchy-bar',
  templateUrl: './hierarchy-bar.component.html',
  styleUrls: ['./hierarchy-bar.component.css']
})
export class HierarchyBarComponent implements OnInit {

  nodes = [
    {
      id: 1,
      name: 'root1',
      children: [
        { id: 2, name: 'child1' },
        { id: 3, name: 'child2' }
      ]
    },
    {
      id: 4,
      name: 'root2',
      children: [
        { id: 5, name: 'child2.1' },
        {
          id: 6,
          name: 'child2.2',
          children: [
            { id: 7, name: 'subsub' }
          ]
        }
      ]
    }
  ];
  options = {};
  constructor() { }

  ngOnInit() {
  }

}
