import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: [
    './main-dashboard.component.scss',
    'main.js'
  ]
})
export class MainDashboardComponent implements OnInit {

  constructor() { }

  public data: Array<any>;

  ngOnInit(): void {
  }

}
