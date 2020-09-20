import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from '../services/member.service';
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import * as localForage from 'localforage';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private formbuiler: FormBuilder,
    private mb: MemberService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginFormValue();
  }

  loginFormValue() {
    this.loginForm = this.formbuiler.group({
      email: ['', this.validateEmail()],
      password: ['', Validators.required],
    });
  }

  validateEmail(): ValidatorFn {
    return (mail: { value: string }): { [key: string]: boolean } | null => {
      const { value } = mail;
      if (value !== null) {
        const emailFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const emailValidate = emailFormat.test(value);
        if (emailValidate === true) {
          return null;
        } else {
          return { email: false };
        }
      }
    };
  }
  onSubmit() {
    if (this.loginForm.valid) {
      this.mb
        .login(this.loginForm.value)
        .subscribe((token: String | Number) => {
          if (token != 500) {
            localForage.setItem('token', token);

            this.router.navigateByUrl('repair');
          } else {
            alert('Login FAIL');
          }
        });
    }
  }
}
