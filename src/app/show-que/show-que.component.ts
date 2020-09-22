import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
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
    'หัวข้อ',
    'รายละเอียด',
    'วันที่สร้าง',
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
      .getProblemLimited(skip, limit)
      .subscribe(({ data, status, countRow }) => {
        if (status == 200) this.dataSource = data;
        let count: any = Math.ceil(countRow / this.pagination.limit);
        count = Array.from({ length: count }, (v, k) => k);
        this.pagination.countRow = count;
      });
  }
}
