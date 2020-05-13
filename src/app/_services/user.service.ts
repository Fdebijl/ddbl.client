import { Injectable } from '@angular/core';
import { User } from '../_domain/class';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { AuthorizedFetch } from '../_util/AuthorizedFetch';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private storageService: StorageService) {
    return;
  }

  public getByID(id: string): Promise<User> {
    return new Promise((resolve) => {
      AuthorizedFetch(`account/${id}`)
      .then((response) => response.json())
      .then((user) => {
        resolve(new User(user));
      });
    });
  };

  public update(partialUser: User): Promise<User> {
    return new Promise((resolve, reject) => {
      const storedUser = this.storageService.user.getValue();

      AuthorizedFetch(`account/${storedUser.id}`, {
        method: 'PATCH',
        body: JSON.stringify(partialUser)
      })
      .then((response) => {
        if (response.status === 204) {
          const newUser = new User(Object.assign(storedUser.toObject(), partialUser.toObject()));
          this.storageService.user.next(newUser);
          resolve();
        } else {
          reject();
        }
      })
    });
  }

  public delete(): Promise<User> {
    return new Promise((resolve, reject) => {
      const storedUser = this.storageService.user.getValue();

      AuthorizedFetch(`account/${storedUser.id}`, {
        method: 'DELETE'
      })
        .then((response) => {
          if (response.status === 204) {
            resolve();
          } else {
            reject();
          }
        })
    });
  }
}
