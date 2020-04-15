import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    bio: '',
    affiliation: '',
    password: '',
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
      email: ['', Validators.required],
      displayName: ['', Validators.required],
      bio: [''],
      affiliation: [''],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    this.message.email = null;
    this.message.displayName = null;
    this.message.bio = null;
    this.message.affiliation = null;
    this.message.password = null;
    this.message.generic = null;
    this.submitted = true;
    this.loading = true;

    this.authenticationService.register(
      this.f.email.value, this.f.displayName.value, this.f.bio.value, this.f.affiliation.value, this.f.password.value
    )
      .then(() => {
          this.router.navigate(['/login?action=postcreation']);
      })
      .catch((error) => {
        // Failed login
        this.message.generic = error?.message || 'Invalid email or password';

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
