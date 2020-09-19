import { Component, OnInit } from '@angular/core';
import { departmentService } from '../services/department.service';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
function validateEmail(): ValidatorFn {
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
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
})
export class RegisterComponent implements OnInit {
  department: string[];
  register: FormGroup;
  email: true;
  password: boolean;
  constructor(
    private ds: departmentService,
    private formbuiler: FormBuilder
  ) {
    this.initDefaultValue();
  }
  initDefaultValue() {
    this.register = this.formbuiler.group({
      email: ['', validateEmail()],
      pass: ['', Validators.required],
      rePass: [''],
      name: [''],
      surname: [''],
      age: [1],
      dept: [''],
    });
    this.password = true;
  }
  ngOnInit(): void {
    // this.ds.getDepartment().subscribe((res: string[]) => {
    //   this.department = res;
    // });
  }
  onsave(){ 
    console.log('this.register +++', this.register);
    console.log('this.register', this.register.value);
    if(this.register.valid) {
      alert('save ได้จ้า');
    } else {
      alert('save ไม่ได้ ++++');
    }
  }
  passwordtest(){
    if(this.register.controls['pass'].value != '' && this.register.controls['rePass'].value != '') {
      if(this.register.controls['pass'].value !== this.register.controls['rePass'].value) {
        this.password = false;
      }
    }
  }
}
