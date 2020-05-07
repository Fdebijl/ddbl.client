import { Injectable } from '@angular/core';
import { User } from '../_domain/class';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { rejects } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private storageService: StorageService) {
    return;
  }

  public getByID(id: string): Promise<User> {
    return new Promise((resolve) => {
      fetch(`${environment.api_url}/account/${id}`, {
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

  public update(partialUser: User): Promise<User> {
    return new Promise((resolve, reject) => {
      const storedUser = this.storageService.user.getValue();

      fetch(`${environment.api_url}/account/${storedUser.id}`, {
        method: 'PATCH',
        credentials: 'omit',
        cache: 'no-cache',
        body: JSON.stringify(partialUser),
        headers: {
          'Content-Type': 'application/json'
        }
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
}
