import { Injectable } from '@angular/core';
import {GenericError, User} from '../_domain/class';
import { StorageService } from './storage.service';
import { AuthorizedFetch } from '../_util/AuthorizedFetch';
import {Endpoints} from "../_domain/enum/Endpoint";

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
  }

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

  public async uploadProfilePicture(image: string): Promise<void> {
    const storedUser = this.storageService.user.getValue();

    return new Promise((resolve, reject) => {
      AuthorizedFetch(`avatars/${storedUser.id}`, {
        method: 'POST',
        body: JSON.stringify({
          image
        })
      })
        .then((response) => response.json())
        .then(async (data) => {
          if (data.error) {
            reject(data.error as GenericError);
            return;
          }
          storedUser.profilePicture = data.img;
          this.storageService.user.next(storedUser);

        })
        .catch((error) => {
          // Check for internet connection
          if (!navigator.onLine) {
            reject(new GenericError({
              name: 'NoNetworkError',
              message: 'There is no network connection right now. Check your internet connection and try again.'
            }));
            return;
          }

          console.log(error);
          reject(error);
        });
    });
  }
}
