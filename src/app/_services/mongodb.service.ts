import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import {SetMeta, User} from '../_domain/class';
import {mockdata} from '../../assets/datasets/mockdata';
import {mockusers} from '../../assets/datasets/mockusers';



@Injectable({
  providedIn: 'root'
})
export class MongodbService {
  products: any = (dataset as any).default;
  productss: any = (userdataset as any).default;

  GetMetaDataNoAPI(): SetMeta[] {
    const data: SetMeta[] = mockdata;
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
    const users: User[] = mockusers
    for (const u of users)
    {
      if (u.id === id) {
        return u;
      }
    }
    return null;
  }
}
