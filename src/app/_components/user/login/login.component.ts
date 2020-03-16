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
  message = {
    user: '',
    password: '',
    generic: ''
  };

  constructor(
      private formBuilder: FormBuilder,
      private authenticationService: AuthenticationService,
      private router: Router) {}

  ngOnInit(): void {
    const snapshot: RouterStateSnapshot = this.router.routerState.snapshot;

    // Allow an action to be passed in the url (i.e. example.com/login?action=logout)
    switch (snapshot.root.queryParams.action) {
      case 'logout':
        this.authenticationService.logout();
        this.router.navigate(['/login']);
        break;
      case 'postcreation':
        // Let the user know the account has been created and they should login
        this.message.generic = 'Your account has been created succesfully, you may now login.';
        break;
    }

    if (this.authenticationService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.loading = true;

    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch(() => {
        this.message.generic = 'Invalid username or password';

        setTimeout(() => {
          this.message.generic = null;
        }, 10000);
      })
      .finally(() => {
        this.submitted = false;
        this.loading = false;
      });
  }
}
