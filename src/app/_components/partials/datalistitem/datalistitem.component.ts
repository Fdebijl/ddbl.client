import { Component, OnInit, Input } from '@angular/core';
import { DataSet } from 'src/app/_domain/class';

@Component({
  selector: 'app-datalistitem',
  templateUrl: './datalistitem.component.html',
  styleUrls: ['./datalistitem.component.scss']
})
export class DatalistitemComponent implements OnInit {
  @Input() dataSet: DataSet;

  constructor() {
    return;
  }

  ngOnInit(): void {
    return;
  }

}
