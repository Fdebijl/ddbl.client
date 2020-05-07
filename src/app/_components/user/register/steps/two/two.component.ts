import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { Messenger } from 'src/app/_domain/class/Messenger';
import { User } from 'src/app/_domain/class';
import { UserService } from 'src/app/_services';

@Component({
  selector: 'steptwo',
  templateUrl: './two.component.html',
  styleUrls: ['./two.component.scss']
})
export class TwoComponent extends Messenger implements OnInit {
  stepTwoForm: FormGroup;
  loading = false;
  submitted = false;
  @Output() stepDone = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    super('Tell us a little bit more about yourself');
  }

  ngOnInit(): void {
    this.stepTwoForm = this.formBuilder.group({
      bio: [''],
      affiliation: [''],
    });
  }

  get formFields(): { [key: string]: AbstractControl } {
    return this.stepTwoForm.controls;
  }

  async onSubmit(): Promise<void> {
    this.submitted = true;
    this.loading = true;
    this.clearMessage();

    const bio = this.formFields.bio.value;
    const affiliation = this.formFields.affiliation.value;
    const partialUser = new User({
      bio,
      affiliation
    });

    this.userService.update(partialUser).then(() => {
      this.submitted = false;
      this.loading = false;
      this.stepDone.emit(true);
    });
  }
}
