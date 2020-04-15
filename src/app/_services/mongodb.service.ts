import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';


@Injectable({
  providedIn: 'root'
})
export class MongodbService {

  GetMetadata(): Promise<unknown> {
    return fetch('http://localhost:6969/api/getMetadata').then(res => res.json()).then(data => {
      return data;
      });
  }

  GetMetadataVis(): Promise<unknown> {
    return fetch('http://localhost:6969/api/getMetadataVisualizations').then(res => res.json()).then(data => {
      return data;
    });
  }

  GetUserById(id: string): Promise<unknown> {
    console.log('FUCK')
    return fetch('http://localhost:6969/api/getUserById', {body: id}).then(res => res.json()).then(data => {
      return data;
    });
  }
}
