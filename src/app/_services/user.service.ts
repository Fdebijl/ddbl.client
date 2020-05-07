import { Injectable } from '@angular/core';
import { User } from '../_domain/class';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

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
    return new Promise((resolve) => {
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
          resolve();
          this.storageService.user.next(Object.assign(storedUser, partialUser))
        }
      })
    });
  }
}
