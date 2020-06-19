import { Injectable } from '@angular/core';

import { StorageService } from './storage.service';
import { UserService } from './user.service';
import { GenericError, User } from '../_domain/class';
import { AuthorizedFetch } from '../_util/AuthorizedFetch';
import { Endpoints } from '../_domain/enum/Endpoint';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import {JwthelperService} from './jwthelper.service';

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
    private router: Router,
    private jwthelperService: JwthelperService
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
          username: email,
          password
        })
      }, {
        authorized: false
      })
        .then((response) => {
          if (response.status !== 200) {
            throw new Error('Failed to login, could not connect to server')
          }

          const authHeader = response.headers.get('Authorization');
          return authHeader;
        })
        .then(async (data) => {
          const token = data;
          const tokenWithoutBearer = data.replace('Bearer ', '');
          const decoded = this.jwthelperService.decodeToken(tokenWithoutBearer);
          const date = new Date();
          date.setTime(new Date().getTime() + (24 * 60 * 60 * 1000));

          // Temporary user to make the getByID request
          const stubUser = new User({
            id: decoded.userId as string,
            token: token,
            tokenExpiration: date
          });

          this.storageService.user.next(stubUser);

          if (stubUser.id) {
            const user = await this.userService.getByID(stubUser.id);
            user.token = token;
            user.tokenExpiration = date;
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
      }).then(async (response) => {
          if (!response.ok) {
            reject(new GenericError({
              name: response.statusText,
              statusCode: `${response.status}`,
              message: 'Could not register account'
            }));
            return;
          }

          await this.login(pendingUser.email, pendingUser.password);
          const authorizedUser = this.storageService.user.getValue();

          if (authorizedUser.id) {
            resolve(authorizedUser);
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
}
