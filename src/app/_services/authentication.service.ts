import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { StorageService } from './storage.service';
import { UserService } from './user.service';
import { GenericError, User } from '../_domain/class';

/**
 * The AuthenticationService handles all methods and checks related to logging in and registering.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private storageService: StorageService,
    private userService: UserService
  ) { }

  public isAuthenticated(): boolean {
    const user: User = this.storageService.user.getValue();

    if (!user) {
      return false;
    }

    if (!user.token) {
      return false;
    }

    return true;
  }

  public async login(email: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fetch(`${environment.api_url}/account/login`, {
        method: 'POST',
        credentials: 'omit',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      })
        .then((response) => response.json())
        .then(async (data) => {
          if (data.error) {
            reject(data.error as GenericError);
            return;
          }

          if (data.id) {
            const user = await this.userService.getByID(data.id);
            user.token = data.token;
            user.tokenExpiration = data.tokenExpiration;

            this.storageService.user.next(user);
            resolve();
          } else {
            reject(new GenericError({
              name: 'NoContentError',
              message: 'Could not login due to a server error, please contact support if the issue persists.'
            }));
          }
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

  public async register(email: string, displayName: string, bio: string, affiliation: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fetch(`${environment.api_url}/accounts`, {
        method: 'POST',
        credentials: 'omit',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          displayName,
          // bio,
          // affiliation,
          password,
        })
      })
        .then((response) => response.json())
        .then(async (data) => {
          if (data.error) {
            reject(data.error as GenericError);
            return;
          }

          if (data.id) {
            const user = await this.userService.getByID(data.id);
            user.token = data.token;
            user.tokenExpiration = data.tokenExpiration;

            this.storageService.user.next(user);
            resolve();
          } else {
            reject(new GenericError({
              name: 'NoContentError',
              message: 'Could not register due to a server error, please contact support if the issue persists.'
            }));
          }
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

  public async logout(): Promise<void> {
    return this.storageService.user.clear();
  }
}
