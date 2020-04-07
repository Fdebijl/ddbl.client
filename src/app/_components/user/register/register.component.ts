import { Component, OnInit } from '@angular/core';
import { Router, RouterStateSnapshot  } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthenticationService } from '../../../_services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  redirectTo: string;
  message = {
    email: '',
    displayName: '',
    password: '',
    bio: '',
    affiliation: '',
    generic: ''
  };

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit(): void {
    if (this.authenticationService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }

    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      displayName: ['', Validators.required],
      password: ['', Validators.required],
      bio: [''],
      affiliation: ['']
    });
  }

  // convenience getter for easy access to form fields
  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.loading = true;

    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .then(() => {
        if (this.redirectTo) {
          this.router.navigate([this.redirectTo]);
        } else {
          this.router.navigate(['/']);
        }
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
