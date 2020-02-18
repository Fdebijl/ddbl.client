import { Component } from '@angular/core';
import { AuthenticationService, StorageService } from './_services';
import { User } from './_domain';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private user: User;

  constructor(
    private authenticationService: AuthenticationService,
    private storageService: StorageService
  ) {
    this.storageService.user.subscribe({
      next: (user) => this.user = user
    })
  }

  isAuthenticated(): boolean {
    return this.authenticationService.isAuthenticated();
  };
}
