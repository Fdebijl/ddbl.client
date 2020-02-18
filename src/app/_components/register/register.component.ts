import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthenticationService } from '../../_services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private username;
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  wrongcreds = null;

  constructor(
      private formBuilder: FormBuilder,
      private authenticationService: AuthenticationService,
      private router: Router) {}

  ngOnInit(): void {
    if (this.authenticationService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }

    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.loading = true;

    this.authenticationService.register(this.f.username.value, this.f.firstname.value, this.f.lastname.value, this.f.password.value)
      .then(() => {
        this.router.navigate(['/login'], {queryParams: {
          action: 'postcreation'
        }});
      })
      .catch(() => {
        this.wrongcreds = 'Couldn\'t create your account, please contact an admin if the issue persists.';

        setTimeout(() => {
          this.wrongcreds = null;
        }, 10000);
      })
      .finally(() => {
        this.submitted = false;
        this.loading = false;
      });
  }
}
