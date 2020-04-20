import { Component, OnInit } from '@angular/core';
import { Router, RouterStateSnapshot  } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthenticationService } from '../../../_services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  redirectTo: string;

  message: string;
  messageGoodness: 'good' | 'bad' | 'neutral';
  messageShow = false;

  constructor(
      private formBuilder: FormBuilder,
      private authenticationService: AuthenticationService,
      private router: Router) {}

  ngOnInit(): void {
    const snapshot: RouterStateSnapshot = this.router.routerState.snapshot;

    // Allow an action to be passed in the url (i.e. example.com/login?action=logout)
    switch (snapshot.root.queryParams.action) {
      case 'logout': {
        this.authenticationService.logout();
        this.showMessage('good', 'You are now logged out');
        break;
      }
      case 'postcreation': {
        // Let the user know the account has been created and they should login
        this.showMessage('good', 'Your account has been created succesfully, you may now login.');
        break;
      }
      case 'loginFirst': {
        this.showMessage('bad', 'You have to login before accessing this page.');
        this.redirectTo = snapshot.root.queryParams.redirectTo;
      }
    }

    if (this.authenticationService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // Convenience getter for easy access to form fields
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.message = null;
    this.submitted = true;
    this.loading = true;

    this.authenticationService.login(this.f.email.value, this.f.password.value)
      .then(() => {
        // On succesfull login
        if (this.redirectTo) {
          this.router.navigate([this.redirectTo]);
        } else {
          this.router.navigate(['/']);
        }
      })
      .catch((error) => {
        // Failed login
        this.showMessage('bad', error?.message || 'Invalid email or password')
      })
      .finally(() => {
        this.submitted = false;
        this.loading = false;
      });
  }

  private showMessage(type: 'bad' | 'good' | 'neutral', message: string, timeout = 15): void {
    this.messageGoodness = type;
    this.message = message;
    this.messageShow = true;

    if (timeout > 0) {
      setTimeout(() => {
        this.messageShow = false;

        setTimeout(() => {
          this.showMessage('neutral', 'Please log in to access the DataSystem', 0);
        }, 1500)
      }, timeout * 1000)
    }
  }
}
