import { Injectable } from '@angular/core';

import { StorageService } from './storage.service';
import { UserService } from './user.service';
import { GenericError, User } from '../_domain/class';
import { AuthorizedFetch } from '../_util/AuthorizedFetch';
import { Endpoints } from '../_domain/enum/Endpoint';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

/**
 * The AuthenticationService handles all methods and checks related to logging in and registering.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  /**
   * Subscribe to this property to get real-time information on the authentication status of the user.
   * For one-time checks for authentication, `isAuthenticated` is preferred.
   *
   * @type {BehaviorSubject<boolean>}
   * @memberof AuthenticationService
   */
  public isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private storageService: StorageService,
    private userService: UserService,
    private router: Router
  ) {
    this.storageService.user.subscribe({
      next: (user) => {
        this.isAuthenticatedSubject.next(this.isAuthenticated(user));
      }
    })
  }

  public isAuthenticated(user?: User): boolean {
    if (!user) {
      user = this.storageService.user.getValue();
    }

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
      AuthorizedFetch(Endpoints.accountLogin, {
        method: 'POST',
        body: JSON.stringify({
          email,
          password
        })
      }, {
        authorized: false
      })
        .then((response) => response.json())
        .then(async (data) => {
          if (data.error) {
            reject(data.error as GenericError);
            return;
          }

          // Temporary user to make the getByID request
          const stubUser = new User({
            id: data.id,
            token: data.token,
            tokenExpiration: data.tokenExpiration
          });
          this.storageService.user.next(stubUser);

          if (stubUser.id) {
            const user = await this.userService.getByID(stubUser.id);
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
          console.log(error);
          reject(error);
        });
    });
  }

  public async register(pendingUser: User): Promise<User> {
    return new Promise((resolve, reject) => {
      AuthorizedFetch(Endpoints.account, {
        method: 'POST',
        body: JSON.stringify({
          email: pendingUser.email,
          displayName: pendingUser.displayName,
          password: pendingUser.password,
        })
      }, {
        authorized: false
      })
        .then((response) => response.json())
        .then(async (data) => {
          if (data.error) {
            reject(data.error as GenericError);
            return;
          }

          // Temporary user to make the getByID request
          const stubUser = new User({
            id: data.id,
            token: data.token,
            tokenExpiration: data.tokenExpiration
          });
          this.storageService.user.next(stubUser);

          if (stubUser.id) {
            const user = await this.userService.getByID(stubUser.id);
            user.token = data.token;
            user.tokenExpiration = data.tokenExpiration;
            this.storageService.user.next(user);
            resolve(user);
          } else {
            reject(new GenericError({
              name: 'NoContentError',
              message: 'Could not register due to a server error, please contact support if the issue persists.'
            }));
          }
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  public async logout(): Promise<void> {
    const user = this.storageService.user.getValue();

    return new Promise((resolve, reject) => {
      AuthorizedFetch(Endpoints.accountLogout, {
        method: 'POST',
        body: JSON.stringify({
          id: user.id
        })
      })
        .then(() => {
          this.storageService.user.clear();
        })
        .catch((error) => {
          if (error.name === 'SessionExpiredError') {
            this.router.navigate(['/']);
            return;
          }

          console.log(error);
          reject(error);
        });
    });
  }
}
