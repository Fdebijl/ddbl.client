import { Injectable } from '@angular/core';
import { User } from '../_domain/class';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public getByID(id: string): Promise<User> {
    return new Promise((resolve) => {
      fetch(`${environment.api_url}/users/${id}`, {
        method: 'GET',
        credentials: 'omit',
        cache: 'no-cache'
      })
      .then((response) => response.json())
      .then((user) => {
        resolve(new User(user));
      });
    });
  };
}
