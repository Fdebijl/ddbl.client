import { Component, OnInit } from '@angular/core';
import { GenericError } from '../../_domain/class';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  error: GenericError = {
    name: 'PlaceHolder',
    message: 'Placeholder',
    statusCode: '200',
    stack: 'placeholder'
  }

  constructor() {
    return;
  }

  ngOnInit(): void {
    return;
  }
}
