import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-datalistitem',
  templateUrl: './datalistitem.component.html',
  styleUrls: ['./datalistitem.component.scss']
})
export class DatalistitemComponent implements OnInit {
  @Input() dataset;

  constructor() { }

  ngOnInit(): void {
  }

}
