import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-problem',
  templateUrl: './view-problem.component.html',
  styleUrls: ['./view-problem.component.less'],
})
export class ViewProblemComponent implements OnInit {
  dataModel = {
    id: 0,
    period: '',
  };
  constructor(
    public viewProblem: MatDialogRef<ViewProblemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.dataModel.id = this.data.repair_id;
  }

  onClosedViewProblem(): void {
    this.viewProblem.close();
  }
  saveData() {
    this.viewProblem.close(this.dataModel);
  }
}
