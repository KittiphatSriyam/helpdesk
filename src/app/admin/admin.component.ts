import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less'],
})
export class AdminComponent implements OnInit {
  adminForm: FormGroup;
  constructor(
    private formbuiler: FormBuilder,
    private as: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.adminFormValue();
  }

  adminFormValue() {
    this.adminForm = this.formbuiler.group({
      email: ['', this.validateEmail()],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.adminForm.valid) {
      this.as.adminLogin(this.adminForm.value).subscribe(({ status, data }) => {
        if (status == 200) {
          localStorage.setItem('adminToken', data);
          this.router.navigateByUrl('dashboard');
        } else {
          alert('คุณไม่ได้รับอนุญาติการใช้งาน');
        }
      });
    } else {
      alert('กรอก email และ password ให้ถูกต้อง');
    }
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
}
