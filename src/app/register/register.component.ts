import { Component, OnInit } from '@angular/core';
import { departmentService } from '../services/department.service';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
})
export class RegisterComponent implements OnInit {
  department: string[];
  register: FormGroup;
  constructor(
    private ds: departmentService,
    private FormBuilder: FormBuilder,
    private FormGroup: FormGroup
  ) {}

  ngOnInit(): void {
    this.ds.getDepartment().subscribe((res: string[]) => {
      this.department = res;
    });
    this.register = this.FormBuilder.group({
      email: '',
      pass: '',
      rePass: '',
      name: '',
      surname: '',
      age: 1,
      dept: '',
    });
  }
}
