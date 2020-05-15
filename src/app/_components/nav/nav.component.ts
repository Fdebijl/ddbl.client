import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/_services';

/**
 * Edit the navigation menu items through environment.ts
 */
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  upperItems;
  lowerItems;

  constructor(
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.isAuthenticatedSubject.subscribe({
      next: (isAuthenticated) => {
        // We set a timeout here to mask the menu transition when the user clicks on 'logout'
        setTimeout(() => {
          this.setMenu(isAuthenticated);
        }, 500);
      }
    });

    this.setMenu(this.authenticationService.isAuthenticated());
    return;
  }

  ngOnInit(): void {
    return;
  }

  private setMenu(isAuthenticated: boolean): void {
    if (isAuthenticated) {
      this.upperItems = environment.userMenu.upper;
      this.lowerItems = environment.userMenu.lower;
    } else {
      this.upperItems = environment.guestMenu.upper;
      this.lowerItems = environment.guestMenu.lower;
    }
  }
}
