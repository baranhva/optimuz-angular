import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmailValidator} from '../../../config';

export interface UserForm {
  email?: string;
  firstName?: string;
  lastName?: string;
}

@Component({
  selector: 'opt-user-create-form',
  templateUrl: './user-create-form.component.html',
  styleUrls: ['./user-create-form.component.scss']
})
export class UserCreateFormComponent implements OnInit {

  @Output() submit: EventEmitter<UserForm> = new EventEmitter<UserForm>();

  form: FormGroup;
  email: AbstractControl;
  firstName: AbstractControl;
  lastName: AbstractControl;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, EmailValidator])],
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])]
    });

    this.email = this.form.controls?.email;
    this.firstName = this.form.controls?.firstName;
    this.lastName = this.form.controls?.lastName;
  }

  handleSubmit() {
    if (this.form.valid) {
      const {email, firstName, lastName} = this.form.value;
      this.submit.emit({email, firstName, lastName});
    }
  }

}
