import { Injectable } from '@angular/core';
import { User } from '../_domain';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // TODO: Implement stub
  public getByID(id: string): User {
    return new User({id});
  };
}
