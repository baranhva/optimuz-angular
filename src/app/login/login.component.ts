import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmailValidator} from '../config';
import {AuthService} from '../core/service/auth.service';

@Component({
  selector: 'opt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, EmailValidator])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });

    this.email = this.loginForm.controls.email;
    this.password = this.loginForm.controls.password;
  }

  isBusyLoggingIn: boolean = false;

  submit() {
    if (this.loginForm.valid && !this.isBusyLoggingIn) {
      this.isBusyLoggingIn = true;
      const {email, password} = this.loginForm.value;

      this.authService.login(email, password)
        .subscribe(() => {
          console.log(`logged in successfully`);
          this.isBusyLoggingIn = false;
        }, err => console.error(err));
    }
  }

}
