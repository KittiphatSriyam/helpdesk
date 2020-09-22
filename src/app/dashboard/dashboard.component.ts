import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
})
export class DashboardComponent implements OnInit {
  showFiller = false;
  pageRender: string = 'Schedule';

  constructor(private router: Router, private as: AdminService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('adminToken');
    this.as.getProfileaAdminByToken(token).subscribe((profile) => {
      console.log('profile->>', profile);
    });
  }

  adminLogout() {
    localStorage.removeItem('adminToken');
    this.router.navigateByUrl('/admin');
  }
  menuSelected(page) {
    this.pageRender = page;
  }
}
