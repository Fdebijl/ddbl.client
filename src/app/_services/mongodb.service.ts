import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

import { Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';


@Injectable({
  providedIn: 'root'
})
export class MongodbService {

  constructor() { }

  GetMetadata() {
    return fetch('http://localhost:6969/api/getMetadata').then(res => res.json()).then(data => {
      return data;
      });
  }

  GetMetadataVis() {
    return fetch('http://localhost:6969/api/getMetadataVisualizations').then(res => res.json()).then(data => {
      return data;
    });
  }

  GetUserById(id: string) {
    console.log('FUCK')
    return fetch('http://localhost:6969/api/getUserById', {body: id}).then(res => res.json()).then(data => {
      return data;
    });
  }
}
