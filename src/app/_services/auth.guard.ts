import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';

/**
 * The AuthGuard prevents a user that is not logged in from viewing the application.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public router: Router,
    public auth: AuthenticationService
  ){}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login'], {queryParams: {action: 'loginFirst', redirectTo: route.routeConfig.path}});
      return false;
    }

    return true;
  }
}