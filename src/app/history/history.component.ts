import { Component, OnInit } from '@angular/core';
import { RepairService } from '../services/repair.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.less'],
})
export class HistoryComponent implements OnInit {
  pagination = {
    skip: 0,
    limit: 10,
    countRow: [],
  };
  currentPage: number = 0;
  displayedColumns: string[] = [
    '#',
    'หัวข้อ',
    'รายละเอียด',
    'วันที่สร้าง',
    'วันที่เสร็จ',
    'ระยะเวลา',
    'สถานะ',
    'เจ้าของ',
    'ผู้รับผิดชอบ',
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
      .getProblemLimitedDone(skip, limit)
      .subscribe(({ data, status, countRow }) => {
        if (status == 200) this.dataSource = data;
        let count: any = Math.ceil(countRow / this.pagination.limit);
        count = Array.from({ length: count }, (v, k) => k);
        this.pagination.countRow = count;
      });
  }
}
