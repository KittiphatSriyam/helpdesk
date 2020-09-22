import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RepairService } from '../services/repair.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.less'],
})
export class ScheduleComponent implements OnInit {
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
    'ตัวเลือก',
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
      .getProblemLimitedPending(skip, limit)
      .subscribe(({ data, status, countRow }) => {
        if (status == 200) this.dataSource = data;
        let count: any = Math.ceil(countRow / this.pagination.limit);
        count = Array.from({ length: count }, (v, k) => k);
        this.pagination.countRow = count;
      });
  }
  jobDone(id: number) {
    this.rs.setStatusJob(id, 3).subscribe(({ status }) => {
      if (status == 200) {
        alert('Success');
        this.dataSource = this.dataSource.filter(
          (data) => data.repair_id != id
        );
      } else {
        alert('Fail...');
      }
    });
  }
}
