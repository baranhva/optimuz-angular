import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmailValidator} from '../config';

@Component({
  selector: 'opt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, EmailValidator])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });

    this.email = this.loginForm.controls.email;
    this.password = this.loginForm.controls.password;
  }

}
