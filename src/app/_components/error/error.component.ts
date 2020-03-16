import { Component, OnInit } from '@angular/core';
import { GenericError } from 'src/app/_domain';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  error: GenericError;

  constructor() { }

  ngOnInit(): void {
  }

}
