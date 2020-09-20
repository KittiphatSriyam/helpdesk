import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../services/department.service';
import { MemberService } from '../services/member.service';
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
})
export class RegisterComponent implements OnInit {
  department: any;
  register: FormGroup;
  passwordMatched: boolean;
  constructor(
    private ds: DepartmentService,
    private ms: MemberService,
    private formbuiler: FormBuilder,
    private router: Router
  ) {
    this.initDefaultValue();
  }
  initDefaultValue() {
    this.register = this.formbuiler.group({
      email: ['', this.validateEmail()],
      pass: ['', Validators.required],
      rePass: [''],
      name: [''],
      surname: [''],
      age: [1],
      dept: [''],
    });
    // this.passwordMatched = true;
  }
  ngOnInit(): void {
    // this.ds.getDepartment().subscribe((res: string[]) => {
    //   this.department = res;
    // });
  }
  onsave() {
    if (this.register.valid) {
      this.ms.register(this.register.value).subscribe((status: Number) => {
        if (status == 200) {
          alert('สมัครสมาชิกเรียบร้อย');
          this.router.navigateByUrl('login');
        } else {
          alert('สมัครสมาชิกล้มเหลว');
        }
      });
    } else {
      alert('save ไม่ได้ ++++');
    }
  }
  isMatchedPassWord() {
    if (
      this.register.controls['pass'].value != '' &&
      this.register.controls['rePass'].value != ''
    ) {
      if (
        this.register.controls['pass'].value !==
        this.register.controls['rePass'].value
      ) {
        this.passwordMatched = false;
      } else {
        this.passwordMatched = true;
      }
    }
  }
  validateEmail(): ValidatorFn {
    return (c: { value: string }): { [key: string]: boolean } | null => {
      const { value } = c;
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
