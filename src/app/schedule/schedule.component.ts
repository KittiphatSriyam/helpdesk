import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RepairService } from '../services/repair.service';
import { ViewProblemComponent } from '../view-problem/view-problem.component';

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

  constructor(private rs: RepairService, private dialog: MatDialog) {}

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
        if (status == 200) {
          for (let index in data) {
            if (data[index].official) {
              data[index].official =
                data[index].official.name.trim() +
                ' ' +
                data[index].official.surname.trim();
            }
            if (data[index].owner) {
              data[index].owner =
                data[index].owner.name.trim() +
                ' ' +
                data[index].owner.surname.trim();
            }
          }

          this.dataSource = data;
          let count: any = Math.ceil(countRow / this.pagination.limit);
          count = Array.from({ length: count }, (v, k) => k);
          this.pagination.countRow = count;
        }
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

  viewProblem(data) {
    const viewProblem = this.dialog.open(ViewProblemComponent, {
      width: '800px',
      data: data,
    });
    viewProblem.afterClosed().subscribe((dataDialog) => {
      if (dataDialog) {
        const token = localStorage.getItem('adminToken');
        this.rs
          .updateProblem({ ...dataDialog, token })
          .subscribe(({ data, status }) => {
            if (status == 200) {
              for (let index in this.dataSource) {
                if (this.dataSource[index].repair_id == data.repair_id) {
                  this.dataSource[index].period = data.period;
                  this.dataSource[index].status = data.status_name;
                  if (data.official) {
                    this.dataSource[index].official =
                      data.official.name.trim() +
                      ' ' +
                      data.official.surname.trim();
                  }
                }
              }
            }
          });
      }
    });
  }
}
