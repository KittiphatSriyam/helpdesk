import { Component, OnInit } from '@angular/core';
import { RepairService } from '../services/repair.service';
@Component({
  selector: 'app-show-que',
  templateUrl: './show-que.component.html',
  styleUrls: ['./show-que.component.less'],
})
export class ShowQueComponent implements OnInit {
  pagination = {
    skip: 0,
    limit: 10,
    countRow: [],
  };
  currentPage: number = 0;
  displayedColumns: string[] = [
    '#',
    'title',
    'datail',
    'create',
    'period',
    'status',
    'end',
    'owner',
    'official',
  ];
  dataSource: any = [];

  constructor(private rs: RepairService) {}

  ngOnInit(): void {
    this.getProblem();
  }
  changePage(page: number) {
    this.currentPage = page;
    this.pagination.skip = page * this.pagination.limit;

    this.getProblem();
  }
  getProblem() {
    let { skip, limit } = this.pagination;
    this.rs
      .getProblemLimited(skip, limit)
      .subscribe(({ data, status, countRow }) => {
        if (status == 200) this.dataSource = data;
        this.pagination.countRow = [
          ...Array(Math.ceil(countRow / this.pagination.limit)).keys(),
        ].map((i) => i + 0);
      });
  }
}
