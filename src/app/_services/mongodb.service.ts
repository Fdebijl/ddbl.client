import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import {SetMeta, User} from '../_domain/class';
import * as dataset from '../../assets/datasets/metadata-fixture.json'
import * as userdataset from '../../assets/datasets/user-fixture.json'


@Injectable({
  providedIn: 'root'
})
export class MongodbService {
  products: any = (dataset as any).default;
  productss: any = (userdataset as any).default;

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
    return fetch('http://localhost:6969/api/getUserById', {body: id}).then(res => res.json()).then(data => {
      return data;
    });
  }

  GetMetaDataNoAPI(): SetMeta[] {
    const data: SetMeta[] = (dataset as any).default;;
    return data;
  }

  GetMetadataVisNoAPI(): SetMeta[] {
    const allData = this.GetMetaDataNoAPI();
    const data: SetMeta[] = [];
    for (const m of allData){
      if (m.type === 'Visualization') {
        data.push(m);
      }
    }
    return data;
  }

  GetUserByIdNoAPI(id: string): User {
    const users: User[] = (userdataset as any).default;
    for (const u of users)
    {
      if (u.id === id) {
        return u;
      }
    }
    return null;
  }
}
