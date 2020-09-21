import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RepairService } from '../services/repair.service';

@Component({
  selector: 'app-repair-form',
  templateUrl: './repair-form.component.html',
  styleUrls: ['./repair-form.component.less'],
})
export class RepairFormComponent implements OnInit {
  repairForm: FormGroup;
  @Output() tabNumberPage = new EventEmitter();
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
            this.tabNumberPage.emit(2);
            this.repairForm.reset();
          } else {
            alert('แจ้งปัญหาล้มเหลว');
          }
        });
    }
  }
}
