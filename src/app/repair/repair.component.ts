import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RepairService } from '../services/repair.service';
@Component({
  selector: 'app-repair',
  templateUrl: './repair.component.html',
  styleUrls: ['./repair.component.less'],
})
export class RepairComponent implements OnInit {
  repairForm: FormGroup;
  constructor(private formbuiler: FormBuilder, private rs: RepairService) {}

  ngOnInit(): void {
    this.repairFormValue();
  }

  repairFormValue() {
    this.repairForm = this.formbuiler.group({
      title: ['', Validators.required],
      detail: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.repairForm.valid) {
      const token = localStorage.getItem('token');
      this.rs
        .addProblem({ ...this.repairForm.value, token: token })
        .subscribe(({ status }) => {
          if (status == 200) {
            alert('แจ้งปัญหาเรียบร้อย');
            this.repairForm.reset();
          } else {
            alert('แจ้งปัญหาล้มเหลว');
          }
        });
    }
  }
}
