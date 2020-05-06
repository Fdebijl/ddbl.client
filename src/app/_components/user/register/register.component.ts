import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthenticationService } from '../../../_services';
import { Messenger } from 'src/app/_domain/class/Messenger';
import { User } from 'src/app/_domain/class';

/**
 * Registration uses multiple steps, which are self-contained components residing under /steps.
 * Each step should collect its own data, verify it and show any errors where applicable.
 * If the data is complete and accurate, an event should be emitted that indicates the user can go to the next step.
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends Messenger implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  redirectTo: string;
  step = 0;
  steps = ['one', 'two'];
  pendingUser: User;

  constructor(private authenticationService: AuthenticationService,
    private router: Router) {
      super();
  }

  ngOnInit(): void {
    if (this.authenticationService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  nextStep(): string {
    if (this.step >= this.steps.length - 1) {
      this.router.navigate(['/']);
    }
    return this.steps[this.step++];
  }
}
