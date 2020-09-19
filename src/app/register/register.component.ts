import { Component, OnInit } from '@angular/core';
import { departmentService } from '../services/department.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
})
export class RegisterComponent implements OnInit {
  constructor(private ds: departmentService) {}

  ngOnInit(): void {
    this.ds.getDepartment().subscribe((res: string[]) => {
      console.log('res->>', res);
    });
  }
}
