import { Injectable } from '@angular/core';
import {GenericError, User} from '../_domain/class';
import { StorageService } from './storage.service';
import { AuthorizedFetch } from '../_util/AuthorizedFetch';
import { Base64ToBlob } from '../_util/Base64ToBlob';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private storageService: StorageService) {
    return;
  }

  public getByID(id: string): Promise<User> {
    return new Promise((resolve, reject) => {
      AuthorizedFetch(`account/${id}`)
      .then((response) => response.json())
      .then((user) => {
        if (user.error){
          reject(user);
          return;
        }
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

  public async uploadProfilePicture(img: string): Promise<void> {
    const storedUser = this.storageService.user.getValue();

    return new Promise(async (resolve, reject) => {
      const fd = await Base64ToBlob(img);
      AuthorizedFetch(`avatars/upload/${storedUser.id}`, {
        method: 'POST',
        body: fd
      }, {
        useDefaults: false
      })
        .then((response) => response.json())
        .then(async (data) => {
          if (data.error) {
            reject(data.error as GenericError);
            return;
          }

          resolve();
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }
}
