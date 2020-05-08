import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Messenger } from 'src/app/_domain/class/Messenger';
import { User } from 'src/app/_domain/class';
import { PwnedService } from 'src/app/_services/pwned.service';
import { AuthenticationService } from 'src/app/_services';

@Component({
  selector: 'stepone',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.scss']
})
export class OneComponent extends Messenger implements OnInit {
  stepOneForm: FormGroup;
  loading = false;
  submitted = false;
  @Output() stepDone = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    super('Enter your name, email and a strong password');
  }

  ngOnInit(): void {
    this.stepOneForm = this.formBuilder.group({
      displayName: ['', Validators.required],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(12)]]
    });
  }

  get formFields(): { [key: string]: AbstractControl } {
    return this.stepOneForm.controls;
  }

  async onSubmit(): Promise<void> {
    this.submitted = true;
    this.loading = true;
    this.clearMessage();

    const displayName = this.formFields.displayName.value;
    const email = this.formFields.email.value;
    const password = this.formFields.password.value;

    if (displayName.length === 0 || email.length === 0 || password.length === 0) {
      this.showMessage('bad', 'Please enter a display name, email address and a password')
      this.submitted = false;
      this.loading = false;
      return;
    }

    if (!email.match(/(.+)@(.+)\.(.+)/gi)) {
      this.showMessage('bad', 'Please enter a valid email address');
    }

    if (password.length < 12) {
      this.showMessage('bad', 'Please enter a password that is at least 12 characters long', true);
      this.submitted = false;
      this.loading = false;
      return;
    }

    // Check in with the HaveIBeenPwned API
    const countPwned = await PwnedService.passwordIsPwnd(password)

    if (countPwned) {
      this.showMessage(
        'bad',
        `The password you used was found in <a href="https://haveibeenpwned.com/Passwords" rel="noopener" target="_blank">${countPwned} data ${Number.parseInt(countPwned) > 1 ? 'breaches' : 'breach'}</a>, ` +
        `please choose a new password and strongly consider changing this password if you use it elsewhere.`,
        true
      );
      this.submitted = false;
      this.loading = false;
      return;
    }

    const pendingUser = new User({
      email,
      password,
      displayName
    });

    this.authenticationService.register(pendingUser)
      .then(() => {
        this.stepDone.emit();
      })
      .catch((error) => {
        // Failed login
        this.showMessage('bad', error?.message || 'Invalid email or password');
      })
      .finally(() => {
        this.submitted = false;
        this.loading = false;
      });
  }
}
