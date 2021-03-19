import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmailValidator} from '../config';
import {AuthService} from '../core/service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'opt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

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
          this.navigateToCorrectDomain();
        }, err => console.error(err));
    }
  }

  private navigateToCorrectDomain() {
    if (this.authService.isAdmin()) {
      return this.router.navigate(['admin']);
    }
    if (this.authService.isCaretaker()) {
      return this.router.navigate(['caretaker']);
    }

    alert(`You do not have access to this application. Use the mobile app!`)
  }

}
