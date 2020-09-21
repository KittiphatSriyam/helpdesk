import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-repair',
  templateUrl: './repair.component.html',
  styleUrls: ['./repair.component.less'],
})
export class RepairComponent implements OnInit {
  repairForm: FormGroup;
  constructor(private formbuiler: FormBuilder) {}

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
    console.log('this.repairForm->>', this.repairForm.valid);
  }
}
