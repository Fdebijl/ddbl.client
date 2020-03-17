import { Component, OnInit } from '@angular/core';
import {Metadata} from '../../_domain/metadata';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: [
    './main-dashboard.component.scss',
  ]
})
export class MainDashboardComponent implements OnInit {

  constructor() { }

  public data: Array<Metadata>;

  ngOnInit(): void {
  }

}
