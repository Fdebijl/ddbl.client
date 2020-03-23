import { Injectable } from '@angular/core';
import { User } from '../_domain';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  // TODO: Implement stub
  public getByID(id: string): User {
    return null;
  };
}
